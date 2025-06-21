
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { LoginFormData } from '@/lib/validations'

interface LoginFormActionsProps {
  form: UseFormReturn<LoginFormData>
}

export default function LoginFormActions({ form }: LoginFormActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
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
            <FormLabel className="text-xs md:text-sm font-normal text-white">
              Beni hatırla
            </FormLabel>
          </FormItem>
        )}
      />

      <Link
        to="/forgot-password"
        className="text-xs md:text-sm text-blue-400 hover:text-blue-300 hover:underline text-center sm:text-right"
      >
        Şifremi unuttum
      </Link>
    </div>
  )
}
