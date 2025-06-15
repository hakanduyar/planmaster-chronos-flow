
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, UserPlus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/AuthContext'
import { registerSchema, RegisterFormData } from '@/lib/validations'
import { validatePassword } from '@/utils/passwordUtils'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { signUp } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false
    }
  })

  const watchedPassword = form.watch('password')
  const passwordStrength = validatePassword(watchedPassword || '')

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    try {
      const { error } = await signUp(data.email, data.password, data.fullName)
      
      if (error) {
        if (error.message.includes('already registered')) {
          toast({
            title: 'Kayıt Başarısız',
            description: 'Bu email adresi zaten kullanımda',
            variant: 'destructive'
          })
        } else {
          toast({
            title: 'Hata',
            description: 'Kayıt sırasında bir hata oluştu',
            variant: 'destructive'
          })
        }
      } else {
        toast({
          title: 'Kayıt Başarılı',
          description: 'Email adresinize doğrulama linki gönderildi'
        })
        navigate('/login')
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
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 p-12 items-center justify-center"
      >
        <div className="text-white text-center space-y-6">
          <h1 className="text-5xl font-bold mb-4">Hoş Geldiniz!</h1>
          <p className="text-xl text-purple-100 max-w-md">
            PlanMaster Pro'ya katılın ve verimli bir yaşam için ilk adımı atın.
          </p>
          <div className="grid grid-cols-1 gap-4 mt-8">
            <div className="glass-card p-4">
              <h3 className="font-semibold">🚀 Hızlı Başlangıç</h3>
              <p className="text-sm text-purple-100">Sadece birkaç dakikada hesabınızı oluşturun</p>
            </div>
            <div className="glass-card p-4">
              <h3 className="font-semibold">🔒 Güvenli Platform</h3>
              <p className="text-sm text-purple-100">Verileriniz güvenli şifreleme ile korunur</p>
            </div>
            <div className="glass-card p-4">
              <h3 className="font-semibold">📱 Her Cihazda</h3>
              <p className="text-sm text-purple-100">Telefon, tablet ve bilgisayardan erişim</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-2xl border-0">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold text-gray-800">
                Kayıt Ol
              </CardTitle>
              <p className="text-gray-600">Yeni hesap oluşturun</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ad Soyad</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Ad Soyadınız"
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
                              placeholder="Şifrenizi oluşturun"
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
                        {watchedPassword && (
                          <div className="flex items-center justify-between text-xs">
                            <span className={passwordStrength.color}>
                              Şifre Gücü: {passwordStrength.feedback}
                            </span>
                            <div className="flex space-x-1">
                              {[1, 2, 3, 4, 5].map((level) => (
                                <div
                                  key={level}
                                  className={`w-4 h-1 rounded ${
                                    level <= passwordStrength.score
                                      ? passwordStrength.score <= 2
                                        ? 'bg-red-500'
                                        : passwordStrength.score <= 3
                                        ? 'bg-yellow-500'
                                        : 'bg-green-500'
                                      : 'bg-gray-200'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Şifre Tekrar</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              type={showConfirmPassword ? 'text' : 'password'}
                              placeholder="Şifrenizi tekrar girin"
                              className="pl-10 pr-10"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          <Link to="/terms" className="text-blue-600 hover:underline">
                            Kullanım koşullarını
                          </Link>{' '}
                          kabul ediyorum
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full planmaster-button"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    ) : (
                      <UserPlus className="w-4 h-4 mr-2" />
                    )}
                    Kayıt Ol
                  </Button>
                </form>
              </Form>

              <div className="text-center pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Zaten hesabınız var mı?{' '}
                  <Link
                    to="/login"
                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                  >
                    Giriş yapın
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
