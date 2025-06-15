
export interface PasswordStrength {
  score: number
  feedback: string
  color: string
}

export function validatePassword(password: string): PasswordStrength {
  let score = 0
  
  if (password.length >= 8) score++
  if (/[a-z]/.test(password)) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 2) {
    return { score, feedback: 'Zayıf', color: 'text-red-500' }
  } else if (score <= 3) {
    return { score, feedback: 'Orta', color: 'text-yellow-500' }
  } else {
    return { score, feedback: 'Güçlü', color: 'text-green-500' }
  }
}

export function getPasswordRequirements(password: string) {
  return {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  }
}
