"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { classMaterialSchema, ClassMaterialSchema } from "@/schema/formValidationSchemas";
import { UploadDropzone } from "@/utils/uploadthing";
import { createClassMaterial, updateClassMaterial } from "@/lib/classMeterialAction";

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
   const [pdfUrl, setPdfUrl] = useState(data?.pdfUrl || "");
   const [loading, setLoading] = useState(false);
   const router = useRouter();

   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm<ClassMaterialSchema>({
      resolver: zodResolver(classMaterialSchema),
      defaultValues: {
         title: data?.title || "",
         classId: data?.classId ? Number(data.classId) : undefined,
         pdfUrl: data?.pdfUrl || "",
      },
   });

   const onSubmit = async (formData: ClassMaterialSchema) => {
      setLoading(true);

      try {
         if (!pdfUrl) {
            toast.error("Please upload a PDF file");
            return;
         }

         const payload = {
            ...formData,
            pdfUrl,
            classId: Number(formData.classId),
            uploadedAt: new Date(),
         };

         // console.log("Submitting payload:", payload);

         const response = await (type === "create" ? createClassMaterial : updateClassMaterial)(
            { success: false, error: false },
            payload
         );

         if (response.success) {
            toast.success(`Class Material ${type === "create" ? "created" : "updated"} successfully!`);
            setOpen(false);
            router.refresh();
         } else {
            toast.error(response.message || "Failed to save class material");
         }
      } catch (error) {
         // console.error("Submission error:", error);
         toast.error("Failed to save class material");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div>
         <form
            className="flex flex-col gap-8 bg-white dark:bg-[#18181b] p-4 rounded-md shadow-md"
            onSubmit={handleSubmit(onSubmit)}
         >
            <h1 className="text-xl font-semibold">
               {type === "create" ? "Create a new Class Material" : "Update the Class Material"}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
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
            </div>

            {/* PDF Upload Section */}
            <div className="flex flex-col gap-4 justify-center">
               <label className="text-gray-700 font-medium dark:text-gray-500 text-center">
                  Upload PDF
               </label>

               <UploadDropzone
                  endpoint="pdfUploader"
                  onClientUploadComplete={(res) => {
                     if (res && res.length > 0) {
                        setPdfUrl(res[0].url);
                        setValue("pdfUrl", res[0].url, { shouldValidate: true });
                        toast.success("File uploaded successfully");
                     }
                  }}
                  onUploadError={(error: Error) => {
                     toast.error(`Upload failed: ${error.message}`);
                  }}
               />

               {pdfUrl && (
                  <p className="text-sm text-green-600">
                     PDF uploaded successfully
                  </p>
               )}
            </div>

            <button
               type="submit"
               disabled={loading}
               className={`bg-sky-400 text-white p-2 rounded-md hover:bg-sky-500 transition-colors ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
               {loading ? "Submitting..." : type === "create" ? "Create" : "Update"}
            </button>
         </form>
      </div>
   );
};

export default ClassMaterialForm;
