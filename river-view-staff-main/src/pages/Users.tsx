// =====================================================
// Users Page - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import { useState } from 'react';
import { Plus, Download, Filter, Search, Eye, Edit, Trash2, UserCog, Shield } from 'lucide-react';
import { AppLayout } from '@/components/layout';
import { PageHeader, DataTable, StatusBadge, type Column } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { User, UserRole } from '@/types';

// Mock data
const mockUsers: User[] = [
  { id: '1', username: 'admin', email: 'admin@idstech.com', fullName: 'System Administrator', role: 'COMP_ADMIN', companyId: '1', companyName: 'Riverview City Constructions Ltd.', status: 'active', lastLogin: '2026-01-19 09:30:00', createdAt: '2019-01-01', updatedAt: '2023-01-01' },
  { id: '2', username: 'hrmanager', email: 'hr@riverviewcity.com', fullName: 'Priya Sharma', role: 'HR_MANAGER', companyId: '1', companyName: 'Riverview City Constructions Ltd.', status: 'active', lastLogin: '2026-01-18 14:20:00', createdAt: '2020-03-15', updatedAt: '2023-03-15' },
  { id: '3', username: 'supervisor1', email: 'rajesh.s@riverviewcity.com', fullName: 'Rajesh Singh', role: 'SITE_SUPERVISOR', companyId: '1', companyName: 'Riverview City Constructions Ltd.', status: 'active', lastLogin: '2026-01-19 08:00:00', createdAt: '2021-06-20', updatedAt: '2023-06-20' },
  { id: '4', username: 'accountant', email: 'accounts@riverviewcity.com', fullName: 'Amit Kumar', role: 'ACCOUNTANT', companyId: '1', companyName: 'Riverview City Constructions Ltd.', status: 'active', lastLogin: '2026-01-17 16:45:00', createdAt: '2022-01-10', updatedAt: '2023-01-10' },
  { id: '5', username: 'viewer1', email: 'viewer@riverviewcity.com', fullName: 'Suresh Patil', role: 'LABOUR_VIEWER', companyId: '1', companyName: 'Riverview City Constructions Ltd.', status: 'inactive', lastLogin: '2025-12-01 10:00:00', createdAt: '2023-05-05', updatedAt: '2023-05-05' },
];

const roleLabels: Record<UserRole, string> = {
  COMP_ADMIN: 'Company Admin',
  HR_MANAGER: 'HR Manager',
  SITE_SUPERVISOR: 'Site Supervisor',
  ACCOUNTANT: 'Accountant',
  LABOUR_VIEWER: 'Labour Viewer',
};

const roleColors: Record<UserRole, string> = {
  COMP_ADMIN: 'bg-primary/10 text-primary border-primary/20',
  HR_MANAGER: 'bg-info/10 text-info border-info/20',
  SITE_SUPERVISOR: 'bg-warning/10 text-warning border-warning/20',
  ACCOUNTANT: 'bg-success/10 text-success border-success/20',
  LABOUR_VIEWER: 'bg-muted text-muted-foreground border-muted-foreground/20',
};

export default function UsersPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<{
    fullName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    companyId: string;
    role: UserRole | '';
  }>({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyId: '',
    role: '',
  });

  const companyNameMap: Record<string, string> = {
    '1': 'Riverview City Constructions Ltd.',
    '2': 'Nanded City Development',
  };

  const filteredData = users.filter(item => {
    const matchesSearch = !searchQuery || 
      item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || item.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = () => {
    if (
      !formData.fullName ||
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.companyId ||
      !formData.role
    ) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Validation Error',
        description: 'Passwords do not match.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setUsers(prev => [
        ...prev,
        {
          id: String(prev.length + 1),
          username: formData.username,
          email: formData.email,
          fullName: formData.fullName,
          role: formData.role as UserRole,
          companyId: formData.companyId,
          companyName: companyNameMap[formData.companyId],
          status: 'active',
          lastLogin: undefined,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
      setIsLoading(false);
      setIsAddDialogOpen(false);
      setFormData({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        companyId: '',
        role: '',
      });
      toast({
        title: 'User Added',
        description: 'New user has been created (dummy record).',
      });
    }, 600);
  };

  const columns: Column<User>[] = [
    { key: 'username', header: 'Username', sortable: true },
    { key: 'fullName', header: 'Full Name', sortable: true },
    { key: 'email', header: 'Email' },
    { 
      key: 'role', 
      header: 'Role',
      render: (item) => (
        <Badge variant="outline" className={roleColors[item.role]}>
          <Shield className="h-3 w-3 mr-1" />
          {roleLabels[item.role]}
        </Badge>
      )
    },
    { key: 'companyName', header: 'Company' },
    { 
      key: 'lastLogin', 
      header: 'Last Login',
      render: (item) => item.lastLogin ? new Date(item.lastLogin).toLocaleString() : 'Never'
    },
    {
      key: 'status',
      header: 'Status',
      render: (item) => <StatusBadge status={item.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AppLayout title="Users">
      <div className="space-y-6 animate-fade-in">
        <PageHeader
          title="User Management"
          description="Manage system users and their access permissions"
          icon={UserCog}
          primaryAction={{
            label: 'Add User',
            onClick: () => setIsAddDialogOpen(true),
            icon: Plus,
          }}
          actions={
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          }
        />

        {/* Filters */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px] max-w-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, username or email..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-[180px]">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="COMP_ADMIN">Company Admin</SelectItem>
                    <SelectItem value="HR_MANAGER">HR Manager</SelectItem>
                    <SelectItem value="SITE_SUPERVISOR">Site Supervisor</SelectItem>
                    <SelectItem value="ACCOUNTANT">Accountant</SelectItem>
                    <SelectItem value="LABOUR_VIEWER">Labour Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-[150px]">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={filteredData}
          keyExtractor={(item) => item.id}
          emptyMessage="No users found"
        />

        {/* Add User Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new user account
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, fullName: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, username: e.target.value }))
                  }
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, password: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData(prev => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Select
                  value={formData.companyId}
                  onValueChange={(value) =>
                    setFormData(prev => ({ ...prev, companyId: value }))
                  }
                >
                  <SelectTrigger id="company">
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="1">Riverview City Constructions Ltd.</SelectItem>
                    <SelectItem value="2">Nanded City Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value: UserRole) =>
                    setFormData(prev => ({ ...prev, role: value }))
                  }
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="HR_MANAGER">HR Manager</SelectItem>
                    <SelectItem value="SITE_SUPERVISOR">Site Supervisor</SelectItem>
                    <SelectItem value="ACCOUNTANT">Accountant</SelectItem>
                    <SelectItem value="LABOUR_VIEWER">Labour Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser} disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add User'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
