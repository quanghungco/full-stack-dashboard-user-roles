"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import { attendanceSchema, AttendanceSchema } from "@/lib/formValidationSchemas"; // Ensure you have a schema for validation
import { createAttendance, updateAttendance } from "@/lib/actions"; // Import the action to create attendance
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import InputField from "../InputField";

const AttendanceForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data?: AttendanceSchema; // Ensure data is of type AttendanceSchema
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AttendanceSchema>({
    resolver: zodResolver(attendanceSchema), // Ensure you have a schema for validation
    defaultValues: data || {}, // Set default values based on data
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async (formData: AttendanceSchema) => {
    try {
      const response = type === "create" 
        ? await createAttendance(formData) 
        : await updateAttendance(data?.id!, formData); // Ensure data includes id for updates


      if (response.success) {
        toast(`Attendance has been ${type === "create" ? "created" : "updated"}!`);
        setOpen(false);
        router.refresh();
      } else {
        toast(`Failed: ${response.error}`);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast("Error submitting data. Check console.");
    }
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create Attendance Record" : "Update Attendance Record"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Class Name"
          name="className"
          defaultValue={data?.className}
          register={register}
          error={errors?.className}
        />
        <InputField
          label="Date"
          name="date"
          type="date"
          defaultValue={data?.date?.toISOString().split('T')[0]}
          register={register}
          error={errors?.date}
        />
        <InputField
          label="Day"
          name="day"
          defaultValue={data?.day}
          register={register}
          error={errors?.day}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Total Students</label>
          <input
            type="number"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("total")}
            min="0"
            defaultValue={0}
          />
          {errors.total?.message && (
            <p className="text-xs text-red-400">
              {errors.total.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Present Students</label>
          <input
            type="number"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("present")}
            min="0"
            defaultValue={0}
          />
          {errors.present?.message && (
            <p className="text-xs text-red-400">
              {errors.present.message.toString()}
            </p>
          )}
        </div>
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default AttendanceForm;