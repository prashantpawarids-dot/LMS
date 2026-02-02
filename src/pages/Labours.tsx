// =====================================================
// Labours Page - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import { useState } from 'react';
import { Plus, Download, Filter, Search, Eye, Edit, Trash2, Users } from 'lucide-react';
import { AppLayout } from '@/components/layout';
import { PageHeader, DataTable, StatusBadge, type Column } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Labour, LabourCategory, LabourType } from '@/types';

// Mock data
const mockLabours: Labour[] = [
  { id: '1', passNo: '72896', name: 'Tushar Chauhan', fatherName: 'Ramesh Chauhan', gender: 'male', category: 'Labour', type: 'Resident', skillType: 'Mason', dailyWage: 650, contractorId: 'C1', contractorName: 'CACHE TECHNOLOGIES', siteId: 'S1', siteName: 'MELODY I', companyId: '1', issueDate: '2025-12-15', expiryDate: '2026-03-31', status: 'active', fingerEnrolled: true, createdAt: '2025-12-15', updatedAt: '2025-12-15' },
  { id: '2', passNo: '72897', name: 'Rajesh Kumar', fatherName: 'Mohan Kumar', gender: 'male', category: 'Labour', type: 'Construction', skillType: 'Carpenter', dailyWage: 700, contractorId: 'C2', contractorName: 'S.S. KORDE ENTERPRISES', siteId: 'S2', siteName: 'HARMONY', companyId: '1', issueDate: '2025-11-01', expiryDate: '2026-03-31', status: 'active', fingerEnrolled: true, createdAt: '2025-11-01', updatedAt: '2025-11-01' },
  { id: '3', passNo: '72898', name: 'Amit Singh', fatherName: 'Ravi Singh', gender: 'male', category: 'Technician', type: 'FT_Employee', skillType: 'Electrician', dailyWage: 800, contractorId: 'C1', contractorName: 'CACHE TECHNOLOGIES', siteId: 'S1', siteName: 'MELODY I', companyId: '1', issueDate: '2025-10-15', expiryDate: '2026-03-31', status: 'active', fingerEnrolled: false, createdAt: '2025-10-15', updatedAt: '2025-10-15' },
  { id: '4', passNo: '72899', name: 'Priya Sharma', fatherName: 'Anil Sharma', gender: 'female', category: 'Staff', type: 'Resident', skillType: 'Helper', dailyWage: 450, contractorId: 'C3', contractorName: 'BARAMAVAL ENTERPRISES', siteId: 'S3', siteName: 'RHYTHM', companyId: '1', issueDate: '2025-12-01', expiryDate: '2026-03-31', status: 'active', fingerEnrolled: true, createdAt: '2025-12-01', updatedAt: '2025-12-01' },
  { id: '5', passNo: '72900', name: 'Vikram Yadav', fatherName: 'Suresh Yadav', gender: 'male', category: 'Security', type: 'Construction', skillType: 'Guard', dailyWage: 550, contractorId: 'C2', contractorName: 'S.S. KORDE ENTERPRISES', siteId: 'S2', siteName: 'HARMONY', companyId: '1', issueDate: '2025-09-01', expiryDate: '2026-02-28', status: 'inactive', fingerEnrolled: true, createdAt: '2025-09-01', updatedAt: '2025-09-01' },
  { id: '6', passNo: '72901', name: 'Suresh Patel', fatherName: 'Dinesh Patel', gender: 'male', category: 'Supervisor', type: 'FT_Employee', skillType: 'Foreman', dailyWage: 1000, contractorId: 'C1', contractorName: 'CACHE TECHNOLOGIES', siteId: 'S1', siteName: 'MELODY I', companyId: '1', issueDate: '2025-08-01', expiryDate: '2026-03-31', status: 'active', fingerEnrolled: true, createdAt: '2025-08-01', updatedAt: '2025-08-01' },
];

const categories: LabourCategory[] = ['Labour', 'Staff', 'Security', 'Technician', 'Supervisor', 'Engineer', 'Driver', 'Other'];
const types: LabourType[] = ['Resident', 'Construction', 'Contractor', 'FT_Employee'];

export default function LaboursPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const filteredData = mockLabours.filter(item => {
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.passNo.includes(searchQuery);
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddLabour = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsAddDialogOpen(false);
      toast({
        title: 'Labour Added',
        description: 'New labour has been registered successfully',
      });
    }, 1000);
  };

  const columns: Column<Labour>[] = [
    { key: 'passNo', header: 'Pass No', sortable: true },
    { key: 'name', header: 'Name', sortable: true },
    { key: 'category', header: 'Category' },
    { key: 'type', header: 'Type' },
    { key: 'contractorName', header: 'Contractor' },
    { key: 'siteName', header: 'Site' },
    { 
      key: 'dailyWage', 
      header: 'Daily Wage',
      render: (item) => `₹${item.dailyWage}`
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
    <AppLayout title="Labours">
      <div className="space-y-6 animate-fade-in">
        <PageHeader
          title="Labours"
          description="Manage all registered labours"
          icon={Users}
          primaryAction={{
            label: 'Add Labour',
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
                    placeholder="Search by name or pass no..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-[180px]">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
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
                    <SelectItem value="blocked">Blocked</SelectItem>
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
          emptyMessage="No labours found"
        />

        {/* Add Labour Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Labour</DialogTitle>
              <DialogDescription>
                Fill in the details to register a new labour
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherName">Father's Name</Label>
                <Input id="fatherName" placeholder="Enter father's name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactNo">Contact No</Label>
                <Input id="contactNo" placeholder="Enter contact number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type *</Label>
                <Select>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {types.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contractor">Contractor *</Label>
                <Select>
                  <SelectTrigger id="contractor">
                    <SelectValue placeholder="Select contractor" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="C1">CACHE TECHNOLOGIES</SelectItem>
                    <SelectItem value="C2">S.S. KORDE ENTERPRISES</SelectItem>
                    <SelectItem value="C3">BARAMAVAL ENTERPRISES</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="site">Site *</Label>
                <Select>
                  <SelectTrigger id="site">
                    <SelectValue placeholder="Select site" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="S1">MELODY I</SelectItem>
                    <SelectItem value="S2">HARMONY</SelectItem>
                    <SelectItem value="S3">RHYTHM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dailyWage">Daily Wage (₹) *</Label>
                <Input id="dailyWage" type="number" placeholder="Enter daily wage" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skillType">Skill Type</Label>
                <Input id="skillType" placeholder="e.g., Mason, Carpenter" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Enter full address" rows={2} />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddLabour} disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add Labour'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
