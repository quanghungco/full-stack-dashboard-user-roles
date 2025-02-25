import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
   pdfUploader: f({ pdf: { maxFileSize: "8MB" } }) // Adjust max size as needed
      .onUploadComplete(async ({ file }) => {
         console.log("File uploaded:", file.url);
         return { fileUrl: file.url };
      }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
