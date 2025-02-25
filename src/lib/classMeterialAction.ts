"use server";

import { revalidatePath } from "next/cache";
import { ClassMaterialSchema } from "../schema/formValidationSchemas";
import prisma from "./prisma";

type CurrentState = { success: boolean; error: boolean };

export const createClassMaterial = async (
   currentState: CurrentState,
   data: ClassMaterialSchema
) => {
   try {
      // Validate required fields
      if (!data.title || !data.pdfUrl || !data.classId || !data.uploadedBy) {
         return {
            success: false,
            error: true,
            message: "Missing required fields"
         };
      }

      await prisma.classMaterial.create({
         data: {
            title: data.title,
            pdfUrl: data.pdfUrl,
            classId: data.classId,
            uploadedAt: data.uploadedAt || new Date(),
            uploadedBy: data.uploadedBy,
         },
      });

      revalidatePath("/class-materials");
      return { success: true, error: false };
   } catch (err) {
      console.error("Create class material error:", err);
      return {
         success: false,
         error: true,
         message: err instanceof Error ? err.message : "Failed to create class material"
      };
   }
};

export const updateClassMaterial = async (
   currentState: CurrentState,
   data: ClassMaterialSchema
) => {
   try {
      if (!data.id) {
         return {
            success: false,
            error: true,
            message: "ID is required for update"
         };
      }

      await prisma.classMaterial.update({
         where: {
            id: data.id
         },
         data: {
            title: data.title,
            pdfUrl: data.pdfUrl,
            classId: data.classId,
            uploadedBy: data.uploadedBy,
            uploadedAt: data.uploadedAt
         },
      });

      revalidatePath("/class-materials");
      return { success: true, error: false };
   } catch (err) {
      console.error("Update class material error:", err);
      return {
         success: false,
         error: true,
         message: err instanceof Error ? err.message : "Failed to update class material"
      };
   }
};

export const deleteClassMaterial = async (
   prevState: { success: boolean; error: boolean },
   formData: FormData
) => {
   try {
      const id = formData.get('id') as string;
      await prisma.classMaterial.delete({
         where: {
            id: id.toString(), // Ensure id is a number
         },
      });
      return { success: true, error: false };
   } catch (err) {
      console.log(err);
      return { success: false, error: true };
   }
};