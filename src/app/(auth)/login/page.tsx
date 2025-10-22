'use client'

//for managing the state of the componnet. here fform
import { useState } from 'react'
//shadcn component for ui
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

//component definition
export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    //form submission handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            // ============================================
            // NEXT AUTH SIGN IN
            // ============================================
            // What: Use NextAuth to authenticate user
            // Why: Secure authentication with session management
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                setError('Invalid email or password')
            } else {
                // Success! Redirect to dashboard
                router.push('/dashboard')
            }
        } catch (err) {
            setError('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    //outer container
    //jsx return statement
    return(
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-white">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Welcome to Reveel</CardTitle>
                    <CardDescription>Sign in to your account to continue</CardDescription>
                </CardHeader>

            {/* //Card content: form fields and submit button */}
            
            <CardContent>
            <form onSubmit={handleSubmit} className='space-y-4'>
                {/**email field */}
                <div className='space-y-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                        id='email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
            
            <div className="space-y-2">
                <Label htmlFor='password'>Password</Label>
                <Input 
                id='password'
                type='password'
                placeholder='********'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading} />
            </div>

            {/**error mesaage */}
            {error && <p className='text-sm text-red-500'>{error}</p>}

            {/**submit button */}
            <Button 
            type="submit"
            className='w-full'
            disabled={loading}>

            {loading ? 'Logging in...' : 'Sign In'}
            </Button>
            
            </form>
            </CardContent>

            {/**card footer: footer content */}
            <CardFooter>
                <p className='text-xs text-center text-slate-500'>
                    Don't have an account? <Link href='/register'>Register</Link>
                </p>
            </CardFooter>
            </Card>
        </div>
    )
}