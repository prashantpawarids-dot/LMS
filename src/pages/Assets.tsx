// =====================================================
// Assets & Tools Page - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

// =====================================================
// Assets & Tools Page - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import { useState } from 'react';
import { Package, Filter, Plus } from 'lucide-react';
import { AppLayout } from '@/components/layout';
import { PageHeader, DataTable, StatusBadge, type Column } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
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

type AssetRow = {
  id: string;
  code: string;
  name: string;
  category: string;
  siteName: string;
  status: 'available' | 'in_use' | 'under_maintenance' | 'retired';
};

const mockAssets: AssetRow[] = [
  {
    id: '1',
    code: 'AST-001',
    name: 'Concrete Mixer',
    category: 'Equipment',
    siteName: 'MELODY I',
    status: 'in_use',
  },
  {
    id: '2',
    code: 'AST-014',
    name: 'Safety Harness Set',
    category: 'Safety',
    siteName: 'HARMONY',
    status: 'available',
  },
];

const columns: Column<AssetRow>[] = [
  { key: 'code', header: 'Asset Code' },
  { key: 'name', header: 'Asset Name' },
  { key: 'category', header: 'Category' },
  { key: 'siteName', header: 'Site' },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <StatusBadge status={row.status} />,
  },
];

export default function AssetsPage() {
  const { toast } = useToast();
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [assets, setAssets] = useState<AssetRow[]>(mockAssets);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    category: '',
    siteName: '',
    notes: '',
  });

  const filteredAssets = assets.filter((asset) => {
    const matchesCategory =
      categoryFilter === 'all' ||
      asset.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || asset.status === statusFilter;
    return matchesCategory && matchesStatus;
  });

  const handleAddAsset = () => {
    if (!formData.code || !formData.name || !formData.category || !formData.siteName) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields (code, name, category, site).',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setAssets((prev) => [
        ...prev,
        {
          id: String(prev.length + 1),
          code: formData.code,
          name: formData.name,
          category: formData.category,
          siteName: formData.siteName,
          status: 'available',
        },
      ]);
      setIsSaving(false);
      setIsAddDialogOpen(false);
      setFormData({
        code: '',
        name: '',
        category: '',
        siteName: '',
        notes: '',
      });
      toast({
        title: 'Asset Added',
        description: 'New asset has been created in the system (dummy record).',
      });
    }, 600);
  };

  return (
    <AppLayout title="Assets & Tools">
      <div className="space-y-6 animate-fade-in">
        <PageHeader
          title="Assets & Tools"
          description="Track critical construction assets and tools across all sites"
          icon={Package}
          primaryAction={{
            label: 'Add Asset',
            onClick: () => setIsAddDialogOpen(true),
            icon: Plus,
          }}
        />

        {/* Summary */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="card-interactive">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">182</div>
            </CardContent>
          </Card>
          <Card className="card-interactive">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Currently In Use</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">76</div>
            </CardContent>
          </Card>
          <Card className="card-interactive">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Under Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
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
              <div className="w-[200px]">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Equipment">Equipment</SelectItem>
                    <SelectItem value="Safety">Safety</SelectItem>
                    <SelectItem value="Tools">Tools</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[200px]">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="in_use">In Use</SelectItem>
                    <SelectItem value="under_maintenance">Under Maintenance</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assets Table */}
        <DataTable
          columns={columns}
          data={filteredAssets}
          keyExtractor={(row) => row.id}
          emptyMessage="No assets found"
        />

        {/* Add Asset Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Asset</DialogTitle>
              <DialogDescription>
                Capture basic details of tools and equipment. You can wire this to your API later.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assetCode">Asset Code *</Label>
                  <Input
                    id="assetCode"
                    placeholder="e.g. AST-025"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, code: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assetName">Asset Name *</Label>
                  <Input
                    id="assetName"
                    placeholder="e.g. Vibrator, Mixer"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assetCategory">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger id="assetCategory">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      <SelectItem value="Equipment">Equipment</SelectItem>
                      <SelectItem value="Safety">Safety</SelectItem>
                      <SelectItem value="Tools">Tools</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assetSite">Site *</Label>
                  <Input
                    id="assetSite"
                    placeholder="e.g. MELODY I"
                    value={formData.siteName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, siteName: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assetNotes">Notes</Label>
                <Textarea
                  id="assetNotes"
                  placeholder="Additional details like serial no., vendor, etc."
                  rows={2}
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, notes: e.target.value }))
                  }
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddAsset} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Add Asset'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}

