import express from "express"
import asyncHandler from "express-async-handler"
import { protect } from "../middleware/auth.js"
import SalarySlip from "../models/SalarySlip.js"
import Expense from "../models/Expense.js"

const router = express.Router()

router.get(
  "/salary-slip",
  protect,
  asyncHandler(async (req, res) => {
    const salarySlips = await SalarySlip.find({ employeeId: req.userId })
    res.json(salarySlips)
  }),
)

router.post(
  "/expense",
  protect,
  asyncHandler(async (req, res) => {
    const { category, amount, description, date } = req.body
    const now = new Date(date || Date.now())

    const expense = await Expense.create({
      employeeId: req.userId,
      category,
      amount,
      description,
      date: now,
      month: now.toLocaleString("default", { month: "long" }),
      year: now.getFullYear(),
    })

    res.status(201).json(expense)
  }),
)

router.get(
  "/expense",
  protect,
  asyncHandler(async (req, res) => {
    const expenses = await Expense.find({ employeeId: req.userId })
    res.json(expenses)
  }),
)

router.get(
  "/analytics",
  protect,
  asyncHandler(async (req, res) => {
    const salarySlips = await SalarySlip.find({ employeeId: req.userId })
    const expenses = await Expense.find({ employeeId: req.userId })

    const totalSalaryEarned = salarySlips.reduce((sum, slip) => sum + slip.netSalary, 0)
    const totalExpenseAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0)
    const approvedExpenses = expenses.filter((e) => e.status === "approved").length
    const pendingExpenses = expenses.filter((e) => e.status === "pending").length

    const expenseTrends = await Expense.aggregate([
      { $match: { employeeId: req.userId } },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$amount" },
        },
      },
      { $sort: { _id: -1 } },
    ])

    res.json({
      totalSalaryEarned,
      totalExpenseAmount,
      approvedExpenses,
      pendingExpenses,
      expenseTrends,
      recentSalaries: salarySlips.slice(-3),
    })
  }),
)

export default router
