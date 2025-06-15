
import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Users, Zap, Shield } from 'lucide-react'

export default function LoginWelcome() {
  const features = [
    {
      icon: CheckCircle,
      title: 'Akıllı Görev Yönetimi',
      description: 'Görevlerinizi düzenleyin ve takip edin'
    },
    {
      icon: Users,
      title: 'Takım Çalışması',
      description: 'Ekibinizle kolayca işbirliği yapın'
    },
    {
      icon: Zap,
      title: 'Yüksek Performans',
      description: 'Hızlı ve güvenilir platform'
    },
    {
      icon: Shield,
      title: 'Güvenli Platform',
      description: 'Verileriniz tamamen güvende'
    }
  ]

  return (
    <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-12 flex-col justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            PlanMaster Pro'ya
            <br />
            <span className="text-blue-200">Hoş Geldiniz</span>
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Görevlerinizi organize edin, projelerinizi takip edin ve
            ekibinizle daha verimli çalışın. Modern iş yönetimi 
            çözümünüz burada.
          </p>
        </div>

        <div className="space-y-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start space-x-4 p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex-shrink-0 p-2 bg-white/20 rounded-lg">
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 p-6 rounded-xl bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20"
        >
          <blockquote className="text-white italic">
            "PlanMaster Pro sayesinde takım verimliliğimiz %40 arttı. 
            Artık hiçbir görev gözden kaçmıyor!"
          </blockquote>
          <cite className="text-blue-200 text-sm mt-2 block font-medium">
            — Ahmet Yılmaz, Proje Yöneticisi
          </cite>
        </motion.div>
      </motion.div>

      {/* Decorative gradient orbs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-cyan-400/20 rounded-full blur-3xl"></div>
    </div>
  )
}
