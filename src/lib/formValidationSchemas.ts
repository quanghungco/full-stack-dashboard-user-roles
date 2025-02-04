import { z } from "zod";

export const subjectSchema = z.object({
  id: z.coerce.number().min(1, { message: "Subject ID is required!" }),

  name: z.string().min(1, { message: "Subject name is required!" }),

});

export type SubjectSchema = z.infer<typeof subjectSchema>;

export const classSchema = z.object({
  id: z.coerce.number().optional(),

  name: z.string().min(1, { message: "Class name is required!" }),

  capacity: z.coerce.number().min(1, { message: "Capacity is required!" }),

  gradeId: z.coerce.number().min(1, { message: "Grade ID is required!" }),

  supervisorId: z.coerce.string().optional(),
});

export type ClassSchema = z.infer<typeof classSchema>;

export const teacherSchema = z.object({
  id: z.string().optional(),

  username: z

    .string()

    .min(3, { message: "Username must be at least 3 characters long!" })

    .max(20, { message: "Username must be at most 20 characters long!" }),

  password: z

    .string()

    .min(8, { message: "Password must be at least 8 characters long!" })

    .optional()

    .or(z.literal("")),

  name: z.string().min(1, { message: "First name is required!" }),

  surname: z.string().min(1, { message: "Last name is required!" }),

  email: z

    .string()

    .email({ message: "Invalid email address!" })

    .optional()

    .or(z.literal("")),

  phone: z.string().optional(),

  address: z.string(),

  img: z.string().optional(),

  bloodType: z.string().min(1, { message: "Blood Group is required!" }),

  joiningDate: z.coerce.date({ message: "Joining Date is required!" }),

  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),

  subjects: z.string().optional(), // subject ids
});

export type TeacherSchema = z.infer<typeof teacherSchema>;

export const announcementSchema = z.object({
  id: z.string().optional(),

  title: z.string().min(1, { message: "Title is required!" }),

  description: z.string().min(1, { message: "Description is required!" }),

  startDate: z.coerce.date({ message: "Start Date is required!" }),

  endDate: z.coerce.date({ message: "End Date is required!" }),

  img: z.string().optional(),
});
export type AnnouncementSchema = z.infer<typeof announcementSchema>;

export const admissionSchema = z.object({
  id: z.number().optional(),
  studentName: z.string().min(1, { message: "Student's name is required" }),
  contactNumber: z.string().min(1, { message: "Contact number is required" }),
  bloodGroup: z.string().min(1, { message: "Blood group is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  nationality: z.string().min(1, { message: "Nationality is required" }),
  gender: z.enum(["Male", "Female", "Others"], { message: "Gender is required" }),
  image: z.string().optional(),
  birthCertificate: z.string().min(1, { message: "Birth certificate/NID is required" }),
  religion: z.string().min(1, { message: "Religion is required" }),
  dateOfBirth: z.coerce.date({ message: "Date of birth is required" }),
  presentAddress: z.string().min(1, { message: "Present address is required" }),
  fatherName: z.string().min(1, { message: "Father's name is required" }),
  fatherPhone: z.string().min(1, { message: "Father's phone number is required" }),
  fatherOccupation: z.string().min(1, { message: "Father's occupation is required" }),
  motherName: z.string().min(1, { message: "Mother's name is required" }),
  motherPhone: z.string().min(1, { message: "Mother's phone number is required" }),
  motherOccupation: z.string().min(1, { message: "Mother's occupation is required" }),
  sscEquivalent: z.string().min(1, { message: "SSC/Equivalent is required" }),
  sscGroup: z.string().min(1, { message: "SSC group is required" }),
  sscBoard: z.string().min(1, { message: "SSC board is required" }),
  sscBoardRoll: z.string().min(1, { message: "SSC board roll is required" }),
  sscGPA: z.string().min(1, { message: "SSC GPA is required" }),
  sscPassingYear: z.string().min(1, { message: "SSC passing year is required" }),
  sscInstituteName: z.string().min(1, { message: "SSC institute name is required" }),
  hscEquivalent: z.string().min(1, { message: "HSC/Equivalent is required" }),
  hscGroup: z.string().min(1, { message: "HSC group is required" }),
  hscBoard: z.string().min(1, { message: "HSC board is required" }),
  hscBoardRoll: z.string().min(1, { message: "HSC board roll is required" }),
  hscGPA: z.string().min(1, { message: "HSC GPA is required" }),
  hscPassingYear: z.string().min(1, { message: "HSC passing year is required" }),
  hscInstituteName: z.string().min(1, { message: "HSC institute name is required" }),
});

export type AdmissionSchema = z.infer<typeof admissionSchema>;

export const studentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),

  address: z.string(),

  img: z.string().optional(),

  bloodType: z.string().min(1, { message: "Blood Type is required!" }),

  birthday: z.coerce.date({ message: "Birthday is required!" }),

  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),

  gradeId: z.coerce.number().min(1, { message: "Grade is required!" }),

  classId: z.coerce.number().min(1, { message: "Class is required!" }),
  parentNId: z.coerce
    .number()
    .min(1, { message: "Parent NID must be a positive number" }),
  parentName: z.string(),
});

export type StudentSchema = z.infer<typeof studentSchema>;

export const lessonSchema = z.object({
  id: z.number().optional(),

  name: z.string().min(1, "Name is required"),

  day: z.enum([
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ]),

  startTime: z.string().min(1, "Start time is required"),

  endTime: z.string().min(1, "End time is required"),

  subjectId: z.number(),

  classId: z.number(),

  teacherId: z.string(),
});

export type LessonSchema = z.infer<typeof lessonSchema>;

export const examSchema = z.object({
  id: z.coerce.number().optional(),

  title: z.string().min(1, { message: "Title name is required!" }),

  startTime: z.coerce.date({ message: "Start time is required!" }),

  endTime: z.coerce.date({ message: "End time is required!" }),

  classId: z.coerce.number({ message: "Class is required!" }),
});

export type ExamSchema = z.infer<typeof examSchema>;

export const parentSchema = z.object({
  id: z.string().optional(),

  username: z.string().min(1, "Username is required"),

  email: z.string().email("Invalid email address"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  name: z.string().min(1, "First name is required"),

  surname: z.string().min(1, "Last name is required"),

  phone: z.string().nullable().optional(), // Allow null

  address: z.string().nullable().optional(), // Allow null

  // Add any other fields as necessary
});

export type ParentSchema = z.infer<typeof parentSchema>;

export const resultSchema = z.object({
  id: z.number().optional(),
  score: z.number().optional(),
  subjects: z.array(z.object({
    subjectId: z.number().min(1, "Subject ID is required"),
    subjectName: z.string().min(1, "Subject Name is required"),
    marks: z.number().min(0, "Marks must be a non-negative number"), // Marks should be a number
  })).min(1, "At least one subject is required"), // Ensure at least one subject is provided
  studentId: z.string().min(1, "Student ID is required"),
  examId: z.number().optional(),
});

export type ResultSchema = z.infer<typeof resultSchema>;

export const attendanceSchema = z.object({
  id: z.number().optional(),
  present: z.number().min(0, "Present is required"),
  total: z.number().min(0, "Total is required"),
  date: z.coerce.date({ message: "Date is required" }),
  day: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"], { message: "Day is required" }),
  className: z.string().min(1, "Class name is required"),
});

export type AttendanceSchema = z.infer<typeof attendanceSchema>;


