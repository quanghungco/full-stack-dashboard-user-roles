"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

interface ImageUploadProps {
  onUpload: (url: string) => void; // Callback to pass the image URL to parent
  defaultImage?: string; // Optional default image
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onUpload,
  defaultImage,
}) => {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    const IMAGEBB_API_KEY = "eef276ff0300952112863c76ff22aac9";
    try {
      // Replace `YOUR_IMGBB_API_KEY` with your ImageBB API key
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMAGEBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.success) {
        const imageUrl = data.data.url;
        setPreview(imageUrl); // Update the preview
        onUpload(imageUrl); // Pass the URL to the parent
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Failed to upload image.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {preview && (
        <Image
          src={preview}
          alt="Preview"
          className="w-[200px] h-[200px] max-h-64 object-cover rounded-md"
          width={200}
          height={200}
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="cursor-pointer block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-400 file:text-white hover:file:bg-blue-500"
      />
      {loading && <span className="text-blue-500">Uploading...</span>}
    </div>
  );
};

export default ImageUpload;
