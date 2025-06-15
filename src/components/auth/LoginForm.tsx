
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const { toast } = useToast()

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
        // Navigation will be handled automatically by AuthProvider
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
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2 pt-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Hoş Geldiniz
            </CardTitle>
            <p className="text-gray-600 mt-2">Hesabınıza giriş yapın ve planlamaya başlayın</p>
          </CardHeader>
          <CardContent className="space-y-6 px-8 pb-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Email Adresi</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            placeholder="ornek@email.com"
                            className="pl-11 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
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
                      <FormLabel className="text-gray-700 font-medium">Şifre</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Şifrenizi girin"
                            className="pl-11 pr-12 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
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
                            className="border-gray-300"
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal text-gray-600">
                          Beni hatırla
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
                  >
                    Şifremi unuttum
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  ) : (
                    <LogIn className="w-5 h-5 mr-2" />
                  )}
                  Giriş Yap
                </Button>
              </form>
            </Form>

            <div className="text-center pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Hesabınız yok mu?{' '}
                <Link
                  to="/register"
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                  Ücretsiz kayıt olun
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
