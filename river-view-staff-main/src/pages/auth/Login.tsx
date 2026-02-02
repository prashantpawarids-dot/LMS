// =====================================================
// Login Page - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import logo from '@/assets/logo.png';

// Mock companies - will be fetched from API
const mockCompanies = [
  { id: '1', name: 'Riverview City Constructions Ltd.' },
  { id: '2', name: 'Nanded City Development and Construction Company' },
  { id: '3', name: 'MAGSA Contractors LLP' },
  { id: '4', name: 'Magarpatta Township Development and Const. Co. Ltd' },
];

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyId: '',
    username: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.companyId || !formData.username || !formData.password) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Login Successful',
        description: 'Welcome to Labour Management System',
      });
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-gradient-surface">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-dark items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="relative z-10 text-center">
          <img src={logo} alt="IDS SmartTech" className="h-24 mx-auto mb-8" />
          <h1 className="text-4xl font-display font-bold text-white mb-4">
            Labour Management System
          </h1>
          <p className="text-lg text-white/70 max-w-md mx-auto">
            Comprehensive workforce management solution for construction projects
          </p>
          <div className="mt-12 grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-white">1,200+</div>
              <div className="text-sm text-white/60">Active Labours</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">24</div>
              <div className="text-sm text-white/60">Sites</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">98%</div>
              <div className="text-sm text-white/60">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="text-center pb-2">
            <div className="lg:hidden flex justify-center mb-4">
              <img src={logo} alt="IDS SmartTech" className="h-16" />
            </div>
            <CardTitle className="text-2xl font-display">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Company Selection */}
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Select
                  value={formData.companyId}
                  onValueChange={(value) => setFormData({ ...formData, companyId: value })}
                >
                  <SelectTrigger id="company" className="h-11">
                    <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Select your company" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {mockCompanies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  className="h-11"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="h-11 pr-10"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full h-11 gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </>
                )}
              </Button>

              {/* Sign Up Link */}
              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary font-medium hover:underline">
                  Request Access
                </Link>
              </div>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t text-center">
              <p className="text-xs text-muted-foreground">
                © IDS ID PVT LTD by Prashant Pawar
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
