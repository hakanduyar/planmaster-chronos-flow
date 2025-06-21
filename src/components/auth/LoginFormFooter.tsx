
import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginFormFooter() {
  return (
    <div className="text-center pt-4 border-t border-white/20">
      <p className="text-xs md:text-sm text-white/80">
        Hesabınız yok mu?{' '}
        <Link
          to="/register"
          className="text-blue-400 hover:text-blue-300 hover:underline font-medium"
        >
          Kayıt olun
        </Link>
      </p>
    </div>
  )
}
