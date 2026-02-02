// =====================================================
// Shifts & Roster Page - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import { useState } from 'react';
import { CalendarClock, Filter, Plus, Users } from 'lucide-react';
import { AppLayout } from '@/components/layout';
import { PageHeader, DataTable, type Column } from '@/components/common';
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

type ShiftRow = {
  id: string;
  date: string;
  shiftName: string;
  timeRange: string;
  siteName: string;
  contractorName: string;
  plannedHeadCount: number;
  assignedHeadCount: number;
};

const mockShifts: ShiftRow[] = [
  {
    id: '1',
    date: '2026-01-19',
    shiftName: 'General Shift',
    timeRange: '08:00 - 17:00',
    siteName: 'MELODY I',
    contractorName: 'CACHE TECHNOLOGIES',
    plannedHeadCount: 120,
    assignedHeadCount: 115,
  },
  {
    id: '2',
    date: '2026-01-19',
    shiftName: 'Night Shift',
    timeRange: '21:00 - 06:00',
    siteName: 'HARMONY',
    contractorName: 'S.S. KORDE ENTERPRISES',
    plannedHeadCount: 40,
    assignedHeadCount: 38,
  },
];

const columns: Column<ShiftRow>[] = [
  { key: 'date', header: 'Date' },
  { key: 'shiftName', header: 'Shift' },
  { key: 'timeRange', header: 'Time' },
  { key: 'siteName', header: 'Site' },
  { key: 'contractorName', header: 'Contractor' },
  { key: 'plannedHeadCount', header: 'Planned HC' },
  { key: 'assignedHeadCount', header: 'Assigned HC' },
];

export default function ShiftsPage() {
  const { toast } = useToast();
  const [shifts, setShifts] = useState<ShiftRow[]>(mockShifts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    shiftName: '',
    timeRange: '',
    siteName: '',
    contractorName: '',
    plannedHeadCount: '',
    assignedHeadCount: '',
  });

  const handleCreateShift = () => {
    if (!formData.date || !formData.shiftName || !formData.timeRange || !formData.siteName) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in date, shift, time and site.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setShifts((prev) => [
        ...prev,
        {
          id: String(prev.length + 1),
          date: formData.date,
          shiftName: formData.shiftName,
          timeRange: formData.timeRange,
          siteName: formData.siteName,
          contractorName: formData.contractorName || 'N/A',
          plannedHeadCount: Number(formData.plannedHeadCount) || 0,
          assignedHeadCount:
            Number(formData.assignedHeadCount || formData.plannedHeadCount) || 0,
        },
      ]);
      setIsSaving(false);
      setIsAddDialogOpen(false);
      setFormData({
        date: '',
        shiftName: '',
        timeRange: '',
        siteName: '',
        contractorName: '',
        plannedHeadCount: '',
        assignedHeadCount: '',
      });
      toast({
        title: 'Shift Plan Created',
        description: 'New shift plan added (dummy record).',
      });
    }, 600);
  };

  return (
    <AppLayout title="Shifts & Roster">
      <div className="space-y-6 animate-fade-in">
        <PageHeader
          title="Shifts & Roster"
          description="Plan and manage daily shift-wise deployment of labours"
          icon={CalendarClock}
          primaryAction={{
            label: 'Create Shift Plan',
            onClick: () => setIsAddDialogOpen(true),
            icon: Plus,
          }}
        />

        {/* Summary */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="card-interactive">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm text-muted-foreground">Total Planned HC (Today)</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">160</div>
            </CardContent>
          </Card>
          <Card className="card-interactive">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Assigned to Shifts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">153</div>
            </CardContent>
          </Card>
          <Card className="card-interactive">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Unassigned Labours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
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
                <Select defaultValue="today">
                  <SelectTrigger>
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[200px]">
                <Select defaultValue="all">
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
              <div className="w-[200px]">
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Contractor" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="all">All Contractors</SelectItem>
                    <SelectItem value="C1">CACHE TECHNOLOGIES</SelectItem>
                    <SelectItem value="C2">S.S. KORDE ENTERPRISES</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shifts Table */}
        <DataTable
          columns={columns}
          data={shifts}
          keyExtractor={(row) => row.id}
          emptyMessage="No shift plans found for selected filters"
        />

        {/* Create Shift Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Create Shift Plan</DialogTitle>
              <DialogDescription>
                Define shift-wise headcount for a specific date and site. This is stored
                locally and ready to be wired to your backend.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="shiftDate">Date *</Label>
                <Input
                  id="shiftDate"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, date: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shiftName">Shift Name *</Label>
                <Input
                  id="shiftName"
                  placeholder="e.g. General Shift"
                  value={formData.shiftName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, shiftName: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeRange">Time Range *</Label>
                <Input
                  id="timeRange"
                  placeholder="e.g. 08:00 - 17:00"
                  value={formData.timeRange}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, timeRange: e.target.value }))
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
                <Label htmlFor="contractorName">Contractor</Label>
                <Input
                  id="contractorName"
                  placeholder="e.g. CACHE TECHNOLOGIES"
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
                <Label htmlFor="plannedHeadCount">Planned Headcount *</Label>
                <Input
                  id="plannedHeadCount"
                  type="number"
                  min={0}
                  value={formData.plannedHeadCount}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      plannedHeadCount: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignedHeadCount">Assigned Headcount</Label>
                <Input
                  id="assignedHeadCount"
                  type="number"
                  min={0}
                  value={formData.assignedHeadCount}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      assignedHeadCount: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateShift} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Create Shift Plan'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}

