'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function RegisterPage() {

    //state management
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)


    //form submission handler
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        //check i fpassword matchess
        if(password !== confirmPassword) {
            setError('Passwords do not match')
            setLoading(false)
            return
        }

            //check password length
             // Check password length
    if (password.length < 6) {
        setError('Password must be at least 6 characters')
        setLoading(false)
        return
      }
  
      // Check email format (basic validation)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address')
        setLoading(false)
        return
      }

      //mock registration for now
      setTimeout(()=> {
        console.log('Registration successful:', { name, email, password })
        alert('Registration successful!')
        setLoading(false)
      }, 1000)
    }

    //render - what user sees

    return(
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-white">
            {/**form container */}
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Create an Account</CardTitle>
                    <CardDescription>Sign up to get started</CardDescription>
                </CardHeader>\

            <CardContent>
                {/**card content with form */}
                
            <form onSubmit={handleSubmit} className='space-y-4'>
                {/**name input field */}
                <div className="space-y-2">
                    <Label htmlFor='name'>Name</Label>
                    <Input
                        id='name'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>

                {/**email input field */}
                <div className="space-y-2">
                    <Label htmlFor='email'>Email</Label>
                    <Input
                        id='email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>

                {/**password input field */}
                <div className="space-y-2">
                    <Label htmlFor='password'>Password</Label>
                    <Input
                        id='password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>

                {/**confirm password input field */}
                <div className="space-y-2">
                    <Label htmlFor='confirmPassword'>Confirm Password</Label>
                    <Input
                        id='confirmPassword'
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>

                {/**error message */}
                {error && <p className='text-sm text-red-500'>{error}</p>}

                {/**submit button */}
                <Button type='submit' className='w-full' disabled={loading}>
                    {loading ? 'Registering...' : 'Create Account'}
                </Button>

                {/**test credentials */}
                <div className="text-xs text-center text-slate-500">
                    Test: test@example.com / password
                </div>
            </form>

            {/**card footer: footer content */}
            <CardFooter>
                <p className='text-xs text-center text-slate-500'>
                    Already have an account? <Link href='/login'>Login</Link>
                </p>
            </CardFooter>

            </CardContent>

            </Card>
        </div>
    )
  }
