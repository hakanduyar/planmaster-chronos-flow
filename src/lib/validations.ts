
import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email adresi gerekli')
    .email('Geçerli bir email adresi girin')
    .max(254, 'Email adresi çok uzun'),
  password: z
    .string()
    .min(1, 'Şifre gerekli')
    .min(6, 'Şifre en az 6 karakter olmalı')
    .max(128, 'Şifre çok uzun'),
  rememberMe: z.boolean().default(false)
})

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Ad soyad en az 2 karakter olmalı')
    .max(100, 'Ad soyad çok uzun')
    .regex(/^[a-zA-ZçğıöşüÇĞIİÖŞÜ\s]+$/, 'Sadece harf ve boşluk kullanın'),
  email: z
    .string()
    .min(1, 'Email adresi gerekli')
    .email('Geçerli bir email adresi girin')
    .max(254, 'Email adresi çok uzun'),
  password: z
    .string()
    .min(8, 'Şifre en az 8 karakter olmalı')
    .max(128, 'Şifre çok uzun')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Şifre en az 1 büyük harf, 1 küçük harf ve 1 rakam içermeli'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, 'Kullanım koşullarını kabul etmelisiniz')
}).refine(data => data.password === data.confirmPassword, {
  message: 'Şifreler eşleşmiyor',
  path: ['confirmPassword']
})

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email adresi gerekli')
    .email('Geçerli bir email adresi girin')
    .max(254, 'Email adresi çok uzun')
})

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'Şifre en az 8 karakter olmalı')
    .max(128, 'Şifre çok uzun')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Şifre en az 1 büyük harf, 1 küçük harf ve 1 rakam içermeli'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Şifreler eşleşmiyor',
  path: ['confirmPassword']
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
