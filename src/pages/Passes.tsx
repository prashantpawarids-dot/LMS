// =====================================================
// Pass Management Page - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import { useState } from 'react';
import { ClipboardCheck, Filter, Plus, Search } from 'lucide-react';
import { AppLayout } from '@/components/layout';
import { PageHeader, DataTable, StatusBadge, type Column } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

type PassRow = {
  id: string;
  passNo: string;
  labourName: string;
  contractorName: string;
  siteName: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'blocked' | 'pending';
};

const mockPasses: PassRow[] = [
  {
    id: '1',
    passNo: '72896',
    labourName: 'Tushar Chauhan',
    contractorName: 'CACHE TECHNOLOGIES',
    siteName: 'MELODY I',
    issueDate: '2025-12-15',
    expiryDate: '2026-03-31',
    status: 'active',
  },
  {
    id: '2',
    passNo: '72900',
    labourName: 'Vikram Yadav',
    contractorName: 'S.S. KORDE ENTERPRISES',
    siteName: 'HARMONY',
    issueDate: '2025-09-01',
    expiryDate: '2026-02-28',
    status: 'expired',
  },
];

const columns: Column<PassRow>[] = [
  { key: 'passNo', header: 'Pass No' },
  { key: 'labourName', header: 'Labour Name' },
  { key: 'contractorName', header: 'Contractor' },
  { key: 'siteName', header: 'Site' },
  { key: 'issueDate', header: 'Issue Date' },
  { key: 'expiryDate', header: 'Expiry Date' },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <StatusBadge status={row.status} />,
  },
];

export default function PassesPage() {
  const { toast } = useToast();
  const [passes, setPasses] = useState<PassRow[]>(mockPasses);
  const [statusFilter, setStatusFilter] = useState('all');
  const [siteFilter, setSiteFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    passNo: '',
    labourName: '',
    contractorName: '',
    siteName: '',
    issueDate: '',
    expiryDate: '',
    status: 'active' as PassRow['status'],
  });

  const filteredPasses = passes.filter((row) => {
    const matchesStatus = statusFilter === 'all' || row.status === statusFilter;
    const matchesSite = siteFilter === 'all' || row.siteName === siteFilter;
    const matchesSearch =
      !searchQuery ||
      row.labourName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.passNo.includes(searchQuery);
    return matchesStatus && matchesSite && matchesSearch;
  });

  const handleIssuePass = () => {
    if (
      !formData.passNo ||
      !formData.labourName ||
      !formData.contractorName ||
      !formData.siteName ||
      !formData.issueDate ||
      !formData.expiryDate
    ) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setPasses((prev) => [
        ...prev,
        {
          id: String(prev.length + 1),
          ...formData,
        },
      ]);
      setIsSaving(false);
      setIsAddDialogOpen(false);
      setFormData({
        passNo: '',
        labourName: '',
        contractorName: '',
        siteName: '',
        issueDate: '',
        expiryDate: '',
        status: 'active',
      });
      toast({
        title: 'Pass Issued',
        description: 'New pass has been issued (dummy record).',
      });
    }, 600);
  };

  return (
    <AppLayout title="Pass Management">
      <div className="space-y-6 animate-fade-in">
        <PageHeader
          title="Pass Management"
          description="Manage labour entry passes and validity across all sites"
          icon={ClipboardCheck}
          primaryAction={{
            label: 'Issue New Pass',
            onClick: () => setIsAddDialogOpen(true),
            icon: Plus,
          }}
        />

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="card-interactive">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Active Passes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,148</div>
            </CardContent>
          </Card>
          <Card className="card-interactive">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Expiring in 30 Days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">38</div>
            </CardContent>
          </Card>
          <Card className="card-interactive">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Blocked</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
            </CardContent>
          </Card>
          <Card className="card-interactive">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
            </CardContent>
          </Card>
        </div>

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
              <div className="flex-1 min-w-[220px] max-w-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by labour name or pass no..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-[200px]">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                    <SelectItem value="pending">Pending Approval</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[200px]">
                <Select value={siteFilter} onValueChange={setSiteFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Site" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="all">All Sites</SelectItem>
                    <SelectItem value="S1">MELODY I</SelectItem>
                    <SelectItem value="S2">HARMONY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Passes Table */}
        <DataTable
          columns={columns}
          data={filteredPasses}
          keyExtractor={(row) => row.id}
          emptyMessage="No passes found for selected filters"
        />

        {/* Issue New Pass Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Issue New Pass</DialogTitle>
              <DialogDescription>
                Capture basic details to issue a new labour entry pass. This data is stored
                in-memory and can be connected to your API later.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="passNo">Pass Number *</Label>
                <Input
                  id="passNo"
                  placeholder="e.g. 72910"
                  value={formData.passNo}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, passNo: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="labourName">Labour Name *</Label>
                <Input
                  id="labourName"
                  placeholder="Enter labour name"
                  value={formData.labourName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, labourName: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contractorName">Contractor *</Label>
                <Input
                  id="contractorName"
                  placeholder="e.g. CACHE TECHNOLOGIES"
                  value={formData.contractorName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, contractorName: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteName">Site *</Label>
                <Input
                  id="siteName"
                  placeholder="e.g. MELODY I"
                  value={formData.siteName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, siteName: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="issueDate">Issue Date *</Label>
                <Input
                  id="issueDate"
                  type="date"
                  value={formData.issueDate}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, issueDate: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date *</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, expiryDate: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: PassRow['status']) =>
                    setFormData((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending Approval</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleIssuePass} disabled={isSaving}>
                {isSaving ? 'Issuing...' : 'Issue Pass'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}

