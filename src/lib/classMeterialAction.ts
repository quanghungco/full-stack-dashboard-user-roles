"use server";

import { revalidatePath } from "next/cache";
import { ClassMaterialSchema, classMaterialSchema } from "../schema/formValidationSchemas";
import prisma from "./prisma";

type CurrentState = { success: boolean; error: boolean; message?: string };

export const createClassMaterial = async (
   currentState: CurrentState,
   formData: ClassMaterialSchema
) => {
   try {
      // Validate the input data against the schema
      const validatedData = classMaterialSchema.parse(formData);

      // Create class material entry in the database
      const newMaterial = await prisma.classMaterial.create({
         data: {
            title: validatedData.title,
            pdfUrl: validatedData.pdfUrl,
            classId: validatedData.classId,
            uploadedAt: validatedData.uploadedAt || new Date(),
         },
      });

      revalidatePath("/class-materials");
      return { success: true, error: false };
   } catch (err) {
      console.error("Create class material error:", err);
      return {
         success: false,
         error: true,
         message: err instanceof Error ? err.message : "Failed to create class material",
      };
   }
};

export const updateClassMaterial = async (
   currentState: CurrentState,
   formData: ClassMaterialSchema
) => {
   try {
      // Validate the input data against the schema
      const validatedData = classMaterialSchema.parse(formData);

      if (!validatedData.id) {
         return {
            success: false,
            error: true,
            message: "ID is required for update"
         };
      }

      await prisma.classMaterial.update({
         where: {
            id: validatedData.id
         },
         data: {
            title: validatedData.title,
            pdfUrl: validatedData.pdfUrl,
            classId: validatedData.classId,
            uploadedAt: validatedData.uploadedAt
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
   prevState: CurrentState,
   formData: FormData
) => {
   try {
      const id = formData.get('id');

      if (!id || typeof id !== 'string') {
         return {
            success: false,
            error: true,
            message: "Invalid ID provided"
         };
      }

      await prisma.classMaterial.delete({
         where: { id }
      });

      revalidatePath("/class-materials");
      return { success: true, error: false };
   } catch (err) {
      console.error("Delete class material error:", err);
      return {
         success: false,
         error: true,
         message: err instanceof Error ? err.message : "Failed to delete class material"
      };
   }
};