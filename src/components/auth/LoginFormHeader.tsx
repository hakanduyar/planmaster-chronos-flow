
import React from 'react'
import { CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginFormHeader() {
  return (
    <CardHeader className="text-center pb-2">
      <CardTitle className="text-2xl font-bold text-gray-800">
        Giriş Yap
      </CardTitle>
      <p className="text-gray-800">Hesabınıza giriş yapın</p>
    </CardHeader>
  )
}
