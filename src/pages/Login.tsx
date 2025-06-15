
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/AuthContext'
import { loginSchema, LoginFormData } from '@/lib/validations'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      const { error } = await signIn(data.email, data.password, data.rememberMe)
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: 'Giriş Başarısız',
            description: 'Email veya şifre hatalı',
            variant: 'destructive'
          })
        } else if (error.message.includes('Email not confirmed')) {
          toast({
            title: 'Email Doğrulanmamış',
            description: 'Email adresinizi doğrulayın',
            variant: 'destructive'
          })
        } else {
          toast({
            title: 'Hata',
            description: 'Bağlantı hatası, tekrar deneyin',
            variant: 'destructive'
          })
        }
      } else {
        toast({
          title: 'Başarılı',
          description: 'Giriş yapıldı'
        })
        navigate('/dashboard')
      }
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Beklenmedik bir hata oluştu',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 p-12 items-center justify-center"
      >
        <div className="text-white text-center space-y-6">
          <h1 className="text-5xl font-bold mb-4">PlanMaster Pro</h1>
          <p className="text-xl text-blue-100 max-w-md">
            Günlük planlarınızı takip edin, hedeflerinize ulaşın ve verimliliğinizi artırın.
          </p>
          <div className="grid grid-cols-1 gap-4 mt-8">
            <div className="glass-card p-4">
              <h3 className="font-semibold">📋 Akıllı Görev Yönetimi</h3>
              <p className="text-sm text-blue-100">Görevlerinizi kategorilere ayırın ve öncelik verin</p>
            </div>
            <div className="glass-card p-4">
              <h3 className="font-semibold">📊 İlerme Takibi</h3>
              <p className="text-sm text-blue-100">Detaylı istatistikler ve grafiklerle ilerlemenizi izleyin</p>
            </div>
            <div className="glass-card p-4">
              <h3 className="font-semibold">🗓️ Takvim Entegrasyonu</h3>
              <p className="text-sm text-blue-100">Tüm planlarınızı tek bir yerden yönetin</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-2xl border-0">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold text-gray-800">
                Giriş Yap
              </CardTitle>
              <p className="text-gray-600">Hesabınıza giriş yapın</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="email@example.com"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Şifre</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Şifrenizi girin"
                              className="pl-10 pr-10"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-between">
                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Beni hatırla
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    <Link
                      to="/forgot-password"
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Şifremi unuttum
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full planmaster-button"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    ) : (
                      <LogIn className="w-4 h-4 mr-2" />
                    )}
                    Giriş Yap
                  </Button>
                </form>
              </Form>

              <div className="text-center pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Hesabınız yok mu?{' '}
                  <Link
                    to="/register"
                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                  >
                    Kayıt olun
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
