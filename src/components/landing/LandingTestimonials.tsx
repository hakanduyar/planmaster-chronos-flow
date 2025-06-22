
import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare } from 'lucide-react';

const testimonials = [
  {
    name: 'Ahmet Yılmaz',
    role: 'Proje Yöneticisi',
    company: 'TechCorp',
    content: 'Form oluşturucu inanılmaz derecede sezgisel ve güçlü. Veri toplama sürecimizi önemli ölçüde kolaylaştırdı ve sayısız saat tasarruf sağladı.',
    rating: 5,
    avatar: 'A'
  },
  {
    name: 'Zeynep Kaya',
    role: 'Pazarlama Müdürü', 
    company: 'Digital Marketing',
    content: 'Şimdiye kadar kullandığım en iyi form oluşturucu. Analitik özellikleri olağanüstü ve arayüz karmaşık formları oluşturmayı çok kolay hale getiriyor.',
    rating: 5,
    avatar: 'Z'
  },
  {
    name: 'Mehmet Demir',
    role: 'Araştırma Lideri',
    company: 'InnovateTech',
    content: 'Koşullu mantık ve hesaplama özellikleri oyunun kurallarını değiştirdi. Bu araç anket süreçlerimizi nasıl yönettiğimizi tamamen dönüştürdü.',
    rating: 5,
    avatar: 'M'
  },
  {
    name: 'Ayşe Özkan',
    role: 'Ürün Müdürü',
    company: 'Eğitim Sektörü',
    content: 'Kullanım kolaylığı ve güçlü özelliklerin mükemmel birleşimi. Ekibimizin veri toplama verimliliği %300 arttı.',
    rating: 5,
    avatar: 'A'
  },
  {
    name: 'Can Arslan',
    role: 'Yazılım Geliştirici',
    company: 'DevStudio',
    content: 'Teknik entegrasyon çok kolay ve API dokümantasyonu mükemmel. Geliştirici deneyimi harika!',
    rating: 5,
    avatar: 'C'
  },
  {
    name: 'Elif Şahin',
    role: 'İçerik Editörü',
    company: 'MediaHub',
    content: 'Müşteri desteği olağanüstü ve ürün sürekli gelişiyor. Kesinlikle tavsiye ediyorum!',
    rating: 5,
    avatar: 'E'
  }
];

export default function LandingTestimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-32 relative overflow-hidden">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.name}-${index}`}
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -2 : 2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                rotate: 0,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="group cursor-pointer"
            >
              <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-bl-3xl opacity-50" />
                
                {/* Quote icon */}
                <div className="absolute top-4 right-4 opacity-20">
                  <MessageSquare className="w-8 h-8 text-purple-600" />
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 leading-relaxed mb-6 text-base md:text-lg font-medium relative z-10">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16 md:mt-20"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span className="text-white/80 text-sm md:text-base ml-2">1000+ Mutlu Kullanıcı</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-white/80 text-sm md:text-base">4.9/5 Ortalama Puan</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
