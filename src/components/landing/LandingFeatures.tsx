
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, BarChart3, Bell, Smartphone, Shield } from 'lucide-react';

const features = [
  {
    icon: CheckCircle,
    title: 'Akıllı Görev Yönetimi',
    description: 'Görevlerinizi kategorilere ayırın, öncelik belirleyin ve otomatik hatırlatmalar alın.',
    color: 'from-blue-400 to-blue-600'
  },
  {
    icon: Calendar,
    title: 'Gelişmiş Takvim',
    description: 'Günlük, haftalık ve aylık görünümlerle planlarınızı mükemmel şekilde organize edin.',
    color: 'from-purple-400 to-purple-600'
  },
  {
    icon: BarChart3,
    title: 'Detaylı Analitik',
    description: 'Verimliliğinizi izleyin, ilerlemenizi takip edin ve hedefe odaklanın.',
    color: 'from-pink-400 to-pink-600'
  },
  {
    icon: Bell,
    title: 'Akıllı Bildirimler',
    description: 'Önemli görevler için zamanında hatırlatmalar ve kişiselleştirilmiş uyarılar.',
    color: 'from-green-400 to-green-600'
  },
  {
    icon: Smartphone,
    title: 'Çoklu Platform',
    description: 'Mobil, tablet ve masaüstünde kesintisiz senkronizasyon ile her yerden erişim.',
    color: 'from-yellow-400 to-yellow-600'
  },
  {
    icon: Shield,
    title: 'Güvenli Depolama',
    description: 'Verileriniz en yüksek güvenlik standartlarıyla korunur ve şifrelenir.',
    color: 'from-red-400 to-red-600'
  }
];

export default function LandingFeatures() {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Neden <span className="gradient-text">PlanMaster Pro?</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
            Hayatınızı organize etmek için ihtiyacınız olan tüm araçlar tek platformda
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="group"
            >
              <div className="glass-card p-6 md:p-8 h-full hover:border-purple-400/30 transition-all duration-300">
                <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
