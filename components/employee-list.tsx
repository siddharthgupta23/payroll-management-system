"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { API_BASE_URL } from "@/lib/config"
import { Spinner } from "@/components/ui/spinner"

export default function EmployeeList() {
  const [employees, setEmployees] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${API_BASE_URL}/admin/employees`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setEmployees(data)
    } catch (error) {
      console.error("Failed to fetch employees", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Spinner />

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">All Employees</h2>

      {employees.length === 0 ? (
        <Card className="p-6 text-center text-gray-600">No employees found</Card>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Department</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Position</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Salary</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{emp.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{emp.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{emp.department || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{emp.position || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {emp.salary ? `₹${emp.salary.toFixed(2)}` : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
