"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { lessonSchema, LessonSchema } from "@/lib/formValidationSchemas";
import { createLesson, updateLesson } from "@/lib/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import InputField from "../InputField";

const LessonForm = ({
  type,
  data,
  setOpen,
  relatedData,
  role,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
  role: "admin" | "teacher";
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LessonSchema>({
    resolver: zodResolver(lessonSchema),
  });

  const [state, formAction] = useFormState(
    type === "create" ? createLesson : updateLesson,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    // Ensure subjectId is selected before submitting
    // if (!data.subjectId) {
    //   toast.error("Please select a subject before submitting.");
    //   return;
    // }
    formAction(data);
    console.log("sdjkjs====",data);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Lesson has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new lesson" : "Update the lesson"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Lesson Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Lesson Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <InputField
          label="Day"
          name="day"
          defaultValue={data?.day}
          register={register}
        />
        <InputField
          label="Start Time"
          name="startTime"
          defaultValue={data?.startTime}
          register={register}
          type="datetime-local"
        />
        <InputField
          label="End Time"
          name="endTime"
          defaultValue={data?.endTime}
          register={register}
          type="datetime-local"
        />
        <select {...register("subjectId")} defaultValue={data?.subjectId}>
          <option value="">Select Subject</option>
          {relatedData?.subjects?.map((subject: { id: string }) => (
            <option key={subject.id} value={subject.id}>
              {subject.id}
            </option>
          ))}
        </select>
        <select {...register("classId")} defaultValue={data?.classId}>
          <option value="">Select Class</option>
          {relatedData?.classes?.map(
            (classItem: { id: string; name: string }) => (
              <option key={classItem.id} value={classItem.id}>
                {classItem.id}
              </option>
            )
          )}
        </select>
        <select {...register("teacherId")} defaultValue={data?.teacherId}>
          <option value="">Select Teacher</option>
          {relatedData?.teachers?.map(
            (teacher: { id: string; name: string; surname: string }) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.id}
              </option>
            )
          )}
        </select>
      </div>
      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default LessonForm;
