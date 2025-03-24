import React from "react";

const Admin: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h2>
      <p className="text-gray-700 mb-4">
        Welcome to the Admin Dashboard. Only users with the "admin" role can
        access this page.
      </p>
      <div className="bg-gray-100 p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">Admin Actions</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Manage users</li>
          <li>View all verification results</li>
          <li>Update system settings</li>
        </ul>
      </div>
    </div>
  );
};

export default Admin;
