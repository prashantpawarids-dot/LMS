// =====================================================
// Vehicles & Transport Page - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import { useState } from 'react';
import { Truck, Filter, Plus } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';

type VehicleRow = {
  id: string;
  number: string;
  type: string;
  capacity: string;
  contractorName: string;
  status: 'available' | 'on_trip' | 'maintenance';
};

const mockVehicles: VehicleRow[] = [
  {
    id: '1',
    number: 'MH-12-AB-1234',
    type: 'Tipper Truck',
    capacity: '16 MT',
    contractorName: 'MAGSA Contractors LLP',
    status: 'on_trip',
  },
  {
    id: '2',
    number: 'MH-14-CD-5678',
    type: 'Material Van',
    capacity: '4 MT',
    contractorName: 'CACHE TECHNOLOGIES',
    status: 'available',
  },
];

const columns: Column<VehicleRow>[] = [
  { key: 'number', header: 'Vehicle No' },
  { key: 'type', header: 'Type' },
  { key: 'capacity', header: 'Capacity' },
  { key: 'contractorName', header: 'Contractor' },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <StatusBadge status={row.status} />,
  },
];

export default function VehiclesPage() {
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState('all');
  const [vehicles, setVehicles] = useState<VehicleRow[]>(mockVehicles);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    number: '',
    type: '',
    capacity: '',
    contractorName: '',
    status: 'available' as VehicleRow['status'],
  });

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
    return matchesStatus;
  });

  const handleAddVehicle = () => {
    if (!formData.number || !formData.type || !formData.contractorName) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in vehicle number, type and contractor.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setVehicles((prev) => [
        ...prev,
        {
          id: String(prev.length + 1),
          ...formData,
        },
      ]);
      setIsSaving(false);
      setIsAddDialogOpen(false);
      setFormData({
        number: '',
        type: '',
        capacity: '',
        contractorName: '',
        status: 'available',
      });
      toast({
        title: 'Vehicle Added',
        description: 'New vehicle has been registered (dummy record).',
      });
    }, 600);
  };

  return (
    <AppLayout title="Vehicles & Transport">
      <div className="space-y-6 animate-fade-in">
        <PageHeader
          title="Vehicles & Transport"
          description="Monitor vehicles used for labour and material movement"
          icon={Truck}
          primaryAction={{
            label: 'Add Vehicle',
            onClick: () => setIsAddDialogOpen(true),
            icon: Plus,
          }}
        />

        {/* Summary */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="card-interactive">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Vehicles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
            </CardContent>
          </Card>
          <Card className="card-interactive">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Currently On Trip</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
            </CardContent>
          </Card>
          <Card className="card-interactive">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Under Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
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
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="on_trip">On Trip</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vehicles Table */}
        <DataTable
          columns={columns}
          data={filteredVehicles}
          keyExtractor={(row) => row.id}
          emptyMessage="No vehicles found"
        />

        {/* Add Vehicle Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Vehicle</DialogTitle>
              <DialogDescription>
                Maintain vehicles used for labour and material transport. This form is fully
                client-side and can be connected to your API later.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="vehicleNumber">Vehicle Number *</Label>
                <Input
                  id="vehicleNumber"
                  placeholder="e.g. MH-12-AB-1234"
                  value={formData.number}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, number: e.target.value }))
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleType">Type *</Label>
                  <Input
                    id="vehicleType"
                    placeholder="e.g. Tipper Truck"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, type: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleCapacity">Capacity</Label>
                  <Input
                    id="vehicleCapacity"
                    placeholder="e.g. 16 MT"
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, capacity: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicleContractor">Contractor *</Label>
                <Input
                  id="vehicleContractor"
                  placeholder="e.g. MAGSA Contractors LLP"
                  value={formData.contractorName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contractorName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicleStatus">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: VehicleRow['status']) =>
                    setFormData((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger id="vehicleStatus">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="on_trip">On Trip</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddVehicle} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Add Vehicle'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}

