// =====================================================
// Forgot Password Page - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import logo from '@/assets/logo.png';

export default function ForgotPassword() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: 'Validation Error',
        description: 'Please enter your email address',
        variant: 'destructive',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-surface p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="IDS SmartTech" className="h-14" />
          </div>
          {isSubmitted ? (
            <>
              <div className="mx-auto w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <CardTitle className="text-2xl font-display">Check Your Email</CardTitle>
              <CardDescription>
                We've sent password reset instructions to <strong>{email}</strong>
              </CardDescription>
            </>
          ) : (
            <>
              <CardTitle className="text-2xl font-display">Forgot Password?</CardTitle>
              <CardDescription>
                Enter your email address and we'll send you instructions to reset your password
              </CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Didn't receive the email? Check your spam folder or try again with a different email address.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail('');
                }}
              >
                Try another email
              </Button>
              <div className="text-center">
                <Link 
                  to="/login" 
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Login
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your registered email"
                    className="h-11 pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full h-11"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  'Send Reset Instructions'
                )}
              </Button>

              {/* Back to Login */}
              <div className="text-center">
                <Link 
                  to="/login" 
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Login
                </Link>
              </div>
            </form>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-xs text-muted-foreground">
              © IDS ID PVT LTD by Prashant Pawar
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
