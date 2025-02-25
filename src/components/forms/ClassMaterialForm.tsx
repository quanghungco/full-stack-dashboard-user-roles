"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import React, { Dispatch, SetStateAction, useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { classMaterialSchema, ClassMaterialSchema } from "@/schema/formValidationSchemas";
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
   const [selectedFile, setSelectedFile] = useState<File | null>(null);
   const [pdfUrl, setPdfUrl] = useState(data?.pdfUrl || "");
   const [loading, setLoading] = useState(false);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<ClassMaterialSchema>({
      resolver: zodResolver(classMaterialSchema),
   });

   const [state, formAction] = useActionState(
      type === "create" ? createClassMaterial : updateClassMaterial,
      { success: false, error: false }
   );

   const uploadPdf = async () => {
      if (!selectedFile) return pdfUrl; // If no new file, use existing URL

      const formData = new FormData();
      formData.append("pdf", selectedFile);

      // Replace with your UploadThing API endpoint and logic
      const appId = process.env.UPLOADTHING_APP_ID;
      const UPLOADTHING_API_URL = `https://api.uploadthing.com/v1/apps/${appId}/upload`;
      const UPLOADTHING_API_KEY = process.env.NEXT_PUBLIC_UPLOADTHING_API_KEY;

      try {
         setLoading(true);
         const response = await fetch(UPLOADTHING_API_URL, {
            method: "POST",
            headers: {
               Authorization: `Bearer ${UPLOADTHING_API_KEY}`,
            },
            body: formData,
         });

         const data = await response.json();
         if (data.success) {
            return data.url; // Return the uploaded PDF URL
         } else {
            throw new Error("PDF upload failed");
         }
      } catch (error) {
         console.error(error);
         return ""; // Return empty string if upload fails
      } finally {
         setLoading(false);
      }
   };

   const onSubmit = handleSubmit(async (formData) => {
      const uploadedPdfUrl = await uploadPdf(); // Upload PDF before form submission
      const payload = { ...formData, pdfUrl: uploadedPdfUrl }; // Include PDF URL in payload

      // Wrap formAction in startTransition to handle async state updates properly
      React.startTransition(() => {
         formAction(payload);
         console.log(payload);
      });
   });

   const router = useRouter();
   useEffect(() => {
      if (state.success) {
         toast.success(
            `Class Material has been ${type === "create" ? "created" : "updated"}!`
         );
         setOpen(false);
         router.refresh();
      }
   }, [state, router, type, setOpen]);

   return (
      <form
         className="flex flex-col gap-8 bg-white dark:bg-[#18181b] p-4 rounded-md shadow-md"
         onSubmit={onSubmit}
      >
         <h1 className="text-xl font-semibold">
            {type === "create"
               ? "Create a new Class Material"
               : "Update the Class Material"}
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

            {type === "update" && (
               <InputField
                  label="ID"
                  name="id"
                  defaultValue={data?.id}
                  register={register}
                  error={errors?.id}
               />
            )}

            <input
               type="hidden"
               {...register("uploadedAt")}
               value={data?.uploadedAt || new Date().toISOString()}
            />

            <div className="flex flex-col gap-4 w-1/4">
               <label className="text-gray-700 font-medium dark:text-gray-500">
                  Upload PDF
               </label>
               <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
               />
            </div>
         </div>

         {state.error && <span className="text-red-500">{state.error}</span>}

         <button
            type="submit"
            disabled={loading}
            className={`bg-sky-400 text-white p-2 rounded-md ${loading ? "opacity-50" : ""
               }`}
         >
            {loading ? "Submitting..." : type === "create" ? "Create" : "Update"}
         </button>
      </form>
   );
};

export default ClassMaterialForm;
