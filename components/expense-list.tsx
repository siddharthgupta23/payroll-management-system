"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { API_BASE_URL } from "@/lib/config"
import { Spinner } from "@/components/ui/spinner"

export default function ExpenseList() {
  const [expenses, setExpenses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchExpenses()
  }, [])

  // const fetchExpenses = async () => {
  //   try {
  //     const token = localStorage.getItem("token")
  //     const res = await fetch(`${API_BASE_URL}/employee/expense`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     const data = await res.json()
  //     setExpenses(data)
  //   } catch (error) {
  //     console.error("Failed to fetch expenses", error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const fetchExpenses = async () => {
  try {
    const token = localStorage.getItem("token")
    const res = await fetch(`${API_BASE_URL}/employee/expense`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await res.json()

    console.log("API DATA:", data)

    // Safely extract array
    const expenseList =
      Array.isArray(data) ? data :
      data?.expenses ? data.expenses :
      data?.data ? data.data :
      []

    setExpenses(expenseList)
  } catch (error) {
    console.error("Failed to fetch expenses", error)
  } finally {
    setLoading(false)
  }
}


  if (loading) return <Spinner />

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Expenses</h2>

      {expenses.length === 0 ? (
        <Card className="p-6 text-center text-gray-600">No expenses submitted</Card>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Amount</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 capitalize">{expense.category}</td>
                  <td className="border border-gray-300 px-4 py-2">{expense.description}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">₹{expense.amount.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(expense.date).toLocaleDateString()}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        expense.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : expense.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
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
