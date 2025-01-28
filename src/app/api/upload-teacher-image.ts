import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import FormData from 'form-data';
import prisma from '@/lib/prisma';

// ImageBB API Key (replace with your key)
const IMAGEBB_API_KEY = 'eef276ff0300952112863c76ff22aac9';

const uploadImageToImageBB = async (imageFile: Buffer) => {
  const form = new FormData();
  form.append("image", imageFile);

  const response = await axios.post(
    `https://api.imgbb.com/1/upload?key=${IMAGEBB_API_KEY}`,
    form,
    { headers: { ...form.getHeaders() } }
  );
  return response.data.data.url;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { teacherId, image } = req.body;

      if (!teacherId || !image) {
        return res.status(400).json({ error: 'Teacher ID and image are required' });
      }

      // Convert the base64 image string to a Buffer if it's base64
      let imageBuffer: Buffer;
      if (image.startsWith('data:image')) {
        const base64Data = image.split(',')[1]; // Remove the data URL prefix
        imageBuffer = Buffer.from(base64Data, 'base64');
      } else {
        return res.status(400).json({ error: 'Invalid image format' });
      }

      const imageUrl = await uploadImageToImageBB(imageBuffer);

      // Save the image URL to the teacher's profile in the database
      const updatedTeacher = await prisma.teacher.update({
        where: { id: teacherId },
        data: { img: imageUrl },
      });

      res.status(200).json({ message: 'Teacher image updated successfully', updatedTeacher });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Failed to upload image' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
