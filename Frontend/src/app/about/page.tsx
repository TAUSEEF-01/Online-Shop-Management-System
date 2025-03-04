"use client";

import Title from "../components/Title";
import Image from "next/image";
import aboutImage from "./about_image.png"; // Make sure to add your image

export default function About() {
  return (
    <div className="container mx-auto px-6">
      {" "}
      {/* Added container and padding */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <Image
          className="w-full md:max-w-[450px]"
          src={aboutImage}
          alt="About Us"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Welcome to our Database Management System project! This e-commerce
            platform is developed by students of the Department of Computer
            Science and Engineering, University of Dhaka.
          </p>
          <p>
            Our platform demonstrates practical implementation of database
            concepts, including relational database design, query optimization,
            and transaction management.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            To create a robust and efficient e-commerce system while learning
            and implementing modern database management practices.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Database Excellence:</b>
          <p className="text-gray-600">
            Efficient data management, optimized queries, and robust security
            implementations.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 md:min-w-[300px]">
          {" "}
          {/* Added min-width */}
          <b>Team Members:</b>
          <p className="text-gray-600 whitespace-nowrap">
            {" "}
            {/* Added whitespace-nowrap */}
            - Md. Tauseef - Ur - Rahman
            <br />- Faiaz Mahmud Ifti
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Project Features:</b>
          <p className="text-gray-600">
            User authentication, product management, cart system, and order
            processing.
          </p>
        </div>
      </div>
      {/* Newsletter Section */}
      <div className="bg-gray-100 p-10 text-center mb-10">
        <h2 className="text-2xl font-semibold mb-4">Stay Connected</h2>
        <div className="max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 mb-4 border rounded"
          />
          <button className="bg-black text-white px-8 py-2 rounded hover:bg-gray-800 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
