import { useState } from 'react'
import { Button } from '@/shared/components/ui/button/button'
import { Input } from '@/shared/components/ui/input/input'
import { Label } from '@/shared/components/ui/label/label'
import logo from '@/assets/FractalHive_Logo.svg'
import authBg from '@/assets/auth-bg.png'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Replace with your auth logic
    console.log('Login', { email, password })
  }

  return (
    <div className="flex h-screen w-full">
      {/* Left — form */}
      <div className="flex flex-1 flex-col items-center justify-between px-8 py-10">
        {/* Top spacer keeps content vertically centred */}
        <div />

        <div className="w-full max-w-sm">
          {/* Logo + brand */}
          <div className="mb-8 flex flex-col items-center gap-2">
            <img src={logo} alt="FractalHive logo" className="h-12 w-12" />
            <div className="text-center">
              <p className="text-xl font-bold">ElevateRM</p>
              <p className="text-muted-foreground text-sm">By FractalHive Inc.</p>
            </div>
          </div>

          {/* Form header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Login</h1>
            <p className="text-muted-foreground mt-1 text-sm">Enter your details below to login</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="team@myvalue.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <Button type="submit" className="mt-2 w-full">
              Login
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-muted-foreground text-xs">© 2025 FractalHive</p>
      </div>

      {/* Right — background image */}
      <div className="hidden lg:block lg:w-[45%] p-4">
        <img src={authBg} alt="" className="h-full w-full rounded-2xl object-cover" />
      </div>
    </div>
  )
}
