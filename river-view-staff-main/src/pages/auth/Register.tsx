// =====================================================
// Register Page - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, Building2, ArrowLeft } from 'lucide-react';
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

const mockCompanies = [
  { id: '1', name: 'Riverview City Constructions Ltd.' },
  { id: '2', name: 'Nanded City Development and Construction Company' },
  { id: '3', name: 'MAGSA Contractors LLP' },
  { id: '4', name: 'Magarpatta Township Development and Const. Co. Ltd' },
];

const roles = [
  { id: 'HR_MANAGER', name: 'HR Manager' },
  { id: 'SITE_SUPERVISOR', name: 'Site Supervisor' },
  { id: 'ACCOUNTANT', name: 'Accountant' },
  { id: 'LABOUR_VIEWER', name: 'Labour Viewer' },
];

export default function Register() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    companyId: '',
    role: '',
    contactNo: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.username || !formData.password || !formData.companyId) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Validation Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    if (formData.password.length < 8) {
      toast({
        title: 'Validation Error',
        description: 'Password must be at least 8 characters',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Registration Successful',
        description: 'Your account request has been submitted for approval',
      });
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-surface p-4">
      <Card className="w-full max-w-lg shadow-xl border-0">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="IDS SmartTech" className="h-14" />
          </div>
          <CardTitle className="text-2xl font-display">Request Access</CardTitle>
          <CardDescription>
            Fill in your details to request account access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>

              {/* Contact No */}
              <div className="space-y-2">
                <Label htmlFor="contactNo">Contact Number</Label>
                <Input
                  id="contactNo"
                  type="tel"
                  placeholder="Enter contact number"
                  value={formData.contactNo}
                  onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                />
              </div>
            </div>

            {/* Company Selection */}
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Select
                value={formData.companyId}
                onValueChange={(value) => setFormData({ ...formData, companyId: value })}
              >
                <SelectTrigger id="company">
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

            {/* Role Selection */}
            <div className="space-y-2">
              <Label htmlFor="role">Requested Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create password"
                    className="pr-10"
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

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm password"
                    className="pr-10"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters long
            </p>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full h-11 gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  Request Access
                </>
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

          {/* Footer */}
          <div className="mt-6 pt-4 border-t text-center">
            <p className="text-xs text-muted-foreground">
              © IDS ID PVT LTD by Prashant Pawar
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
