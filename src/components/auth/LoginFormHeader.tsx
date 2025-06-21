
import React from 'react'
import { CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginFormHeader() {
  return (
    <CardHeader className="text-center pb-2 px-4 md:px-6">
      <CardTitle className="text-xl md:text-2xl font-bold text-white">
        Giriş Yap
      </CardTitle>
      <p className="text-sm md:text-base text-white/80">Hesabınıza giriş yapın</p>
    </CardHeader>
  )
}
