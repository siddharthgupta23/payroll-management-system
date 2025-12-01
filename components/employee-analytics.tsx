"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { API_BASE_URL } from "@/lib/config"
import { Spinner } from "@/components/ui/spinner"

export default function EmployeeAnalytics() {
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${API_BASE_URL}/employee/analytics`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setAnalytics(data)
    } catch (error) {
      console.error("Failed to fetch analytics", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Spinner />
  if (!analytics) return <div>No data available</div>

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Total Salary Earned</h3>
          <p className="text-3xl font-bold text-blue-600">₹{analytics.totalSalaryEarned.toFixed(0)}</p>
        </Card>

        <Card className="p-6 bg-green-50 border-green-200">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Total Expenses</h3>
          <p className="text-3xl font-bold text-green-600">₹{analytics.totalExpenseAmount.toFixed(0)}</p>
        </Card>

        <Card className="p-6 bg-purple-50 border-purple-200">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Approved Expenses</h3>
          <p className="text-3xl font-bold text-purple-600">{analytics.approvedExpenses}</p>
        </Card>

        <Card className="p-6 bg-orange-50 border-orange-200">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Pending Expenses</h3>
          <p className="text-3xl font-bold text-orange-600">{analytics.pendingExpenses}</p>
        </Card>
      </div>

      {/* Expense Trends */}
      {analytics.expenseTrends && analytics.expenseTrends.length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Expense Trends</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Month</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {analytics.expenseTrends.map((trend: any) => (
                  <tr key={trend._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{trend._id}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">₹{trend.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}
