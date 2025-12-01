"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { API_BASE_URL } from "@/lib/config"

export default function SalarySlipForm({ onSuccess }: { onSuccess: () => void }) {
  const [employees, setEmployees] = useState<any[]>([])
  const [formData, setFormData] = useState({
    employeeId: "",
    month: "",
    year: new Date().getFullYear(),
    basicSalary: "",
    allowances: "0",
    deductions: "0",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

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
    } catch (err: any) {
      setError("Failed to load employees")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${API_BASE_URL}/admin/salary-slip`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          basicSalary: Number.parseFloat(formData.basicSalary),
          allowances: Number.parseFloat(formData.allowances),
          deductions: Number.parseFloat(formData.deductions),
        }),
      })

      if (!res.ok) throw new Error("Failed to create salary slip")

      onSuccess()
      setFormData({
        employeeId: "",
        month: "",
        year: new Date().getFullYear(),
        basicSalary: "",
        allowances: "0",
        deductions: "0",
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Create Salary Slip</h2>

      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
          <select
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
          <Input
            type="text"
            name="month"
            value={formData.month}
            onChange={handleChange}
            placeholder="January"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
          <Input type="number" name="year" value={formData.year} onChange={handleChange} required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Basic Salary</label>
          <Input
            type="number"
            name="basicSalary"
            value={formData.basicSalary}
            onChange={handleChange}
            placeholder="50000"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Allowances</label>
          <Input type="number" name="allowances" value={formData.allowances} onChange={handleChange} placeholder="0" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deductions</label>
          <Input type="number" name="deductions" value={formData.deductions} onChange={handleChange} placeholder="0" />
        </div>

        <Button type="submit" disabled={loading} className="md:col-span-2">
          {loading ? "Creating..." : "Create Salary Slip"}
        </Button>
      </form>
    </Card>
  )
}
