"use client";

import { Dispatch, SetStateAction } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resultSchema, ResultSchema } from "@/lib/formValidationSchemas";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "react-toastify";
import { createResult, updateResult } from "@/lib/actions"; // Updated function for batch insert
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";

const ResultForm2 = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any; // Expected to contain studentId and existing results if updating
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResultSchema>({
    resolver: zodResolver(resultSchema),
    defaultValues: data || { studentId: "", subjects: [] }, // Ensure studentId is initialized
  });


  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects", // Matches schema
  });

  const router = useRouter();

  const getGrade = (marks: number): string => {
    if (marks >= 80) return "A+";
    if (marks >= 70) return "A";
    if (marks >= 60) return "B";
    if (marks >= 50) return "C";
    if (marks >= 40) return "D";
    return "F";

  };


  // const onSubmit = handleSubmit(async (formData: ResultSchema) => {
  //   try {
  //     console.log("Student ID from data:", formData?.studentId); // Check if studentId is available
  //     if (!formData.subjects || formData.subjects.length === 0) {
  //       toast("Please add at least one subject.");
  //       return;
  //     }

  //     // Prepare payload with grades calculated
  //     const resultsPayload = formData.subjects.map((subject) => ({
  //       studentId: formData.studentId, // Access studentId from formData
  //       subjectId: subject.id,
  //       marks: subject.marks,
  //       grade: getGrade(subject.marks), // Ensure this function returns a valid grade
  //     }));

  //     console.log("Dasahdjhadsh dsf+++++++++++++===", resultsPayload);

  //     const response =
  //       type === "create"
  //         ? await createResult(resultsPayload)
  //         : await updateResult(data?.id, {
  //             studentId: formData.studentId,
  //             subjects: formData.subjects.map(subject => ({
  //               id: subject.id,
  //               subjectName: subject.subjectName,
  //               marks: subject.marks
  //             }))
  //           });


  //     if (response.success) {
  //       toast(`Result has been ${type === "create" ? "created" : "updated"}!`);
  //       setOpen(false);
  //       console.log("response", response);
  //       router.refresh();
  //     } else {
  //       toast("Failed to submit result data.");
  //     }
  //   } catch (error) {
  //     console.error("Submission Error:", error);
  //   }
  // });
  const onSubmit = handleSubmit(async (formData: ResultSchema) => {
    try {
      console.log("Form Data:", formData);
  
      if (!formData.studentId) {
        toast("Student ID is missing!");
        return;
      }
  
      if (!formData.subjects || formData.subjects.length === 0) {
        toast("Please add at least one subject.");
        return;
      }
  
      // Validate and prepare data for submission
      const resultsPayload = formData.subjects.map((subject) => ({
        studentId: formData.studentId,
        subjectId: subject.id,
        marks: subject.marks,
        grade: getGrade(subject.marks),
      }));
  
      console.log("Payload to API:", resultsPayload);
  
      // Send API request based on form type
      let response;
      if (type === "create") {
        response = await createResult(resultsPayload);
      } else {
        response = await updateResult(data?.id, {
          studentId: formData.studentId,
          subjects: formData.subjects.map((subject) => ({
            id: subject.id,
            subjectName: subject.subjectName,
            marks: subject.marks,
          })),
        });
      }
  
      console.log("API Response:", response);
  
      // Handle response
      if (response?.success) {
        toast(`Result has been ${type === "create" ? "created" : "updated"}!`);
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
  
  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4 border rounded-lg">
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create New Results" : "Update Results"}
      </h1>

      <div className="flex flex-col gap-2">
        <label className="block font-medium">Student ID:</label>
        <Input
          type="text"
          {...register("studentId")}
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          placeholder="Enter Student ID"
          required
        />
        {errors.studentId && (
          <p className="text-xs text-red-400">{errors.studentId.message}</p>
        )}
      </div>

      {/* Dynamic fields for subjects and marks */}
      <div>
        <h2 className="text-lg font-semibold">Subjects</h2>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 mt-4">
            <Input
              type="text"
              placeholder="Subject ID"
              {...register(`subjects.${index}.id`)}
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              required
            />
            <Input
              type="text"
              placeholder="Subject Name"
              {...register(`subjects.${index}.subjectName`)}
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              required
            />
            <Input
              type="number"
              placeholder="Marks"
              {...register(`subjects.${index}.marks`, { valueAsNumber: true })}
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              required
            />
            <Button type="button" className="bg-red-400" onClick={() => remove(index)}>Remove</Button>
          </div>
        ))}
        <Button
          className="bg-green-400 mt-2"
          type="button"
          onClick={() => append({ id: "", subjectName: "", marks: 0 })}
        >
          Add Subject
        </Button>
      </div>

      <Button
        type="submit"
        className="bg-blue-400 text-white p-2 rounded-md mx-auto block w-1/3"
      >
        {type === "create" ? "Create" : "Update"}
      </Button>
    </form>
  );
};

export default ResultForm2;
