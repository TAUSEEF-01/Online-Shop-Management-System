"use client";

import Title from '../components/Title';
import Image from 'next/image';
import contactImage from "./contact_image.png";

export default function Contact() {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <Image
          className='w-full md:max-w-[480px]'
          src={contactImage}
          alt="Contact"
        />
        <div className="flex flex-col justify-center item-start gap-6">
          <p className='font-semibold text-xl text-gray-600'>Project Information</p>
          <p className='text-gray-500'>
            Database Management System Course Project
            <br />
            Department of Computer Science and Engineering
            <br />
            University of Dhaka
          </p>
          <p className='text-gray-500'>
            Contact: mdtauseef.rahmang01@gamil.com
          </p>

          <p className='font-semibold text-xl text-gray-600'>Team Members</p>
          <div className='text-gray-500'>
            <p>Md. Tauseef - Ur - Rahman</p>
            <p>Faiaz Mahmud Ifti</p>
          </div>

          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Send Message
          </button>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-100 p-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">Stay Updated</h2>
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
