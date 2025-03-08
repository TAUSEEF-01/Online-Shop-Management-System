"use client";

import Title from "../components/Title";
import Image from "next/image";
import contactImage from "./contact_image.png";
import Layout from "../components/layout";

export default function Contact() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-16">
            <Title text1={"CONTACT"} text2={"US"} />
            <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="my-10 flex flex-col md:flex-row gap-16 items-center mb-28">
            <div className="relative md:w-2/5 max-w-[400px]">
              <div className="absolute inset-0 bg-blue-600/10 rounded-lg transform translate-x-3 translate-y-3"></div>
              <Image
                className="relative w-full rounded-lg shadow-2xl transform transition-transform duration-500 hover:scale-105"
                src={contactImage}
                alt="Contact"
              />
            </div>

            <div className="flex flex-col justify-center gap-8 md:w-1/2">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Project Information
                </h2>
                <div className="space-y-3 text-gray-600">
                  <p className="leading-relaxed">
                    Database Management System Course Project
                    <br />
                    Department of Computer Science and Engineering
                    <br />
                    University of Dhaka
                  </p>
                  <p className="font-medium">
                    Contact:{" "}
                    <a
                      href="mailto:mdtauseef.rahmang01@gmail.com"
                      className="text-blue-600 hover:underline"
                    >
                      mdtauseef.rahmang01@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Team Members
                </h2>
                <div className="space-y-2 text-gray-600">
                  <p className="flex items-center gap-2">
                    <span className="text-blue-600">•</span> Md. Tauseef - Ur -
                    Rahman
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-blue-600">•</span> Faiaz Mahmud Ifti
                  </p>
                </div>
              </div>

              <button className="bg-blue-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Send Message
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-500 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Stay Updated</h2>
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
