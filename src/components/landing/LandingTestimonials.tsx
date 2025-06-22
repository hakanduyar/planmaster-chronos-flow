
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ahmet Yılmaz',
    role: 'Proje Yöneticisi',
    company: 'TechCorp',
    content: 'PlanMaster Pro sayesinde ekibimin verimliliği %40 arttı. Artık hiçbir görev gözden kaçmıyor.',
    rating: 5,
    avatar: 'AY'
  },
  {
    name: 'Zeynep Kaya',
    role: 'Freelancer',
    company: 'Digital Marketing',
    content: 'Müşteri projelerimi organize etmek hiç bu kadar kolay olmamıştı. Kesinlikle tavsiye ediyorum!',
    rating: 5,
    avatar: 'ZK'
  },
  {
    name: 'Mehmet Demir',
    role: 'Startup Kurucusu',
    company: 'InnovateTech',
    content: 'Hem kişisel hem de iş hayatımda kullanıyorum. Hayat kurtarıcı bir uygulama gerçekten.',
    rating: 5,
    avatar: 'MD'
  },
  {
    name: 'Ayşe Özkan',
    role: 'Öğretmen',
    company: 'Eğitim Sektörü',
    content: 'Ders planlarımı ve öğrenci takibimi çok daha etkili yapabiliyorum. Mükemmel bir araç.',
    rating: 5,
    avatar: 'AÖ'
  },
  {
    name: 'Can Arslan',
    role: 'Yazılım Geliştirici',
    company: 'DevStudio',
    content: 'Code review süreçlerinden sprint planlamaya kadar her şeyi takip ediyorum. Harika!',
    rating: 5,
    avatar: 'CA'
  },
  {
    name: 'Elif Şahin',
    role: 'İçerik Editörü',
    company: 'MediaHub',
    content: 'Editorial takvimimi planlamak için vazgeçilmez oldu. Deadline\'ları kaçırmak artık tarih!',
    rating: 5,
    avatar: 'EŞ'
  }
];

export default function LandingTestimonials() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            <span className="gradient-text">Kullanıcılarımız</span> Ne Diyor?
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
            Binlerce memnun kullanıcımızdan gelen gerçek yorumlar
          </p>
        </motion.div>

        <div className="relative">
          {/* Scrolling testimonials container */}
          <div className="flex space-x-6 animate-scroll">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={`${testimonial.name}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: (index % 6) * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="flex-shrink-0 w-80 md:w-96"
              >
                <div className="glass-card p-6 md:p-8 h-full hover:border-purple-400/30 transition-all duration-300 relative">
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-purple-400/30" />
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-white/90 leading-relaxed mb-6 text-lg">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-white/70 text-sm">
                        {testimonial.role} • {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
