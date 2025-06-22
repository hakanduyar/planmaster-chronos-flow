
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingCTA() {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-16 text-center relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-pink-600/10" />
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center justify-center mb-8"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                <Rocket className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-white mb-6"
            >
              Hayallerinizi Gerçekleştirmeye
              <br />
              <span className="gradient-text">Hazır mısınız?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto"
            >
              Bugün başlayın ve verimliliğinizi bir sonraki seviyeye taşıyın. 
              Ücretsiz deneme ile tüm özelliklerimizi keşfedin.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
            >
              <Link to="/register">
                <Button className="planmaster-button group px-8 py-4 text-xl font-semibold">
                  Ücretsiz Başla
                  <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <div className="text-white/60 text-sm">
                Kredi kartı gerekmez • Anında başlayın
              </div>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              viewport={{ once: true }}
              className="mt-16 pt-8 border-t border-white/20"
            >
              <p className="text-white/40 text-sm">
                © 2024 PlanMaster Pro. Tüm hakları saklıdır.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
