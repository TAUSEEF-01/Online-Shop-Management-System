"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../components/layout";
import { Button } from "@/app/components/ui/button";
import { api } from "@/utils/api";
import ProtectedRoute from '../components/protected-route';

interface UserInfo {
  user_id: number;
  user_name: string;
  user_email: string;
  user_contact_no: string;
  is_admin: boolean;
}

export default function Profile() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.getUserInfo();
        console.log('Response:', response);
        if (response.success) {
          setUserInfo(response.user);
        }
      } catch (err) {
        setError("Failed to load user information");
        // router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [router]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center text-red-600 mt-8">{error}</div>
      </Layout>
    );
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Profile Information</h1>
          {userInfo && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold">Name:</div>
                <div>{userInfo.user_name}</div>
                
                <div className="font-semibold">Email:</div>
                <div>{userInfo.user_email}</div>
                
                <div className="font-semibold">Contact Number:</div>
                <div>{userInfo.user_contact_no}</div>
                
                <div className="font-semibold">Account Type:</div>
                <div>{userInfo.is_admin ? "Administrator" : "Regular User"}</div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => router.push("/edit-profile")}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => router.push("/change-password")}
                >
                  Change Password
                </Button>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
