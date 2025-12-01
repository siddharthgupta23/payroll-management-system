"use client"

import { useState, useEffect } from "react"
import { API_BASE_URL } from "@/lib/config"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "employee"
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router=useRouter();


  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (res.ok) {
          const userData = await res.json()
          setUser({
            id: userData._id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
          })
        } else {
          localStorage.removeItem("token")
        }
      } catch (error) {
        localStorage.removeItem("token")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.message || "Login failed")
    }

    const data = await res.json()
    localStorage.setItem("token", data.token)
    setUser({
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      role: data.user.role,
    })
  }

  const signup = async (name: string, email: string, password: string, role: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.message || "Signup failed")
    }

    const data = await res.json()
    localStorage.setItem("token", data.token)
    setUser({
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      role: data.user.role,
    })
  }

  const logout = () => {
    localStorage.removeItem("token")
    router.push('/login')

    setUser(null)
  }

  return { user, loading, login, signup, logout }
}
