"use client";

import { useCallback } from "react";
import { Dispatch, SetStateAction } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createResult } from "@/lib/resultAction";
import { useRouter } from "next/navigation";
import { resultSchema, ResultSchema } from "@/schema/formValidationSchemas";
import toast from "react-hot-toast";

const ResultForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
    data?: any;
    setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ResultSchema>({
    resolver: zodResolver(resultSchema),
    defaultValues: {
      studentId: data?.studentId || "",
      subjects: data?.subjects || [{ subjectId: 0, marks: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects",
  });

  const router = useRouter();

  const getGrade = useCallback((marks: number): string => {
    if (marks >= 80) return "A+";
    if (marks >= 70) return "A";
    if (marks >= 60) return "A-";
    if (marks >= 50) return "B";
    if (marks >= 40) return "C";
    if (marks >= 33) return "D";
    return "F";
  }, []);

  const onSubmit = handleSubmit(async (formData: ResultSchema) => {
    try {
      console.log("Form Data:", formData);

      if (!formData.studentId) {
        toast.error("Student ID (username) is required!");
        return;
      }

      if (!formData.subjects || formData.subjects.length === 0) {
        toast.error("At least one subject must be added.");
        return;
      }

      // Validate subject IDs
      if (formData.subjects.some((s) => s.subjectId <= 0)) {
        toast.error("Invalid subject ID detected.");
        return;
      }

      // Prepare data for API request
      const resultsPayload = formData.subjects.map((subject) => ({
        studentId: formData.studentId, // Matches Prisma schema (uses username)
        subjectId: subject.subjectId,
        marks: subject.marks,
        grade: getGrade(subject.marks),
      }));

      console.log("Payload for API:", resultsPayload);

      const response = await createResult(resultsPayload);

      if (response?.success) {
        toast.success("Result successfully created!");
        setOpen(false);
        router.refresh();
      } else {
        toast.error(`Error: ${response?.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("Error submitting data. Check console.");
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4 border rounded-lg bg-white dark:bg-[#18181b]">
      <h1 className="text-xl font-semibold">{type === "create" ? "Create New Results" : "Update Results"}</h1>

      {/* Student ID Input */}
      <div className="flex flex-col gap-2">
        <label className="block font-medium">Student Username (ID):</label>
        <Input
          type="text"
          {...register("studentId")}
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          placeholder="Enter Student Username"
          required
        />
        {errors.studentId && <p className="text-xs text-red-400">{errors.studentId.message}</p>}
      </div>

      {/* Dynamic Fields for Subjects & Marks */}
      <div>
        <h2 className="text-lg font-semibold">Subjects</h2>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 mt-4">
            {/* Subject ID Input */}
            <div className="w-full">
              <Input
                type="number"
                placeholder="Subject ID"
                {...register(`subjects.${index}.subjectId`, {
                  required: "Subject ID is required",
                  min: {
                    value: 1,
                    message: "Subject ID must be greater than 0",
                  },
                  valueAsNumber: true,
                })}
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              />
              {errors.subjects?.[index]?.subjectId && (
                <p className="text-xs text-red-400">{errors.subjects[index]?.subjectId?.message}</p>
              )}
            </div>

            {/* Marks Input */}
            <Input
              type="number"
              placeholder="Marks"
              {...register(`subjects.${index}.marks`, {
                required: "Marks are required",
                min: { value: 0, message: "Marks cannot be negative" },
                valueAsNumber: true,
              })}
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              required
            />
            {errors.subjects?.[index]?.marks && (
              <p className="text-xs text-red-400">{errors.subjects[index]?.marks?.message}</p>
            )}

            {/* Remove Subject Button */}
            <Button type="button" className="bg-red-500" onClick={() => remove(index)}>
              Remove
            </Button>
          </div>
        ))}
        {/* Add Subject Button */}
        <Button className="bg-green-400 mt-2" type="button" onClick={() => append({ subjectId: 0, subjectName: "", marks: 0 })}>
          Add Subject
        </Button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md disabled:opacity-50 w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ResultForm;
