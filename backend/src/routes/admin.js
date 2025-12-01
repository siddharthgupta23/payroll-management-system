import express from "express"
import asyncHandler from "express-async-handler"
import { protect, adminOnly } from "../middleware/auth.js"
import SalarySlip from "../models/SalarySlip.js"
import User from "../models/User.js"
import Expense from "../models/Expense.js" // Added import for Expense

const router = express.Router()

router.post(
  "/salary-slip",
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    const { employeeId, month, year, basicSalary, allowances, deductions } = req.body

    const netSalary = basicSalary + allowances - deductions

    const salarySlip = await SalarySlip.create({
      employeeId,
      month,
      year,
      basicSalary,
      allowances,
      deductions,
      netSalary,
    })

    res.status(201).json(salarySlip)
  }),
)

router.put(
  "/salary-slip/:id",
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    const { basicSalary, allowances, deductions, status } = req.body

    let salarySlip = await SalarySlip.findById(req.params.id)
    if (!salarySlip) {
      return res.status(404).json({ message: "Salary slip not found" })
    }

    const netSalary = basicSalary + allowances - deductions

    salarySlip = await SalarySlip.findByIdAndUpdate(
      req.params.id,
      { basicSalary, allowances, deductions, netSalary, status },
      { new: true },
    )

    res.json(salarySlip)
  }),
)

router.get(
  "/salary-slip/:id",
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    const salarySlip = await SalarySlip.findById(req.params.id).populate("employeeId")
    if (!salarySlip) {
      return res.status(404).json({ message: "Salary slip not found" })
    }
    res.json(salarySlip)
  }),
)

router.get(
  "/employees",
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    const employees = await User.find({ role: "employee" })
    res.json(employees)
  }),
)

router.get(
  "/expenses",
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    const expenses = await Expense.find().populate("employeeId")
    res.json(expenses)
  }),
)

router.get(
  "/analytics",
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    const totalEmployees = await User.countDocuments({ role: "employee" })
    const totalSalarySlips = await SalarySlip.countDocuments()
    const totalExpenses = await Expense.countDocuments()
    const totalExpenseAmount = await Expense.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }])

    const salaryTrends = await SalarySlip.aggregate([
      {
        $group: {
          _id: { month: "$month", year: "$year" },
          totalSalary: { $sum: "$netSalary" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 12 },
    ])

    res.json({
      totalEmployees,
      totalSalarySlips,
      totalExpenses,
      totalExpenseAmount: totalExpenseAmount[0]?.total || 0,
      salaryTrends,
    })
  }),
)

export default router
