// =====================================================
// Payroll & Wages Page - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import { useState } from 'react';
import { BadgeIndianRupee, Download, Filter, Users } from 'lucide-react';
import { AppLayout } from '@/components/layout';
import { PageHeader, DataTable, StatusBadge, type Column } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

type PayrollRow = {
  id: string;
  month: string;
  labourName: string;
  passNo: string;
  siteName: string;
  contractorName: string;
  daysPresent: number;
  overtimeHours: number;
  grossWage: number;
  deductions: number;
  netPay: number;
  status: 'pending' | 'processed' | 'paid';
};

const mockPayroll: PayrollRow[] = [
  {
    id: '1',
    month: 'Jan 2026',
    labourName: 'Rajesh Kumar',
    passNo: '72897',
    siteName: 'MELODY I',
    contractorName: 'CACHE TECHNOLOGIES',
    daysPresent: 26,
    overtimeHours: 12,
    grossWage: 19000,
    deductions: 1500,
    netPay: 17500,
    status: 'paid',
  },
  {
    id: '2',
    month: 'Jan 2026',
    labourName: 'Amit Singh',
    passNo: '72898',
    siteName: 'HARMONY',
    contractorName: 'S.S. KORDE ENTERPRISES',
    daysPresent: 24,
    overtimeHours: 8,
    grossWage: 17800,
    deductions: 1200,
    netPay: 16600,
    status: 'processed',
  },
];

const columns: Column<PayrollRow>[] = [
  { key: 'month', header: 'Month' },
  { key: 'passNo', header: 'Pass No' },
  { key: 'labourName', header: 'Labour Name' },
  { key: 'siteName', header: 'Site' },
  { key: 'contractorName', header: 'Contractor' },
  { key: 'daysPresent', header: 'Present Days' },
  { key: 'overtimeHours', header: 'OT Hours' },
  {
    key: 'grossWage',
    header: 'Gross',
    render: (row) => `₹${row.grossWage.toLocaleString()}`,
  },
  {
    key: 'deductions',
    header: 'Deductions',
    render: (row) => `₹${row.deductions.toLocaleString()}`,
  },
  {
    key: 'netPay',
    header: 'Net Pay',
    render: (row) => `₹${row.netPay.toLocaleString()}`,
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <StatusBadge status={row.status} />,
  },
];

export default function PayrollPage() {
  const { toast } = useToast();
  const [rows, setRows] = useState<PayrollRow[]>(mockPayroll);
  const [selectedMonth, setSelectedMonth] = useState('jan-2026');
  const [statusFilter, setStatusFilter] = useState<'all' | PayrollRow['status']>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const monthValueToLabel: Record<string, string> = {
    'jan-2026': 'Jan 2026',
    'dec-2025': 'Dec 2025',
    'nov-2025': 'Nov 2025',
  };

  const filteredRows = rows.filter((row) => {
    const monthLabel = monthValueToLabel[selectedMonth];
    const matchesMonth = !monthLabel || row.month === monthLabel;
    const matchesStatus = statusFilter === 'all' || row.status === statusFilter;
    const matchesSearch =
      !searchQuery ||
      row.labourName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.passNo.includes(searchQuery);
    return matchesMonth && matchesStatus && matchesSearch;
  });

  const handleProcessCurrentMonth = () => {
    const monthLabel = monthValueToLabel[selectedMonth];

    setRows((prev) =>
      prev.map((row) =>
        monthLabel && row.month === monthLabel && row.status === 'pending'
          ? { ...row, status: 'processed' }
          : row,
      ),
    );

    toast({
      title: 'Payroll processed (dummy)',
      description:
        monthLabel
          ? `Simulated processing for ${monthLabel}. Replace this with an API call later.`
          : 'Simulated payroll processing. Replace this with an API call later.',
    });
  };

  return (
    <AppLayout title="Payroll & Wages">
      <div className="space-y-6 animate-fade-in">
        <PageHeader
          title="Payroll & Wages"
          description="Review and process labour wages based on validated attendance"
          icon={BadgeIndianRupee}
          primaryAction={{
            label: 'Process Current Month',
            onClick: handleProcessCurrentMonth,
          }}
          actions={
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Payroll
            </Button>
          }
        />

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="card-interactive">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Net Payout (Jan 2026)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹3,41,100</div>
              <p className="text-xs text-muted-foreground mt-1">For all active labours</p>
            </CardContent>
          </Card>
          <Card className="card-interactive">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm text-muted-foreground">Processed Records</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">248</div>
              <p className="text-xs text-muted-foreground mt-1">Ready for payment</p>
            </CardContent>
          </Card>
          <Card className="card-interactive">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">16</div>
              <p className="text-xs text-muted-foreground mt-1">Require supervisor verification</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="w-[180px]">
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="jan-2026">Jan 2026</SelectItem>
                    <SelectItem value="dec-2025">Dec 2025</SelectItem>
                    <SelectItem value="nov-2025">Nov 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[200px]">
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Company" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="all">All Companies</SelectItem>
                    <SelectItem value="rvcl">River View City</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[220px]">
                <Select
                  value={statusFilter}
                  onValueChange={(value: 'all' | PayrollRow['status']) =>
                    setStatusFilter(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processed">Processed</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-[220px] max-w-sm">
                <Input
                  placeholder="Search by labour name or pass no..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payroll Table */}
        <DataTable
          columns={columns}
          data={filteredRows}
          keyExtractor={(row) => row.id}
          emptyMessage="No payroll records found for selected filters"
        />
      </div>
    </AppLayout>
  );
}

