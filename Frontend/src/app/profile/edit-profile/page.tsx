// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Layout from "../../components/layout";
// import { Button } from "@/app/components/ui/button";
// import { api } from "@/utils/api";
// import ProtectedRoute from "../../components/protected-route";

// export default function EditProfile() {
//   const router = useRouter();
//   const [userInfo, setUserInfo] = useState({
//     user_name: "",
//     user_email: "",
//     user_password: "",
//     user_contact_no: ""
//   });
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         const response = await api.getUserInfo();
//         if (response.success) {
//           setUserInfo({
//             user_name: response.user.user_name,
//             user_email: response.user.user_email,
//             user_password: "",
//             user_contact_no: response.user.user_contact_no
//           });
//         }
//       } catch (err) {
//         console.error("Error fetching user info:", err);
//         setError("Failed to load user information");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserInfo();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setUserInfo((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await api.updateProfile(userInfo);
//       if (response.success) {
//         router.push("/profile");
//       } else {
//         setError("Failed to update profile");
//       }
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       setError("Failed to update profile");
//     }
//   };

//   if (isLoading) {
//     return (
//       <ProtectedRoute>
//         <Layout>
//           <div className="flex justify-center items-center min-h-screen">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//           </div>
//         </Layout>
//       </ProtectedRoute>
//     );
//   }

//   if (error) {
//     return (
//       <ProtectedRoute>
//         <Layout>
//           <div className="text-center text-red-600 mt-8">{error}</div>
//         </Layout>
//       </ProtectedRoute>
//     );
//   }

//   return (
//     <ProtectedRoute>
//       {/* <Layout> */}
//         <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
//           <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Name</label>
//               <input
//                 type="text"
//                 name="user_name"
//                 value={userInfo.user_name}
//                 onChange={handleChange}
//                 className="mt-1 p-2 border rounded w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 name="user_email"
//                 value={userInfo.user_email}
//                 onChange={handleChange}
//                 className="mt-1 p-2 border rounded w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Password</label>
//               <input
//                 type="password"
//                 name="user_password"
//                 value={userInfo.user_password}
//                 onChange={handleChange}
//                 className="mt-1 p-2 border rounded w-full"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Contact Number</label>
//               <input
//                 type="text"
//                 name="user_contact_no"
//                 value={userInfo.user_contact_no}
//                 onChange={handleChange}
//                 className="mt-1 p-2 border rounded w-full"
//                 required
//               />
//             </div>
//             <div className="flex justify-end space-x-4 mt-6">
//               <Button variant="outline" onClick={() => router.push("/profile")}>
//                 Cancel
//               </Button>
//               <Button type="submit" variant="default">
//                 Save Changes
//               </Button>
//             </div>
//           </form>
//         </div>
//       {/* </Layout> */}
//     </ProtectedRoute>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../components/layout";
import { Button } from "@/app/components/ui/button";
import { api } from "@/utils/api";
import ProtectedRoute from "../../components/protected-route";
import { User, Save, X } from "lucide-react";

export default function EditProfile() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_contact_no: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.getUserInfo();
        if (response.success) {
          setUserInfo({
            user_name: response.user.user_name,
            user_email: response.user.user_email,
            user_password: "",
            user_contact_no: response.user.user_contact_no,
          });
        }
      } catch (err) {
        console.error("Error fetching user info:", err);
        setError("Failed to load user information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.updateProfile(userInfo);
      if (response.success) {
        router.push("/profile");
      } else {
        setError("Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="text-center text-red-600 mt-8 bg-red-50 p-4 rounded-lg">
            {error}
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden">
          <div className="bg-blue-500 text-white p-6 flex items-center">
            <User className="w-8 h-8 mr-3" />
            <h1 className="text-2xl font-bold">Edit Profile</h1>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {[
              {
                label: "Name",
                name: "user_name",
                type: "text",
                value: userInfo.user_name,
              },
              // {
              //   label: "Email",
              //   name: "user_email",
              //   type: "email",
              //   value: userInfo.user_email
              // },
              {
                label: "Change Password",
                name: "user_password",
                type: "password",
                value: userInfo.user_password,
              },
              {
                label: "Contact Number",
                name: "user_contact_no",
                type: "text",
                value: userInfo.user_contact_no,
              },
            ].map(({ label, name, type, value }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={value}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  required={name !== "user_password"}
                />
              </div>
            ))}

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                variant="outline"
                onClick={() => router.push("/profile")}
                className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <X className="w-5 h-5" /> Cancel
              </Button>
              <Button
                type="submit"
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Save className="w-5 h-5" /> Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
