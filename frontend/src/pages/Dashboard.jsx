import React from "react";
import { useAuth } from "../context/AppContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <section className="mx-auto max-w-5xl rounded-3xl bg-white p-10 shadow-xl">
        <h1 className="text-4xl font-semibold mb-4">Dashboard</h1>
        <p className="text-slate-600 mb-6">Welcome back, {user?.name || "user"}.</p>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold mb-2">Profile</h2>
            <p className="text-slate-600">Email: {user?.email}</p>
            <p className="text-slate-600">Phone: {user?.phone}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold mb-2">Role</h2>
            <p className="text-slate-600">{user?.role || "user"}</p>
            <p className="text-slate-500 text-sm mt-2">Your dashboard is protected and visible only when signed in.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;