"use client";
import { useEffect, useState } from 'react';
import { Card, Table, Title, Text, Button } from "@tremor/react";
import { api } from '../../../utils/api';

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
      setUsers(users.map(user => user.id === userId ? { ...user, is_admin: !isAdmin } : user));
    } catch (error) {
      console.error("Failed to update admin status:", error);
    }
  };

  return (
    <main className="p-6 md:p-12 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-xl mx-auto max-w-7xl shadow-md">
      <Title className="text-2xl font-semibold">All Users</Title>
      <Text className="mt-2 text-gray-600">List of all registered users</Text>
      <Card className="mt-6 shadow-lg">
        <Table className="mt-6 border-t border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Admin</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.is_admin ? "Yes" : "No"}</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <Button
                      size="xs"
                      variant="secondary"
                      color={user.is_admin ? "red" : "green"}
                      onClick={() => toggleAdminStatus(user.id, user.is_admin)}
                      className="transition-all duration-200 hover:shadow-md rounded-full px-4 py-2"
                    >
                      {user.is_admin ? "Remove Admin" : "Make Admin"}
                    </Button>
                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </main>
  );
}