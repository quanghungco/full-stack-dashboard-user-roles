"use client";

import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { examRoutineSchema, ExamRoutineSchema } from "@/lib/formValidationSchemas";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createExamRoutine, updateExamRoutine } from "@/lib/examRoutineActions";

const ExamRoutineForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ExamRoutineSchema>({
    resolver: zodResolver(examRoutineSchema),
    defaultValues: data || { title: "", startTime: "", classId: "", subjectName: "" },
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async (formData: ExamRoutineSchema) => {
    try {
      console.log(formData);
      const response =
        type === "create"
          ? await createExamRoutine({ ...formData, success: false, error: false }, relatedData?.classes)
          : await updateExamRoutine({ ...formData, success: false, error: false }, relatedData?.classes);


      if (response && response.success) {
        toast(`Exam has been ${type === "create" ? "created" : "updated"}!`);
        setOpen(false);
        router.refresh();
      } else {
        toast(`Failed: ${response?.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast("Error submitting data. Check console.");
    }
  });

  const { classes = [] } = relatedData || {};
  console.log(classes);



  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4 border rounded-lg bg-white dark:bg-[#18181b]">
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create New Exam Routine" : "Update Exam Routine"}
      </h1>

      <div className="flex flex-col gap-2">
        <label className="block font-medium">Exam Title:</label>
        <Input
          type="text"
          {...register("title")}
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          placeholder="Enter Exam Title"
          required
        />
        {errors.title && <p className="text-xs text-red-400">{errors.title.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="block font-medium">Start Date & Time:</label>
        <Input
          type="datetime-local"
          {...register("startTime")}
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          required
        />
        {errors.startTime && <p className="text-xs text-red-400">{errors.startTime.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="block font-medium">Class:</label>
        <Input
          type="number"
          {...register("classId", { required: "Class ID is required" })}
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          placeholder="Enter Class ID"
          required
        />
        {errors.classId && <p className="text-xs text-red-400">{errors.classId.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="block font-medium">Subject Name:</label>
        <Input
          type="text"
          {...register("subjectId")} // Changed from "subjectName" to "subjectId"
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          placeholder="Enter Subject ID" // Updated placeholder to reflect the change
          required
        />
        {errors.subjectId && <p className="text-xs text-red-400">{errors.subjectId.message}</p>}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ExamRoutineForm;