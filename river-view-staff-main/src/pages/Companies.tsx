// =====================================================
// Companies Page - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import { useState } from 'react';
import { Plus, Download, Filter, Search, Eye, Edit, Trash2, Building2 } from 'lucide-react';
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
import type { Company } from '@/types';

// Mock data
const mockCompanies: Company[] = [
  { id: '1', companyCode: 'NCDC', companyName: 'Nanded City Development and Construction Company', contactPerson: 'Admin', contactNo: '020-12345678', email: 'admin@nandedcity.com', address: 'Nanded City, Sinhagad Road, Pune - 411041', status: 'active', createdAt: '2019-01-01', updatedAt: '2023-01-01' },
  { id: '2', companyCode: 'RVC', companyName: 'Riverview City Constructions Ltd.', contactPerson: 'Manager', contactNo: '020-87654321', email: 'info@riverviewcity.com', address: 'Riverview City, Kadamwak Haveli, Pune', status: 'active', createdAt: '2020-06-15', updatedAt: '2023-06-15' },
  { id: '3', companyCode: 'MAGSA', companyName: 'MAGSA Contractors LLP', contactPerson: 'Partner', contactNo: '020-11223344', email: 'contact@magsa.com', address: 'Pune, Maharashtra', status: 'active', createdAt: '2021-03-10', updatedAt: '2023-03-10' },
  { id: '4', companyCode: 'MTD', companyName: 'Magarpatta Township Development and Const. Co. Ltd', contactPerson: 'Director', contactNo: '020-99887766', email: 'info@magarpatta.com', address: 'Magarpatta City, Hadapsar, Pune - 411028', status: 'active', createdAt: '2015-08-20', updatedAt: '2023-08-20' },
];

export default function CompaniesPage() {
  const { toast } = useToast();
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyCode: '',
    companyName: '',
    contactPerson: '',
    contactNo: '',
    email: '',
    address: '',
  });

  const filteredData = companies.filter(item => {
    const matchesSearch = !searchQuery || 
      item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.companyCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddCompany = () => {
    if (!formData.companyCode || !formData.companyName) {
      toast({
        title: 'Validation Error',
        description: 'Company code and name are required',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setCompanies(prev => [
        ...prev,
        {
          id: String(prev.length + 1),
          companyCode: formData.companyCode,
          companyName: formData.companyName,
          contactPerson: formData.contactPerson || undefined,
          contactNo: formData.contactNo || undefined,
          email: formData.email || undefined,
          address: formData.address || undefined,
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
      setIsLoading(false);
      setIsAddDialogOpen(false);
      setFormData({
        companyCode: '',
        companyName: '',
        contactPerson: '',
        contactNo: '',
        email: '',
        address: '',
      });
      toast({
        title: 'Company Added',
        description: 'New company has been created (dummy record).',
      });
    }, 600);
  };

  const columns: Column<Company>[] = [
    { key: 'companyCode', header: 'Code', sortable: true },
    { key: 'companyName', header: 'Company Name', sortable: true },
    { key: 'contactPerson', header: 'Contact Person', render: (item) => item.contactPerson || '-' },
    { key: 'contactNo', header: 'Contact No', render: (item) => item.contactNo || '-' },
    { key: 'email', header: 'Email', render: (item) => item.email || '-' },
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
    <AppLayout title="Companies">
      <div className="space-y-6 animate-fade-in">
        <PageHeader
          title="Companies"
          description="Manage all registered companies"
          icon={Building2}
          primaryAction={{
            label: 'Add Company',
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
                    placeholder="Search by name or code..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
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
          emptyMessage="No companies found"
        />

        {/* Add Company Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Company</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new company
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="companyCode">Company Code *</Label>
                <Input
                  id="companyCode"
                  placeholder="Enter company code"
                  value={formData.companyCode}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, companyCode: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  placeholder="Enter company name"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, companyName: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input
                  id="contactPerson"
                  placeholder="Enter contact person"
                  value={formData.contactPerson}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, contactPerson: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactNo">Contact No</Label>
                <Input
                  id="contactNo"
                  placeholder="Enter contact number"
                  value={formData.contactNo}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, contactNo: e.target.value }))
                  }
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="email">Email</Label>
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
              <div className="col-span-2 space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  placeholder="Enter company address"
                  rows={2}
                  value={formData.address}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, address: e.target.value }))
                  }
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCompany} disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add Company'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
