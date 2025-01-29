import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

// Initialize UploadThing
const f = createUploadthing();

// Fake authentication function (replace this with your real auth logic)
const auth = (req: Request) => ({ id: "fakeId" });

// Define the FileRouter for your application
export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB", // Limit file size to 4MB
      maxFileCount: 1,    // Allow only one file to be uploaded
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);

      if (!user) {
        throw new UploadThingError("Unauthorized"); // Reject unauthorized requests
      }

      // Pass metadata (e.g., user ID) to the `onUploadComplete` callback
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);

      // Handle the uploaded file (e.g., save to your database)
    }),
} satisfies FileRouter;

// Export the FileRouter type for use in client-side uploads
export type OurFileRouter = typeof ourFileRouter;
