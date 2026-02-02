// =====================================================
// Contractors Page - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import { useState } from 'react';
import { Plus, Download, Filter, Search, Eye, Edit, Trash2, HardHat } from 'lucide-react';
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
import type { Contractor } from '@/types';

// Mock data
const mockContractors: Contractor[] = [
  { id: '1', contractorCode: 'CTR001', name: 'CACHE TECHNOLOGIES (KOLHAPUR)', contactPerson: 'Saidas', contactNo: '9822433952', email: 'saidas@cachetech.co.in', address: 'G-102, AYODHYA PARK, NEAR TARARANI CHOWK, OLD PB ROAD, KOLHAPUR', workOrderNo: 'WO/RVR-3/485/204/23-24', companyId: '1', status: 'active', createdAt: '2023-06-26', updatedAt: '2023-06-26' },
  { id: '2', contractorCode: 'CTR002', name: 'S.S. KORDE ENTERPRISES', contactPerson: '', contactNo: '', email: '', address: 'AT & POST - NANDED, TAL-HAVELI, DIST- PUNE 411 041, MAHARASHTRA', workOrderNo: 'WO/RVR-3/486/205/23-24', companyId: '1', status: 'blocked', createdAt: '2023-04-15', updatedAt: '2023-04-15' },
  { id: '3', contractorCode: 'CTR003', name: 'BARAMAVAL ENTERPRISES', contactPerson: 'Nitish Lagad', contactNo: '9922940086', email: 'nitishlagad7875@gmail.com', address: 'S.NO.12/9, NEAR LAGAD TRANSPORT, SHAHU COLONY, AT & POST-NANDED', workOrderNo: 'WO/RVR-3/487/206/23-24', companyId: '1', status: 'active', createdAt: '2023-05-20', updatedAt: '2023-05-20' },
  { id: '4', contractorCode: 'CTR004', name: 'MONIKA TRANSPORT', contactPerson: '', contactNo: '9673050101', email: '', address: 'AT & POST - NANDED, TAL-HAVELI, DIST-PUNE 411 041 MAHARASHTRA', workOrderNo: '', companyId: '1', status: 'active', createdAt: '2023-07-10', updatedAt: '2023-07-10' },
  { id: '5', contractorCode: 'CTR005', name: 'AJAY HYGIENES', contactPerson: 'Ajay Gandham', contactNo: '9823116019', email: 'watersolutions@ajayhygienes.com', address: 'G-8, 1547, RAMASHRAM HSG. SOC., OPP. VITTHAL MANDIR, SADASHIV PETH', workOrderNo: 'WO/RVR-3/488/207/23-24', companyId: '1', status: 'active', createdAt: '2023-08-05', updatedAt: '2023-08-05' },
  { id: '6', contractorCode: 'CTR006', name: 'DURVANKUR ENTERPRISES', contactPerson: '', contactNo: '9763285921', email: 'durvankurenter@gmail.com', address: 'SR. NO. 11/10/4, NANDED GAON ROAD, LAGAD VASTI, TAL-HAVELI, DIST-PUNE', workOrderNo: '', companyId: '1', status: 'active', createdAt: '2023-09-01', updatedAt: '2023-09-01' },
];

export default function ContractorsPage() {
  const { toast } = useToast();
  const [contractors, setContractors] = useState<Contractor[]>(mockContractors);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    contactNo: '',
    email: '',
    address: '',
    workOrderNo: '',
  });

  const filteredData = contractors.filter(item => {
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.contractorCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddContractor = () => {
    if (!formData.name) {
      toast({
        title: 'Validation Error',
        description: 'Contractor name is required',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setContractors(prev => [
        ...prev,
        {
          id: String(prev.length + 1),
          contractorCode: `CTR${(prev.length + 1).toString().padStart(3, '0')}`,
          name: formData.name,
          contactPerson: formData.contactPerson || undefined,
          contactNo: formData.contactNo || undefined,
          email: formData.email || undefined,
          address: formData.address || undefined,
          workOrderNo: formData.workOrderNo || undefined,
          companyId: '1',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
      setIsLoading(false);
      setIsAddDialogOpen(false);
      setFormData({
        name: '',
        contactPerson: '',
        contactNo: '',
        email: '',
        address: '',
        workOrderNo: '',
      });
      toast({
        title: 'Contractor Added',
        description: 'New contractor has been registered (dummy record).',
      });
    }, 600);
  };

  const columns: Column<Contractor>[] = [
    { key: 'contractorCode', header: 'Code', sortable: true },
    { key: 'name', header: 'Contractor Name', sortable: true },
    { key: 'contactPerson', header: 'Contact Person', render: (item) => item.contactPerson || '-' },
    { key: 'contactNo', header: 'Contact No', render: (item) => item.contactNo || '-' },
    { key: 'email', header: 'Email', render: (item) => item.email || '-' },
    { key: 'workOrderNo', header: 'Work Order', render: (item) => item.workOrderNo || '-' },
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
    <AppLayout title="Contractors">
      <div className="space-y-6 animate-fade-in">
        <PageHeader
          title="Contractors"
          description="Manage all registered contractors/vendors"
          icon={HardHat}
          primaryAction={{
            label: 'Add Contractor',
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
          emptyMessage="No contractors found"
        />

        {/* Add Contractor Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Add New Contractor</DialogTitle>
              <DialogDescription>
                Fill in the details to register a new contractor
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="name">Company Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter company name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, name: e.target.value }))
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
                  placeholder="Enter full address"
                  rows={2}
                  value={formData.address}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, address: e.target.value }))
                  }
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="workOrder">Work Order Number</Label>
                <Input
                  id="workOrder"
                  placeholder="Enter work order number"
                  value={formData.workOrderNo}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, workOrderNo: e.target.value }))
                  }
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddContractor} disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add Contractor'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
