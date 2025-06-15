
import React from 'react'
import LoginWelcome from '@/components/auth/LoginWelcome'
import LoginForm from '@/components/auth/LoginForm'

export default function Login() {
  return (
    <div className="min-h-screen flex w-full">
      <LoginWelcome />
      <LoginForm />
    </div>
  )
}
