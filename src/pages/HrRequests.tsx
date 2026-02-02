// =====================================================
// HR Requests Page - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import { useState } from 'react';
import { FileText, Filter } from 'lucide-react';
import { AppLayout } from '@/components/layout';
import { PageHeader, DataTable, StatusBadge, type Column } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

type HrRequestRow = {
  id: string;
  requestType: 'Leave' | 'Overtime' | 'Shift Change';
  labourName: string;
  passNo: string;
  siteName: string;
  requestedFor: string;
  status: 'pending' | 'approved' | 'rejected';
};

const mockRequests: HrRequestRow[] = [
  {
    id: '1',
    requestType: 'Leave',
    labourName: 'Amit Singh',
    passNo: '72898',
    siteName: 'MELODY I',
    requestedFor: '2026-01-21',
    status: 'pending',
  },
  {
    id: '2',
    requestType: 'Overtime',
    labourName: 'Rajesh Kumar',
    passNo: '72897',
    siteName: 'HARMONY',
    requestedFor: '2026-01-19 (3 hrs)',
    status: 'approved',
  },
];

export default function HrRequestsPage() {
  const { toast } = useToast();
  const [requests, setRequests] = useState<HrRequestRow[]>(mockRequests);
  const [typeFilter, setTypeFilter] = useState<'all' | 'leave' | 'ot' | 'shift'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | HrRequestRow['status']>('all');

  const filteredRequests = requests.filter((row) => {
    const matchesType =
      typeFilter === 'all' ||
      (typeFilter === 'leave' && row.requestType === 'Leave') ||
      (typeFilter === 'ot' && row.requestType === 'Overtime') ||
      (typeFilter === 'shift' && row.requestType === 'Shift Change');

    const matchesStatus = statusFilter === 'all' || row.status === statusFilter;
    return matchesType && matchesStatus;
  });

  const handleUpdateStatus = (id: string, status: HrRequestRow['status']) => {
    setRequests((prev) =>
      prev.map((row) => (row.id === id ? { ...row, status } : row)),
    );
    toast({
      title: `Request ${status === 'approved' ? 'Approved' : 'Rejected'}`,
      description: 'Status updated locally. Replace with API call when backend is ready.',
    });
  };

  const columns: Column<HrRequestRow>[] = [
    { key: 'requestType', header: 'Type' },
    { key: 'labourName', header: 'Labour Name' },
    { key: 'passNo', header: 'Pass No' },
    { key: 'siteName', header: 'Site' },
    { key: 'requestedFor', header: 'Requested For' },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-1">
          <Button
            size="sm"
            className="h-7 px-2 text-xs"
            variant="outline"
            onClick={() => handleUpdateStatus(row.id, 'approved')}
          >
            Approve
          </Button>
          <Button
            size="sm"
            className="h-7 px-2 text-xs"
            variant="outline"
            onClick={() => handleUpdateStatus(row.id, 'rejected')}
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AppLayout title="HR Requests">
      <div className="space-y-6 animate-fade-in">
        <PageHeader
          title="HR Requests"
          description="Track leave, overtime and shift-change requests from sites"
          icon={FileText}
        />

        {/* Summary */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="card-interactive">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Pending Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">9</div>
            </CardContent>
          </Card>
          <Card className="card-interactive">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Approved (Today)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14</div>
            </CardContent>
          </Card>
          <Card className="card-interactive">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Rejected (This Week)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
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
                  value={typeFilter}
                  onValueChange={(value: 'all' | 'leave' | 'ot' | 'shift') =>
                    setTypeFilter(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Request Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="leave">Leave</SelectItem>
                    <SelectItem value="ot">Overtime</SelectItem>
                    <SelectItem value="shift">Shift Change</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[200px]">
                <Select
                  value={statusFilter}
                  onValueChange={(value: 'all' | HrRequestRow['status']) =>
                    setStatusFilter(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requests Table */}
        <DataTable
          columns={columns}
          data={filteredRequests}
          keyExtractor={(row) => row.id}
          emptyMessage="No HR requests found"
        />
      </div>
    </AppLayout>
  );
}

