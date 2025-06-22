
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute top-3/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/2 w-64 h-64 md:w-96 md:h-96 bg-pink-600/20 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Logo ve başlık */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 md:w-8 md:h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold gradient-text">
              PlanMaster Pro
            </h1>
          </motion.div>

          {/* Ana başlık */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl md:text-7xl font-bold text-white leading-tight"
          >
            Hayallerinizi{' '}
            <span className="gradient-text">Gerçekleştirin</span>
          </motion.h2>

          {/* Alt başlık */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed"
          >
            Görevlerinizi organize edin, hedeflerinizi takip edin ve 
            verimliliğinizi artıran akıllı planlarla başarıya ulaşın.
          </motion.p>

          {/* Özellik ikonları */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex items-center justify-center gap-8 md:gap-12 my-12"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-glass rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
              </div>
              <span className="text-sm md:text-base text-white/70">Hedef Takibi</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-glass rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />
              </div>
              <span className="text-sm md:text-base text-white/70">Akıllı Planlama</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-glass rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 md:w-8 md:h-8 text-pink-400" />
              </div>
              <span className="text-sm md:text-base text-white/70">Hızlı Erişim</span>
            </div>
          </motion.div>

          {/* CTA Butonları */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
          >
            <Link to="/register">
              <Button className="planmaster-button group px-8 py-4 text-lg font-semibold">
                Hemen Başla
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                variant="outline" 
                className="border-2 border-white/30 bg-transparent text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm"
              >
                Giriş Yap
              </Button>
            </Link>
          </motion.div>

          {/* Güven göstergeleri */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 pt-8 border-t border-white/20"
          >
            <p className="text-white/60 text-sm md:text-base mb-6">
              Binlerce kullanıcının güvendiği platform
            </p>
            <div className="flex items-center justify-center gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">10K+</div>
                <div className="text-sm md:text-base text-white/60">Aktif Kullanıcı</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">50K+</div>
                <div className="text-sm md:text-base text-white/60">Tamamlanan Görev</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">99%</div>
                <div className="text-sm md:text-base text-white/60">Memnuniyet</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
