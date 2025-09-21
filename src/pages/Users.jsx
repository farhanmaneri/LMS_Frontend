import React from "react";
import { useGetUsersQuery } from "../redux/api/apiSlice"
export default function Users() {
  const { data: users, isLoading, isError } = useGetUsersQuery();

  if (isLoading) return <p className="p-4">Loading users...</p>;
  if (isError) return <p className="p-4 text-red-500">Failed to load users.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">👥 Users</h1>
      {users?.length > 0 ? (
        <table className="w-full border border-gray-200 shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u._id} className="hover:bg-gray-50">
                <td className="p-2 border">{i + 1}</td>
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}
