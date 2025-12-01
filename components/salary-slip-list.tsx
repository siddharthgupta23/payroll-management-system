"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { API_BASE_URL } from "@/lib/config"
import { Spinner } from "@/components/ui/spinner"

export default function SalarySlipList() {
  const [salarySlips, setSalarySlips] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSalarySlips()
  }, [])

  const fetchSalarySlips = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${API_BASE_URL}/employee/salary-slip`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setSalarySlips(data)
    } catch (error) {
      console.error("Failed to fetch salary slips", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Spinner />

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Salary Slips</h2>

      {salarySlips.length === 0 ? (
        <Card className="p-6 text-center text-gray-600">No salary slips found</Card>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Month</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Year</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Basic Salary</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Allowances</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Deductions</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Net Salary</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {salarySlips.map((slip) => (
                <tr key={slip._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{slip.month}</td>
                  <td className="border border-gray-300 px-4 py-2">{slip.year}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">₹{slip.basicSalary.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">₹{slip.allowances.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">₹{slip.deductions.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right font-bold">
                    ₹{slip.netSalary.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        slip.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : slip.status === "approved"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {slip.status.charAt(0).toUpperCase() + slip.status.slice(1)}
                    </span>
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
