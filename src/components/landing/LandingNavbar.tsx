
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingNavbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
              <Zap className="w-3 h-3 md:w-5 md:h-5 text-white" />
            </div>
            <h1 className="text-lg md:text-xl font-bold gradient-text">
              PlanMaster Pro
            </h1>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-white/80 hover:text-white transition-colors">
              Özellikler
            </a>
            <a href="#testimonials" className="text-white/80 hover:text-white transition-colors">
              Yorumlar
            </a>
            <a href="#pricing" className="text-white/80 hover:text-white transition-colors">
              Fiyatlar
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link to="/login">
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10 text-sm md:text-base px-3 md:px-4 py-2"
              >
                Giriş Yap
              </Button>
            </Link>
            <Link to="/register">
              <Button className="planmaster-button text-sm md:text-base px-3 md:px-6 py-2">
                Ücretsiz Başla
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
