"use client";

import Title from "../components/Title";
import Image from "next/image";
import aboutImage from "./about_image.png"; // Make sure to add your image
import Layout from "../components/layout";

export default function About() {
  return (
    <Layout>
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <Title text1={"ABOUT"} text2={"US"} />
          <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="my-10 flex flex-col md:flex-row gap-16 items-center">
          <div className="relative md:w-2/5 max-w-[400px]">
            <div className="absolute inset-0 bg-blue-600/10 rounded-lg transform translate-x-3 translate-y-3 ml-4"></div>
            <Image
              className="relative w-full rounded-lg shadow-2xl transform transition-transform duration-500 hover:scale-105"
              src={aboutImage}
              alt="About Us"
            />
          </div>
          <div className="flex flex-col justify-center gap-6 md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to our Database Management System project! This e-commerce
              platform is developed by students of the Department of Computer
              Science and Engineering, University of Dhaka.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our platform demonstrates practical implementation of database
              concepts, including relational database design, query
              optimization, and transaction management.
            </p>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To create a robust and efficient e-commerce system while
                learning and implementing modern database management practices.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center my-16">
          <Title text1={"WHY"} text2={"CHOOSE US"} />
          <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "Database Excellence",
              description:
                "Efficient data management, optimized queries, and robust security implementations.",
              icon: "💾",
            },
            {
              title: "Team Members",
              description: "- Md. Tauseef - Ur - Rahman\n- Faiaz Mahmud Ifti",
              icon: "👥",
            },
            {
              title: "Project Features",
              description:
                "User authentication, product management, cart system, and order processing.",
              icon: "⚡",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600 whitespace-pre-line">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-6">Stay Connected</h2>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}
