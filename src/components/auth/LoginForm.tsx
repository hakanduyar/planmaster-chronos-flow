
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
    <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto"
      >
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-4 pt-6">
            <div className="mx-auto w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
              <LogIn className="w-7 h-7 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-800">
              Hoş Geldiniz
            </CardTitle>
            <p className="text-slate-600 mt-2 text-sm">Hesabınıza giriş yapın ve planlamaya başlayın</p>
          </CardHeader>
          <CardContent className="space-y-5 px-6 pb-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium text-sm">Email Adresi</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            placeholder="ornek@email.com"
                            className="pl-10 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white text-slate-700"
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
                      <FormLabel className="text-slate-700 font-medium text-sm">Şifre</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Şifrenizi girin"
                            className="pl-10 pr-11 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white text-slate-700"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between pt-2">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-slate-300"
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal text-slate-600">
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
                  className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 mt-6"
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

            <div className="text-center pt-4 border-t border-slate-100">
              <p className="text-sm text-slate-600">
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
