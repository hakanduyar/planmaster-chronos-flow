
import React from 'react'
import { motion } from 'framer-motion'

export default function LoginWelcome() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 p-12 items-center justify-center"
    >
      <div className="text-white text-center space-y-6">
        <h1 className="text-5xl font-bold mb-4">PlanMaster Pro</h1>
        <p className="text-xl text-blue-100 max-w-md">
          Günlük planlarınızı takip edin, hedeflerinize ulaşın ve verimliliğinizi artırın.
        </p>
        <div className="grid grid-cols-1 gap-4 mt-8">
          <div className="glass-card p-4">
            <h3 className="font-semibold text-white">📋 Akıllı Görev Yönetimi</h3>
            <p className="text-sm text-blue-100">Görevlerinizi kategorilere ayırın ve öncelik verin</p>
          </div>
          <div className="glass-card p-4">
            <h3 className="font-semibold text-white">📊 İlerme Takibi</h3>
            <p className="text-sm text-blue-100">Detaylı istatistikler ve grafiklerle ilerlemenizi izleyin</p>
          </div>
          <div className="glass-card p-4">
            <h3 className="font-semibold text-white">🗓️ Takvim Entegrasyonu</h3>
            <p className="text-sm text-blue-100">Tüm planlarınızı tek bir yerden yönetin</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
