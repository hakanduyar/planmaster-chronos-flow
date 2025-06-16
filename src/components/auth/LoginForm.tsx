
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { LogIn } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/AuthContext'
import { loginSchema, LoginFormData } from '@/lib/validations'
import LoginFormHeader from './LoginFormHeader'
import LoginFormFields from './LoginFormFields'
import LoginFormActions from './LoginFormActions'
import LoginFormFooter from './LoginFormFooter'

export default function LoginForm() {
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
    <div className="w-full md:w-1/2 lg:w-1/2 flex items-center justify-center p-0 bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full h-full flex items-center justify-center p-8"
      >
        <Card className="shadow-2xl border-0 w-full max-w-md">
          <LoginFormHeader />
          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <LoginFormFields form={form} />
                <LoginFormActions form={form} />

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

            <LoginFormFooter />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
