// =====================================================
// Settings Page - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Database, Palette, Save } from 'lucide-react';
import { AppLayout } from '@/components/layout';
import { PageHeader } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Settings Saved',
        description: 'Your settings have been updated successfully',
      });
    }, 1000);
  };

  return (
    <AppLayout title="Settings">
      <div className="space-y-6 animate-fade-in">
        <PageHeader
          title="Settings"
          description="Manage your account and application preferences"
          icon={SettingsIcon}
        />

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Preferences</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="gap-2">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">System</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue="Admin User" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="admin" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="admin@idstech.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+91 9876543210" />
                  </div>
                </div>
                <Separator />
                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isLoading} className="gap-2">
                    <Save className="h-4 w-4" />
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive email alerts for important updates</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Attendance Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get notified about attendance anomalies</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Pass Expiry Reminders</Label>
                      <p className="text-sm text-muted-foreground">Receive reminders before passes expire</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Daily Summary</Label>
                      <p className="text-sm text-muted-foreground">Receive daily attendance summary emails</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isLoading} className="gap-2">
                    <Save className="h-4 w-4" />
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your password and security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Change Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div></div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                      <Input id="confirmNewPassword" type="password" />
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable 2FA</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isLoading} className="gap-2">
                    <Save className="h-4 w-4" />
                    {isLoading ? 'Saving...' : 'Update Security'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Display Preferences</CardTitle>
                <CardDescription>
                  Customize how the application looks and behaves
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                        <SelectItem value="mr">Marathi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select defaultValue="dd-mm-yyyy">
                      <SelectTrigger id="dateFormat">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                        <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="ist">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="ist">IST (India Standard Time)</SelectItem>
                        <SelectItem value="utc">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pageSize">Default Page Size</Label>
                    <Select defaultValue="10">
                      <SelectTrigger id="pageSize">
                        <SelectValue placeholder="Select page size" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="10">10 rows</SelectItem>
                        <SelectItem value="25">25 rows</SelectItem>
                        <SelectItem value="50">50 rows</SelectItem>
                        <SelectItem value="100">100 rows</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isLoading} className="gap-2">
                    <Save className="h-4 w-4" />
                    {isLoading ? 'Saving...' : 'Save Preferences'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
                <CardDescription>
                  View system details and perform maintenance operations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <Label className="text-muted-foreground">Application Version</Label>
                    <p className="font-medium mt-1">v1.0.0</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <Label className="text-muted-foreground">Last Sync</Label>
                    <p className="font-medium mt-1">19 Jan 2026, 10:30 AM</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <Label className="text-muted-foreground">Database Status</Label>
                    <p className="font-medium mt-1 text-success">Connected</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <Label className="text-muted-foreground">API Status</Label>
                    <p className="font-medium mt-1 text-success">Operational</p>
                  </div>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <Button variant="outline">Clear Cache</Button>
                  <Button variant="outline">Sync Data</Button>
                  <Button variant="outline">Export Logs</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
