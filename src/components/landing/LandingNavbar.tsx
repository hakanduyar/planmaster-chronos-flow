
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingNavbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-xl border-b border-white/5"
    >
      <div className="w-full max-w-none px-6 lg:px-12">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-7 h-7 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-bold gradient-text">
              PlanMaster Pro
            </h1>
          </motion.div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-8">
            <motion.a 
              href="#features" 
              className="text-white/70 hover:text-white transition-colors text-sm font-medium"
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
            >
              Özellikler
            </motion.a>
            <motion.a 
              href="#testimonials" 
              className="text-white/70 hover:text-white transition-colors text-sm font-medium"
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
            >
              Yorumlar
            </motion.a>
            <motion.a 
              href="#pricing" 
              className="text-white/70 hover:text-white transition-colors text-sm font-medium"
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
            >
              Fiyatlar
            </motion.a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button 
                variant="ghost" 
                className="text-white/80 hover:text-white hover:bg-white/5 text-sm px-4 py-2 h-9"
              >
                Giriş Yap
              </Button>
            </Link>
            <Link to="/register">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-sm px-5 py-2 h-9 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  Başlayın
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
