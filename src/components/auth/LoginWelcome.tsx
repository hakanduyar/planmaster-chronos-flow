
import React from 'react'
import { motion } from 'framer-motion'

export default function LoginWelcome() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="hidden sm:flex sm:w-1/2 lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 p-8 lg:p-12 items-center justify-center"
    >
      <div className="text-white text-center space-y-4 lg:space-y-6 max-w-lg">
        <h1 className="text-3xl lg:text-5xl font-bold mb-4 text-white">PlanMaster Pro</h1>
        <p className="text-lg lg:text-xl text-white">
          Günlük planlarınızı takip edin, hedeflerinize ulaşın ve verimliliğinizi artırın.
        </p>
        <div className="grid grid-cols-1 gap-3 lg:gap-4 mt-6 lg:mt-8">
          <div className="glass-card p-3 lg:p-4">
            <h3 className="font-semibold text-white text-sm lg:text-base">📋 Akıllı Görev Yönetimi</h3>
            <p className="text-xs lg:text-sm text-white">Görevlerinizi kategorilere ayırın ve öncelik verin</p>
          </div>
          <div className="glass-card p-3 lg:p-4">
            <h3 className="font-semibold text-white text-sm lg:text-base">📊 İlerme Takibi</h3>
            <p className="text-xs lg:text-sm text-white">Detaylı istatistikler ve grafiklerle ilerlemenizi izleyin</p>
          </div>
          <div className="glass-card p-3 lg:p-4">
            <h3 className="font-semibold text-white text-sm lg:text-base">🗓️ Takvim Entegrasyonu</h3>
            <p className="text-xs lg:text-sm text-white">Tüm planlarınızı tek bir yerden yönetin</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
