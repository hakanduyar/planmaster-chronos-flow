
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft, Send } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/AuthContext'
import { forgotPasswordSchema, ForgotPasswordFormData } from '@/lib/validations'

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const { resetPassword } = useAuth()
  const { toast } = useToast()

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true)
    try {
      const { error } = await resetPassword(data.email)
      
      if (error) {
        toast({
          title: 'Hata',
          description: 'Email gönderilirken bir hata oluştu',
          variant: 'destructive'
        })
      } else {
        setEmailSent(true)
        toast({
          title: 'Email Gönderildi',
          description: 'Şifre sıfırlama linki email adresinize gönderildi'
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
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Şifre Sıfırlama
            </CardTitle>
            <p className="text-gray-600">
              {emailSent 
                ? 'Email adresinizi kontrol edin'
                : 'Email adresinizi girin'
              }
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {emailSent ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Email Gönderildi!</h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Şifre sıfırlama linki <strong>{form.getValues('email')}</strong> adresine gönderildi.
                    <br />Gelen kutunuzu kontrol edin.
                  </p>
                </div>
                <div className="space-y-2">
                  <Button
                    onClick={() => setEmailSent(false)}
                    variant="outline"
                    className="w-full"
                  >
                    Tekrar Gönder
                  </Button>
                  <Link to="/login">
                    <Button variant="ghost" className="w-full">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Giriş sayfasına dön
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Adresi</FormLabel>
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

                    <Button
                      type="submit"
                      className="w-full planmaster-button"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      ) : (
                        <Send className="w-4 h-4 mr-2" />
                      )}
                      Sıfırlama Linki Gönder
                    </Button>
                  </form>
                </Form>

                <div className="text-center pt-4 border-t">
                  <Link
                    to="/login"
                    className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center text-sm"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Giriş sayfasına dön
                  </Link>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
