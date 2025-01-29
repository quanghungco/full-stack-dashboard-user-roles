import React from "react";
import { PrismaClient } from "@prisma/client";
const AdmissionForm = () => {
  const programs = {
    "Diploma in Cyber Security": "Diploma in Cyber Security",
    "Master of Public Health": "Master of Public Health",
    "B.Sc in Computer Science and Engineering (CSE)":
      "B.Sc in Computer Science and Engineering (CSE)",
    "B.Sc in Electrical and Electronics Engineering (EEE)":
      "B.Sc in Electrical and Electronics Engineering (EEE)",
    "BSc in Civil Engineering (CE)": "BSc in Civil Engineering (CE)",
    "B.Sc Mechanical Engineering (ME)": "B.Sc Mechanical Engineering (ME)",
    "Bachelor of Business Administration (BBA)":
      "Bachelor of Business Administration (BBA)",
    "Bachelor of Arts (Hon&apos;s) in English":
      "Bachelor of Arts (Hon&apos;s) in English",
  };
  const bloodGroup = [
    "A(+ve)",
    "A(-ve)",
    "B(+ve)",
    "B(-ve)",
    "O(+ve)",
    "O(-ve)",
    "AB(+ve)",
    "AB(-ve)",
  ];
  const board = [
    "Barishal",
    "Dhaka",
    "Cumilla",
    "Dinajpur",
    "Jessore",
    "Mymensingh",
    "Rajshahi",
    "Sylhet",
    "Madrasah",
    "BTEB",
  ];
  return (
    <div className="w-[95%] mx-auto p-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">
        Application Form for Admission
      </h1>

      <form className="space-y-4">


        {/* Personal Info */}
        <h2 className="text-lg font-semibold mt-4">Personal Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Student&apos;s Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700  ">
              Contact Number
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700  ">
              Blood Group
            </label>
            <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
              {bloodGroup.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700  ">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700  ">
              Nationality
            </label>
            <input
              type="text"
              value="Bangladeshi"
              readOnly
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700  ">
              Gender
            </label>
            <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700  ">
              Student Photo
            </label>
            <input
              type="file"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700  ">
              Birth Certificate/NID No
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700  ">
              Religion
            </label>
            <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
              <option>Islam</option>
              <option>Hindu</option>
              <option>Christian</option>
              <option>Others</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700  ">
              Date of Birth
            </label>
            <input
              type="date"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700  ">
              Present Address
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Family Background */}
        <h2 className="text-lg font-semibold mt-4">Family Background</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
          <label className="block text-sm font-medium text-gray-700">
            Father&apos;s Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700  ">
              Father&apos;s Phone No
            </label>
          <input
            type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700  ">
              Father&apos;s Occupation
            </label>
          <input
            type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700  ">
              Mother&apos;s Name
            </label>
          <input
            type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
          <label className="block text-sm font-medium text-gray-700  ">
            Mother&apos;s Phone No
          </label>
          <input
            type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700  ">
              Mother&apos;s Occupation
            </label>
          <input
            type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Educational Background */}
        <h2 className="text-lg font-semibold mt-4">Educational Background</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div>
          <label className="block text-sm font-medium text-gray-700">
            SSC/Equivalent
          </label>
          <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
            <option>SSC</option>
            <option>Dhakhil</option>
            <option>Vocational</option>
              <option>Others</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700  ">
              Group
            </label>
            <input
            type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700  ">
              Board
            </label>
            <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
            {board.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700  ">
              Board Roll
            </label>
            <input
            type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700  ">
              GPA
            </label>
            <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700  ">
              Passing Year
            </label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700  ">
              Institute Name
            </label>
          <input
            type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700  ">
              HSC/Equivalent
            </label>
            <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
            <option>HSC</option>
            <option>Alim</option>
              <option>Diploma</option>
              <option>Others</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700  ">
              Group
            </label>
          <input
            type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
          <label className="block text-sm font-medium text-gray-700  ">
            Board
          </label>
          <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
            <option>Barishal</option>
            <option>Dhaka</option>
            <option>Cumilla</option>
            <option>Dinajpur</option>
            <option>Jessore</option>
            <option>Mymensingh</option>
            <option>Rajshahi</option>
            <option>Sylhet</option>
            <option>Madrasah</option>
              <option>BTEB</option>
            </select>
          </div>  

          <div>
            
          <label className="block text-sm font-medium text-gray-700  ">
            Board Roll
          </label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700  ">
              GPA
            </label>
          <input
            type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
            
          <div>
            <label className="block text-sm font-medium text-gray-700  ">
              Passing Year
            </label>
          <input
            type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700  ">
              Institute Name
            </label>
            <input
            type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdmissionForm;
