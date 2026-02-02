// =====================================================
// Safety & Compliance Page - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import { useState } from 'react';
import { ShieldCheck, AlertTriangle, Filter } from 'lucide-react';
import { AppLayout } from '@/components/layout';
import { PageHeader, DataTable, StatusBadge, type Column } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
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

type ComplianceRow = {
  id: string;
  labourName: string;
  passNo: string;
  contractorName: string;
  induction: 'completed' | 'pending';
  medical: 'valid' | 'expired';
  ppe: 'issued' | 'pending';
  safetyTraining: 'completed' | 'pending';
};

const mockCompliance: ComplianceRow[] = [
  {
    id: '1',
    labourName: 'Rajesh Kumar',
    passNo: '72897',
    contractorName: 'CACHE TECHNOLOGIES',
    induction: 'completed',
    medical: 'valid',
    ppe: 'issued',
    safetyTraining: 'completed',
  },
  {
    id: '2',
    labourName: 'Vikram Yadav',
    passNo: '72900',
    contractorName: 'S.S. KORDE ENTERPRISES',
    induction: 'pending',
    medical: 'expired',
    ppe: 'pending',
    safetyTraining: 'pending',
  },
];

export default function CompliancePage() {
  const { toast } = useToast();
  const [rows, setRows] = useState<ComplianceRow[]>(mockCompliance);
  const [inductionFilter, setInductionFilter] = useState<'all' | 'completed' | 'pending'>(
    'all',
  );
  const [medicalFilter, setMedicalFilter] = useState<'all' | 'valid' | 'expired'>('all');
  const [ppeFilter, setPpeFilter] = useState<'all' | 'issued' | 'pending'>('all');
  const [editingRow, setEditingRow] = useState<ComplianceRow | null>(null);
  const [editData, setEditData] = useState({
    induction: 'completed' as ComplianceRow['induction'],
    medical: 'valid' as ComplianceRow['medical'],
    ppe: 'issued' as ComplianceRow['ppe'],
    safetyTraining: 'completed' as ComplianceRow['safetyTraining'],
  });

  const filteredRows = rows.filter((row) => {
    const matchesInduction =
      inductionFilter === 'all' || row.induction === inductionFilter;
    const matchesMedical = medicalFilter === 'all' || row.medical === medicalFilter;
    const matchesPpe = ppeFilter === 'all' || row.ppe === ppeFilter;
    return matchesInduction && matchesMedical && matchesPpe;
  });

  const columns: Column<ComplianceRow>[] = [
    { key: 'passNo', header: 'Pass No' },
    { key: 'labourName', header: 'Labour Name' },
    { key: 'contractorName', header: 'Contractor' },
    {
      key: 'induction',
      header: 'Site Induction',
      render: (row) => (
        <StatusBadge status={row.induction === 'completed' ? 'success' : 'warning'} />
      ),
    },
    {
      key: 'medical',
      header: 'Medical',
      render: (row) => (
        <StatusBadge status={row.medical === 'valid' ? 'success' : 'destructive'} />
      ),
    },
    {
      key: 'ppe',
      header: 'PPE Kit',
      render: (row) => (
        <StatusBadge status={row.ppe === 'issued' ? 'success' : 'warning'} />
      ),
    },
    {
      key: 'safetyTraining',
      header: 'Safety Training',
      render: (row) => (
        <StatusBadge
          status={row.safetyTraining === 'completed' ? 'success' : 'warning'}
        />
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <Button
          variant="outline"
          size="sm"
          className="h-7 px-2 text-xs"
          onClick={() => {
            setEditingRow(row);
            setEditData({
              induction: row.induction,
              medical: row.medical,
              ppe: row.ppe,
              safetyTraining: row.safetyTraining,
            });
          }}
        >
          Update
        </Button>
      ),
    },
  ];

  const handleSaveCompliance = () => {
    if (!editingRow) return;

    setRows((prev) =>
      prev.map((row) =>
        row.id === editingRow.id
          ? {
              ...row,
              induction: editData.induction,
              medical: editData.medical,
              ppe: editData.ppe,
              safetyTraining: editData.safetyTraining,
            }
          : row,
      ),
    );
    setEditingRow(null);
    toast({
      title: 'Compliance Updated',
      description:
        'Safety & compliance details updated for this labour (dummy update only).',
    });
  };

  return (
    <AppLayout title="Safety & Compliance">
      <div className="space-y-6 animate-fade-in">
        <PageHeader
          title="Safety & Compliance"
          description="Track compliance readiness of all labours and contractors"
          icon={ShieldCheck}
        />

        {/* Summary */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="card-interactive">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Fully Compliant Labours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,012</div>
            </CardContent>
          </Card>
          <Card className="card-interactive">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm text-muted-foreground">Pending Induction</CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">54</div>
            </CardContent>
          </Card>
          <Card className="card-interactive">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Expired Medicals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
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
                <Select
                  value={inductionFilter}
                  onValueChange={(value: 'all' | 'completed' | 'pending') =>
                    setInductionFilter(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Induction" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[200px]">
                <Select
                  value={medicalFilter}
                  onValueChange={(value: 'all' | 'valid' | 'expired') =>
                    setMedicalFilter(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Medical" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="valid">Valid</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[200px]">
                <Select
                  value={ppeFilter}
                  onValueChange={(value: 'all' | 'issued' | 'pending') =>
                    setPpeFilter(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="PPE" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="issued">Issued</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Table */}
        <DataTable
          columns={columns}
          data={filteredRows}
          keyExtractor={(row) => row.id}
          emptyMessage="No compliance records found"
        />

        {/* Edit Compliance Dialog */}
        <Dialog open={!!editingRow} onOpenChange={(open) => !open && setEditingRow(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Update Compliance</DialogTitle>
              <DialogDescription>
                Update induction, medical, PPE and safety training status for this labour.
              </DialogDescription>
            </DialogHeader>

            {editingRow && (
              <div className="space-y-4 py-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {editingRow.labourName} ({editingRow.passNo})
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {editingRow.contractorName}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Site Induction</Label>
                    <Select
                      value={editData.induction}
                      onValueChange={(value: ComplianceRow['induction']) =>
                        setEditData((prev) => ({ ...prev, induction: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Medical</Label>
                    <Select
                      value={editData.medical}
                      onValueChange={(value: ComplianceRow['medical']) =>
                        setEditData((prev) => ({ ...prev, medical: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="valid">Valid</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>PPE Kit</Label>
                    <Select
                      value={editData.ppe}
                      onValueChange={(value: ComplianceRow['ppe']) =>
                        setEditData((prev) => ({ ...prev, ppe: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="issued">Issued</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Safety Training</Label>
                    <Select
                      value={editData.safetyTraining}
                      onValueChange={(value: ComplianceRow['safetyTraining']) =>
                        setEditData((prev) => ({ ...prev, safetyTraining: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingRow(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveCompliance}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}

