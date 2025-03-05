"use client";

import { useEffect, useState } from "react";
import { Card, Table, Title, Text, Button } from "@tremor/react";
import { api } from "../../utils/api";
import { Users, Shield, ShieldOff } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.getAllUsers();
        setUsers(response);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const toggleAdminStatus = async (userId: number, isAdmin: boolean) => {
    try {
      await api.updateAdminStatus(userId, !isAdmin);
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, is_admin: !isAdmin } : user
        )
      );
    } catch (error) {
      console.error("Failed to update admin status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <main className="container mx-auto p-8">
        <div className="mb-8 text-center">
          <div className="inline-flex p-4 bg-blue-100 rounded-full mb-4">
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <Title className="text-3xl font-bold text-gray-900">
            User Management
          </Title>
          <Text className="mt-2 text-gray-600">
            Manage user roles and permissions
          </Text>
        </div>

        <Card className="overflow-hidden rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-xl">
          <div className="overflow-x-auto">
            <Table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50 to-purple-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      #{user.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-200 to-purple-200 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-800">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          user.is_admin
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.is_admin ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        size="xs"
                        variant="secondary"
                        color={user.is_admin ? "red" : "blue"}
                        onClick={() =>
                          toggleAdminStatus(user.id, user.is_admin)
                        }
                        className="inline-flex items-center px-4 py-2 rounded-full transition-all duration-200 hover:shadow-lg"
                      >
                        {user.is_admin ? (
                          <>
                            <ShieldOff className="w-4 h-4 mr-2" />
                            Remove Admin
                          </>
                        ) : (
                          <>
                            <Shield className="w-4 h-4 mr-2" />
                            Make Admin
                          </>
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      </main>
    </div>
  );
}
