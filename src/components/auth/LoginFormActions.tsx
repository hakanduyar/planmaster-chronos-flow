
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
            <FormLabel className="text-sm font-normal text-white">
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
  )
}
