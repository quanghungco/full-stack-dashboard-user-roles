"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createResult } from "@/lib/resultAction";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";

// Schema for the form
const resultFormSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  subjects: z.array(z.object({
    subjectId: z.number().min(1, "Subject ID is required"),
    marks: z.number().min(0).max(100, "Marks must be between 0 and 100"),
  })).min(1, "At least one subject is required"),
});

type ResultFormSchema = z.infer<typeof resultFormSchema>;

interface FormProps {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}

const ResultForm = ({ type, data, setOpen, relatedData }: FormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
     formState: { errors },
   } = useForm<ResultFormSchema>({
     resolver: zodResolver(resultFormSchema),
     defaultValues: {
       studentId: data?.studentId || "",
       subjects: data?.subjects || [{ subjectId: 0, marks: 0 }],
     },
   });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects",
  });

  const getGrade = (marks: number): string => {
    if (marks >= 80) return "A+";
    if (marks >= 70) return "A";
    if (marks >= 60) return "A-";
    if (marks >= 50) return "B";
    if (marks >= 40) return "C";
    if (marks >= 33) return "D";
    return "F";
   };

  const onSubmit = async (formData: ResultFormSchema) => {
    try {
        const resultsPayload = formData.subjects.map(subject => ({
          studentId: formData.studentId,
          subjectId: Number(subject.subjectId),
          marks: Number(subject.marks),
          grade: getGrade(Number(subject.marks))
        }));

        console.log("Submitting data:", resultsPayload);
        const response = await createResult(resultsPayload);

        if (response.success) {
          toast.success("Results created successfully!");
          setOpen(false);
          router.refresh();
        } else {
          toast.error(response.error || "Failed to create results");
        }
      } catch (error) {
        console.error("Submission error:", error);
        toast.error("Error creating results");
      }
   };

  return (
     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
       <div className="space-y-4">
         <div>
           <label className="block text-sm font-medium mb-1">Student ID</label>
           <Input
             {...register("studentId")}
             placeholder="Enter student ID"
             className="w-full"
           />
           {errors.studentId && (
             <p className="text-red-500 text-sm">{errors.studentId.message}</p>
           )}
         </div>

         <div className="space-y-4">
           <label className="block text-sm font-medium">Subjects</label>
           {fields.map((field, index) => (
                 <div key={field.id} className="flex gap-4 items-end">
                   <div className="flex-1">
                     <label className="block text-sm mb-1">Subject ID</label>
                     <Input
                       type="number"
                       {...register(`subjects.${index}.subjectId` as const, {
                         valueAsNumber: true,
                       })}
                       placeholder="Enter subject ID"
                     />
                     {errors.subjects?.[index]?.subjectId && (
                       <p className="text-red-500 text-sm">
                         {errors.subjects[index]?.subjectId?.message}
                       </p>
                     )}
                   </div>

                   <div className="flex-1">
                     <label className="block text-sm mb-1">Marks</label>
                     <Input
                       type="number"
                       {...register(`subjects.${index}.marks` as const, {
                         valueAsNumber: true,
                       })}
                       placeholder="Enter marks"
                     />
                     {errors.subjects?.[index]?.marks && (
                       <p className="text-red-500 text-sm">
                         {errors.subjects[index]?.marks?.message}
                       </p>
                     )}
                   </div>

                   <Button
                     type="button"
                     onClick={() => remove(index)}
                     className="bg-red-500 hover:bg-red-600"
                   >
                     Remove
                   </Button>
                 </div>
               ))}

           <Button
             type="button"
             onClick={() => append({ subjectId: 0, marks: 0 })}
             className="bg-green-500 hover:bg-green-600"
           >
             Add Subject
           </Button>
         </div>
       </div>

       <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
         {type === "create" ? "Create Results" : "Update Results"}
       </Button>
     </form>
   );
};

export default ResultForm;