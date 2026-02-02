// =====================================================
// Attendance Page - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Filter, Download, CheckCircle2, XCircle, Clock, Search } from 'lucide-react';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import type { Attendance } from '@/types';

// Mock data
const mockAttendance: Attendance[] = [
  { id: '1', labourId: 'L001', labourName: 'Rajesh Kumar', passNo: '72896', siteId: 'S1', siteName: 'MELODY I', date: '2026-01-19', checkIn: '08:00', checkOut: '17:00', status: 'present', workHours: 9 },
  { id: '2', labourId: 'L002', labourName: 'Suresh Patel', passNo: '72897', siteId: 'S1', siteName: 'MELODY I', date: '2026-01-19', checkIn: '08:15', checkOut: '17:30', status: 'present', workHours: 9.25 },
  { id: '3', labourId: 'L003', labourName: 'Amit Singh', passNo: '72898', siteId: 'S2', siteName: 'HARMONY', date: '2026-01-19', status: 'absent' },
  { id: '4', labourId: 'L004', labourName: 'Vikram Sharma', passNo: '72899', siteId: 'S1', siteName: 'MELODY I', date: '2026-01-19', checkIn: '08:00', checkOut: '12:30', status: 'half_day', workHours: 4.5 },
  { id: '5', labourId: 'L005', labourName: 'Pradeep Yadav', passNo: '72900', siteId: 'S3', siteName: 'RHYTHM', date: '2026-01-19', checkIn: '07:30', checkOut: '19:00', status: 'overtime', workHours: 11.5, overtime: 2.5 },
  { id: '6', labourId: 'L006', labourName: 'Manoj Gupta', passNo: '72901', siteId: 'S2', siteName: 'HARMONY', date: '2026-01-19', status: 'leave' },
  { id: '7', labourId: 'L007', labourName: 'Rakesh Verma', passNo: '72902', siteId: 'S1', siteName: 'MELODY I', date: '2026-01-19', checkIn: '08:05', checkOut: '17:00', status: 'present', workHours: 8.92 },
  { id: '8', labourId: 'L008', labourName: 'Sandeep Kumar', passNo: '72903', siteId: 'S3', siteName: 'RHYTHM', date: '2026-01-19', checkIn: '08:00', checkOut: '17:15', status: 'present', workHours: 9.25 },
];

const mockSites = [
  { id: 'all', name: 'All Sites' },
  { id: 'S1', name: 'MELODY I' },
  { id: 'S2', name: 'HARMONY' },
  { id: 'S3', name: 'RHYTHM' },
];

export default function AttendancePage() {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedSite, setSelectedSite] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = mockAttendance.filter(item => {
    const matchesSite = selectedSite === 'all' || item.siteId === selectedSite;
    const matchesSearch = !searchQuery || 
      item.labourName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.passNo?.includes(searchQuery);
    return matchesSite && matchesSearch;
  });

  const stats = {
    total: filteredData.length,
    present: filteredData.filter(a => a.status === 'present' || a.status === 'overtime').length,
    absent: filteredData.filter(a => a.status === 'absent').length,
    halfDay: filteredData.filter(a => a.status === 'half_day').length,
    onLeave: filteredData.filter(a => a.status === 'leave').length,
  };

  const columns: Column<Attendance>[] = [
    { key: 'passNo', header: 'Pass No', sortable: true },
    { key: 'labourName', header: 'Labour Name', sortable: true },
    { key: 'siteName', header: 'Site' },
    { key: 'checkIn', header: 'Check In', render: (item) => item.checkIn || '-' },
    { key: 'checkOut', header: 'Check Out', render: (item) => item.checkOut || '-' },
    { 
      key: 'workHours', 
      header: 'Work Hours',
      render: (item) => item.workHours ? `${item.workHours.toFixed(1)} hrs` : '-'
    },
    {
      key: 'status',
      header: 'Status',
      render: (item) => <StatusBadge status={item.status} />,
    },
  ];

  return (
    <AppLayout title="Attendance">
      <div className="space-y-6 animate-fade-in">
        <PageHeader
          title="Attendance"
          description="Mark and view daily attendance records"
          actions={
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          }
        />

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">Total Workers</p>
            </CardContent>
          </Card>
          <Card className="border-success/30 bg-success/5">
            <CardContent className="pt-4 flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-success" />
              <div>
                <div className="text-2xl font-bold text-success">{stats.present}</div>
                <p className="text-xs text-muted-foreground">Present</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="pt-4 flex items-center gap-3">
              <XCircle className="h-8 w-8 text-destructive" />
              <div>
                <div className="text-2xl font-bold text-destructive">{stats.absent}</div>
                <p className="text-xs text-muted-foreground">Absent</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-warning/30 bg-warning/5">
            <CardContent className="pt-4 flex items-center gap-3">
              <Clock className="h-8 w-8 text-warning" />
              <div>
                <div className="text-2xl font-bold text-warning">{stats.halfDay}</div>
                <p className="text-xs text-muted-foreground">Half Day</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-info/30 bg-info/5">
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-info">{stats.onLeave}</div>
              <p className="text-xs text-muted-foreground">On Leave</p>
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
              {/* Date Picker */}
              <div className="w-[200px]">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-popover z-50" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(d) => d && setDate(d)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Site Filter */}
              <div className="w-[200px]">
                <Select value={selectedSite} onValueChange={setSelectedSite}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Site" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {mockSites.map((site) => (
                      <SelectItem key={site.id} value={site.id}>
                        {site.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Search */}
              <div className="flex-1 min-w-[200px] max-w-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or pass no..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={filteredData}
          keyExtractor={(item) => item.id}
          emptyMessage="No attendance records found"
        />
      </div>
    </AppLayout>
  );
}
