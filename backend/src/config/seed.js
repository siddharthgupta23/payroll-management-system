import User from "../models/User.js"
import SalarySlip from "../models/SalarySlip.js"
import Expense from "../models/Expense.js"
import connectDB from "./database.js"

const seedDatabase = async () => {
  try {
    await connectDB()

    // Clear existing data
    await User.deleteMany({})
    await SalarySlip.deleteMany({})
    await Expense.deleteMany({})

    console.log("Database cleared...")

    // Create demo users
    const adminUser = await User.create({
      name: "Admin User",
      email: "hire-me@anshumat.org",
      password: "HireMe@2025!",
      role: "admin",
    })

    const emp1 = await User.create({
      name: "John Doe",
      email: "emp1@example.com",
      password: "password123",
      role: "employee",
      department: "Engineering",
      position: "Senior Developer",
      salary: 75000,
    })

    const emp2 = await User.create({
      name: "Jane Smith",
      email: "emp2@example.com",
      password: "password123",
      role: "employee",
      department: "Finance",
      position: "Financial Analyst",
      salary: 65000,
    })

    console.log("Users created...")

    // Create sample salary slips
    await SalarySlip.create([
      {
        employeeId: emp1._id,
        month: "January",
        year: 2024,
        basicSalary: 75000,
        allowances: 5000,
        deductions: 5000,
        netSalary: 75000,
        status: "paid",
      },
      {
        employeeId: emp1._id,
        month: "February",
        year: 2024,
        basicSalary: 75000,
        allowances: 5000,
        deductions: 5000,
        netSalary: 75000,
        status: "approved",
      },
      {
        employeeId: emp2._id,
        month: "January",
        year: 2024,
        basicSalary: 65000,
        allowances: 3000,
        deductions: 4000,
        netSalary: 64000,
        status: "paid",
      },
    ])

    console.log("Salary slips created...")

    // Create sample expenses
    await Expense.create([
      {
        employeeId: emp1._id,
        category: "travel",
        amount: 2500,
        description: "Flight to client meeting in Mumbai",
        date: new Date("2024-01-15"),
        status: "approved",
        month: "January",
        year: 2024,
      },
      {
        employeeId: emp1._id,
        category: "meals",
        amount: 500,
        description: "Team lunch",
        date: new Date("2024-01-20"),
        status: "pending",
        month: "January",
        year: 2024,
      },
      {
        employeeId: emp2._id,
        category: "office-supplies",
        amount: 1200,
        description: "Office stationery and supplies",
        date: new Date("2024-01-10"),
        status: "approved",
        month: "January",
        year: 2024,
      },
    ])

    console.log("Expenses created...")
    console.log("Database seeded successfully!")
    process.exit(0)
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()
