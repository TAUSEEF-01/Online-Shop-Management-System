"use client";

import Layout from "../components/layout";
import AddProductForm from "../components/AddProductForm";
import AdminLayout from "../components/admin-layout";
import ProtectedRoute from "../components/protected-route";

export default function AddProduct() {
  return (
    // <Layout>
    // <div className="max-w-2xl mx-auto py-8 px-4">
    // <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
    <ProtectedRoute>
      <AdminLayout>
        <AddProductForm />
      </AdminLayout>
    </ProtectedRoute>
    // </div>
    // </Layout>
  );
}
