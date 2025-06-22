
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingHero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-14">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-purple-600/15 rounded-full mix-blend-multiply filter blur-xl"
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
          className="absolute top-3/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-blue-600/15 rounded-full mix-blend-multiply filter blur-xl"
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
          className="absolute bottom-1/4 left-1/2 w-72 h-72 md:w-96 md:h-96 bg-pink-600/15 rounded-full mix-blend-multiply filter blur-xl"
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

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Rocket emoji */}
        <motion.div
          className="absolute top-28 left-8 md:top-36 md:left-20 text-3xl md:text-5xl"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🚀
        </motion.div>

        {/* Chart emoji */}
        <motion.div
          className="absolute top-40 right-8 md:top-48 md:right-20 text-2xl md:text-4xl"
          animate={{
            y: [0, 12, 0],
            rotate: [0, -3, 3, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          📊
        </motion.div>

        {/* Document emoji */}
        <motion.div
          className="absolute bottom-40 left-6 md:bottom-48 md:left-16 text-2xl md:text-4xl"
          animate={{
            y: [0, -8, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          📋
        </motion.div>

        {/* Target emoji */}
        <motion.div
          className="absolute bottom-52 right-10 md:bottom-60 md:right-24 text-3xl md:text-5xl"
          animate={{
            y: [0, 10, 0],
            rotate: [0, -4, 4, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          🎯
        </motion.div>

        {/* Calendar emoji */}
        <motion.div
          className="absolute top-24 right-6 md:top-32 md:right-12 text-2xl md:text-4xl"
          animate={{
            y: [0, -6, 0],
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          📅
        </motion.div>

        {/* Lightning emoji */}
        <motion.div
          className="absolute bottom-32 left-12 md:bottom-40 md:left-28 text-2xl md:text-4xl"
          animate={{
            y: [0, 14, 0],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        >
          ⚡
        </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 md:space-y-12"
        >
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-6 md:mb-8"
          >
            <div className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <Zap className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
              <span className="text-white/90 text-sm md:text-base font-medium">
                Karmaşayı Netliğe Dönüştürün
              </span>
            </div>
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
          >
            <span className="gradient-text">PlanMaster</span>
            <br />
            <span className="text-white">Pro</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg md:text-2xl lg:text-3xl text-white/80 max-w-4xl mx-auto leading-relaxed"
          >
            Net ürün planları oluşturmanın zahmetsiz ve verimli olduğu bir dünya hayal edin. 
            <span className="gradient-text font-semibold"> PlanMaster Pro</span> ile fikirlerinizi 
            eylem planlarına dönüştürün ve kolaylıkla ilerlemeyi hızlandırın.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 my-12 md:my-16"
          >
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold gradient-text mb-2">95%</div>
              <div className="text-sm md:text-base text-white/70">Manuel çalışmada tasarruf</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold gradient-text mb-2">10x</div>
              <div className="text-sm md:text-base text-white/70">Verimliliğinizi artırın</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold gradient-text mb-2">1 Hedef</div>
              <div className="text-sm md:text-base text-white/70">Net ürün vizyonu</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold gradient-text mb-2">100%</div>
              <div className="text-sm md:text-base text-white/70">AI destekli deneyim</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
          >
            <Link to="/register">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 md:px-12 md:py-6 text-lg md:text-xl font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
                  Ücretsiz Denemeyi Başlat
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </Link>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                variant="outline" 
                className="border-2 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 px-8 py-4 md:px-12 md:py-6 text-lg md:text-xl font-semibold backdrop-blur-sm rounded-xl transition-all duration-300"
              >
                Daha Fazla Bilgi
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 md:mt-24 pt-8 border-t border-white/10"
          >
            <p className="text-white/60 text-sm md:text-base mb-6">
              Binlerce kullanıcının güvendiği platform
            </p>
            <div className="flex items-center justify-center gap-8 md:gap-16 text-white/40 text-xs md:text-sm">
              <div>✓ Kredi kartı gerekmez</div>
              <div>✓ Anında kurulum</div>
              <div>✓ 30 gün garanti</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
