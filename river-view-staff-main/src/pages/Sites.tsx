// =====================================================
// Sites Page - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import { useState } from 'react';
import { Plus, Download, Filter, Search, Eye, Edit, Trash2, MapPin } from 'lucide-react';
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
import type { Site } from '@/types';

// Mock data
const mockSites: Site[] = [
  { id: '1', siteCode: 'NRD25', siteName: 'NRD 25', address: 'Nanded City, Pune', companyId: '1', companyName: 'Nanded City Development and Construction Company', status: 'active', createdAt: '2023-04-08', updatedAt: '2023-04-08' },
  { id: '2', siteCode: 'BAHAR', siteName: 'BAHAR', address: 'Nanded City, Pune', companyId: '1', companyName: 'Nanded City Development and Construction Company', status: 'active', createdAt: '2023-04-18', updatedAt: '2023-04-18' },
  { id: '3', siteCode: 'NRD34', siteName: 'NRD-34 (YOGASHREE)', address: 'Nanded City, Pune', companyId: '1', companyName: 'Nanded City Development and Construction Company', status: 'active', createdAt: '2023-05-04', updatedAt: '2023-05-04' },
  { id: '4', siteCode: 'MELODY', siteName: 'MELODY I', address: 'Riverview City, Kadamwak Haveli', companyId: '1', companyName: 'Nanded City Development and Construction Company', status: 'active', createdAt: '2023-05-30', updatedAt: '2023-05-30' },
  { id: '5', siteCode: 'HARMONY', siteName: 'HARMONY', address: 'Riverview City, Kadamwak Haveli', companyId: '1', companyName: 'Nanded City Development and Construction Company', status: 'active', createdAt: '2023-06-02', updatedAt: '2023-06-02' },
  { id: '6', siteCode: 'RHYTHM', siteName: 'RHYTHM (I,II,III)', address: 'Riverview City, Kadamwak Haveli', companyId: '1', companyName: 'Nanded City Development and Construction Company', status: 'active', createdAt: '2023-06-24', updatedAt: '2023-06-24' },
  { id: '7', siteCode: 'FALCON', siteName: 'FALCON & SKYLARK', address: 'Riverview City, Kadamwak Haveli', companyId: '1', companyName: 'Nanded City Development and Construction Company', status: 'active', createdAt: '2023-07-24', updatedAt: '2023-07-24' },
  { id: '8', siteCode: 'HORNBILL', siteName: 'HORNBILL HEIGHTS', address: 'RVR-02', companyId: '1', companyName: 'Nanded City Development and Construction Company', status: 'active', createdAt: '2024-01-18', updatedAt: '2024-01-18' },
  { id: '9', siteCode: 'ANTARA', siteName: 'ANTARA', address: 'Nanded City, Pune', companyId: '1', companyName: 'Nanded City Development and Construction Company', status: 'inactive', createdAt: '2024-05-24', updatedAt: '2024-05-24' },
  { id: '10', siteCode: 'DHANASHREE', siteName: 'DHANASHREE', address: 'Nanded City, Pune', companyId: '1', companyName: 'Nanded City Development and Construction Company', status: 'active', createdAt: '2025-01-10', updatedAt: '2025-01-10' },
];

export default function SitesPage() {
  const { toast } = useToast();
  const [sites, setSites] = useState<Site[]>(mockSites);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    siteCode: '',
    siteName: '',
    companyId: '',
    address: '',
  });

  const companyNameMap: Record<string, string> = {
    '1': 'Nanded City Development and Construction Company',
    '2': 'Riverview City Constructions Ltd.',
  };

  const filteredData = sites.filter(item => {
    const matchesSearch = !searchQuery || 
      item.siteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.siteCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddSite = () => {
    if (!formData.siteCode || !formData.siteName || !formData.companyId) {
      toast({
        title: 'Validation Error',
        description: 'Site code, name and company are required',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setSites(prev => [
        ...prev,
        {
          id: String(prev.length + 1),
          siteCode: formData.siteCode,
          siteName: formData.siteName,
          address: formData.address || undefined,
          companyId: formData.companyId,
          companyName: companyNameMap[formData.companyId],
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
      setIsLoading(false);
      setIsAddDialogOpen(false);
      setFormData({
        siteCode: '',
        siteName: '',
        companyId: '',
        address: '',
      });
      toast({
        title: 'Site Added',
        description: 'New site has been created (dummy record).',
      });
    }, 600);
  };

  const columns: Column<Site>[] = [
    { key: 'siteCode', header: 'Code', sortable: true },
    { key: 'siteName', header: 'Site/Project Name', sortable: true },
    { key: 'address', header: 'Address', render: (item) => item.address || '-' },
    { key: 'companyName', header: 'Company' },
    { key: 'createdAt', header: 'Created On', render: (item) => new Date(item.createdAt).toLocaleDateString() },
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
    <AppLayout title="Sites">
      <div className="space-y-6 animate-fade-in">
        <PageHeader
          title="Sites / Projects"
          description="Manage all construction sites and projects"
          icon={MapPin}
          primaryAction={{
            label: 'Add Site',
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
          emptyMessage="No sites found"
        />

        {/* Add Site Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Site</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new site/project
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="siteCode">Site Code *</Label>
                <Input
                  id="siteCode"
                  placeholder="Enter site code"
                  value={formData.siteCode}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, siteCode: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteName">Site/Project Name *</Label>
                <Input
                  id="siteName"
                  placeholder="Enter site name"
                  value={formData.siteName}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, siteName: e.target.value }))
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
                    <SelectItem value="1">Nanded City Development and Construction Company</SelectItem>
                    <SelectItem value="2">Riverview City Constructions Ltd.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  placeholder="Enter site address"
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
              <Button onClick={handleAddSite} disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add Site'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
