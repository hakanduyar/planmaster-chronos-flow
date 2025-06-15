
import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginFormFooter() {
  return (
    <div className="text-center pt-4 border-t">
      <p className="text-sm text-gray-800">
        Hesabınız yok mu?{' '}
        <Link
          to="/register"
          className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
        >
          Kayıt olun
        </Link>
      </p>
    </div>
  )
}
