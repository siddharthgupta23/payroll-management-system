import express from "express"
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

router.post(
  "/signup",
  asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: "User already exists" })
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || "employee",
    })

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || "secret123", {
      expiresIn: "30d",
    })

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    })
  }),
)

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" })
    }

    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || "secret123", {
      expiresIn: "30d",
    })

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    })
  }),
)

router.get(
  "/me",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.userId)
    res.json(user)
  }),
)

export default router
