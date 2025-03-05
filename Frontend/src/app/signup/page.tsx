"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { api } from "../../utils/api";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNo: "", // Add this line
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.contactNo
    ) {
      // Update validation
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // Add phone number validation
    const phoneRegex = /^[0-9]{11}$/; // Assumes Bangladesh phone number format
    if (!phoneRegex.test(formData.contactNo)) {
      setError("Please enter a valid 11-digit phone number");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.signup({
        user_name: formData.name.trim(),
        user_email: formData.email.trim(),
        user_password: formData.password,
        user_contact_no: formData.contactNo.trim(), // Add this line
        is_admin: false, // Add this line to set is_admin to false by default
      });


      console.log("Signup response:", response);

      if (response) {
        router.push("/login");
      } else {
        setError("Registration failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Signup failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center space-y-2">
          <div className="inline-flex p-4 bg-blue-100 rounded-full mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Create an account
          </h1>
          <p className="text-gray-500">
            Please fill in your information to sign up
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              disabled={isLoading}
              className="w-full px-4 py-2 transition-colors border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              disabled={isLoading}
              className="w-full px-4 py-2 transition-colors border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Add contact number field before password */}
          <div className="space-y-2">
            <Label
              htmlFor="contactNo"
              className="text-sm font-medium text-gray-700"
            >
              Phone Number
            </Label>
            <Input
              id="contactNo"
              type="tel"
              value={formData.contactNo}
              onChange={(e) =>
                setFormData({ ...formData, contactNo: e.target.value })
              }
              required
              disabled={isLoading}
              className="w-full px-4 py-2 transition-colors border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your phone number"
              pattern="[0-9]{11}"
              title="Please enter a valid 11-digit phone number"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              disabled={isLoading}
              className="w-full px-4 py-2 transition-colors border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Create a password"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
              disabled={isLoading}
              className="w-full px-4 py-2 transition-colors border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Confirm your password"
            />
          </div>

          <Button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              isLoading ||
              !formData.email ||
              !formData.password ||
              !formData.name ||
              !formData.confirmPassword
            }
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating account...
              </span>
            ) : (
              "Sign up"
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
          >
            Sign in
          </Link>
        </p>

        {/* Add return to home button */}
        <div className="text-center mt-4">
          <Link href="/">
            <Button className="w-full py-2.5 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all duration-200 transform hover:scale-[1.02]">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
