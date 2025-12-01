"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import SalarySlipForm from "./salary-slip-form"
import EmployeeList from "./employee-list"
import AdminAnalytics from "./admin-analytics"

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome, {user?.name}</p>
          </div>
          <Button onClick={logout} variant="outline">
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b overflow-x-auto">
          {["dashboard", "salary", "employees"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize ${
                activeTab === tab ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "dashboard" && <AdminAnalytics />}

        {activeTab === "salary" && (
          <div>
            <div className="mb-6">
              <Button onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "Create Salary Slip"}</Button>
            </div>
            {showForm && <SalarySlipForm onSuccess={() => setShowForm(false)} />}
          </div>
        )}

        {activeTab === "employees" && <EmployeeList />}
      </main>
    </div>
  )
}
