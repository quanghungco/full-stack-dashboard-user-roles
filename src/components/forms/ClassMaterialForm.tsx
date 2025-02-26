"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { classMaterialSchema, ClassMaterialSchema } from "@/schema/formValidationSchemas";
import { createClassMaterial, updateClassMaterial } from "@/lib/classMeterialAction";
import { UploadDropzone } from "@/utils/uploadthing";

export interface FormProps {
   type: "create" | "update";
   data?: any;
   setOpen: Dispatch<SetStateAction<boolean>>;
   relatedData?: any;
}

const ClassMaterialForm: React.FC<FormProps> = ({
   type,
   data,
   setOpen,
   relatedData,
}) => {
   const [selectedFile, setSelectedFile] = useState<File | null>(null);
   const [pdfUrl, setPdfUrl] = useState(data?.pdfUrl || ""); 
   const [loading, setLoading] = useState(false);
   const router = useRouter();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<ClassMaterialSchema>({
      resolver: zodResolver(classMaterialSchema),
   });

   // Handle form submission
   const onSubmit = handleSubmit(async (formData) => {
      setLoading(true);

      try {
         let uploadedPdfUrl = pdfUrl; // Use existing URL if no new file selected

         // If a new file is selected, upload it
         if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);

            const response = await fetch("/api/uploadthing/pdfUploader", {
               method: "POST",
               body: formData,
            });

            if (!response.ok) throw new Error("Failed to upload PDF");

            const result = await response.json();
            uploadedPdfUrl = result.url;
            setPdfUrl(uploadedPdfUrl);
         }

         if (!uploadedPdfUrl) {
            toast.error("PDF upload failed. Please try again.");
            return;
         }

         // Convert uploadedAt to Date (if it's a string)
         const formattedUploadedAt = typeof formData.uploadedAt === 'string'
            ? new Date(formData.uploadedAt)
            : formData.uploadedAt;

         // Prepare payload with the uploaded PDF URL and formatted uploadedAt
         const payload = {
            ...formData,
            pdfUrl: uploadedPdfUrl,
            uploadedAt: formattedUploadedAt || new Date(), // Use current date if uploadedAt is not provided
         };

         console.log("Submitting Form Data:", payload);

         // Call the create/update function based on the form type
         const response = await (type === "create" ? createClassMaterial : updateClassMaterial)(
            { success: false, error: true },
            payload
         );

         if (response.success) {
            toast.success(`Class Material ${type === "create" ? "created" : "updated"} successfully!`);
            setTimeout(() => setOpen(false), 500);
            router.refresh();
         } else {
            toast.error("Submission failed. Please check your input.");
         }
      } catch (error) {
         console.error("Error submitting form:", error);
         toast.error("An unexpected error occurred.");
      } finally {
         setLoading(false);
      }
   });



   return (
      <div>
         <form
            className="flex flex-col gap-8 bg-white dark:bg-[#18181b] p-4 rounded-md shadow-md"
            onSubmit={onSubmit}
         >
            <h1 className="text-xl font-semibold">
               {type === "create" ? "Create a new Class Material" : "Update the Class Material"}
            </h1>

            <div className="flex justify-between flex-wrap gap-4">
               <InputField
                  label="Title"
                  name="title"
                  defaultValue={data?.title}
                  register={register}
                  error={errors?.title}
               />

               <InputField
                  label="Class ID"
                  name="classId"
                  type="number"
                  defaultValue={data?.classId || relatedData?.classId}
                  register={register}
                  error={errors?.classId}
               />

               <InputField
                  label="Uploaded By"
                  name="uploadedBy"
                  defaultValue={data?.uploadedBy}
                  register={register}
                  error={errors?.uploadedBy}
               />

               {/* PDF Upload Section */}
               <div className="flex flex-col gap-4 w-1/4 justify-center">
                  <label className="text-gray-700 font-medium dark:text-gray-500">
                     Upload PDF
                  </label>

                  <UploadDropzone
                     endpoint="pdfUploader"
                     onBeforeUploadBegin={(files) => {
                        if (files.length > 0) {
                           setSelectedFile(files[0]);
                        }
                        return files;
                     }}
                     onClientUploadComplete={(res) => {
                        if (res && res.length > 0) {
                           setPdfUrl(res[0].url);
                           toast.success("File uploaded successfully");
                        }
                     }}
                     onUploadError={(error: Error) => {
                        toast.error(`Upload failed: ${error.message}`);
                     }}
                  />
               </div>
            </div>

            <button
               type="submit"
               disabled={loading}
               className={`bg-sky-400 text-white p-2 rounded-md ${loading ? "opacity-50" : ""}`}
            >
               {loading ? "Submitting..." : type === "create" ? "Create" : "Update"}
            </button>
         </form>
      </div>
   );
};

export default ClassMaterialForm;
