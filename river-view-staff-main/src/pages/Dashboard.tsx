// =====================================================
// Dashboard Page - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import { Users, HardHat, MapPin, ClipboardCheck, TrendingUp, AlertTriangle } from 'lucide-react';
import { AppLayout } from '@/components/layout';
import { StatCard, PageHeader } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
  return (
    <AppLayout title="Dashboard">
      <div className="space-y-6 animate-fade-in">
        <PageHeader
          title="Dashboard"
          description="Welcome to Labour Management System"
        />

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Labours"
            value="1,248"
            subtitle="Active workers"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
            variant="primary"
          />
          <StatCard
            title="Today's Attendance"
            value="89%"
            subtitle="1,110 present"
            icon={ClipboardCheck}
            trend={{ value: 3, isPositive: true }}
          />
          <StatCard
            title="Active Sites"
            value="24"
            subtitle="Across all projects"
            icon={MapPin}
          />
          <StatCard
            title="Contractors"
            value="48"
            subtitle="Registered vendors"
            icon={HardHat}
          />
        </div>

        {/* Quick Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="card-interactive">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Attendance Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89.2%</div>
              <p className="text-xs text-muted-foreground mt-1">
                +2.5% from yesterday
              </p>
              <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full w-[89%] rounded-full bg-gradient-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-interactive">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Approvals
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">
                Labour registrations pending
              </p>
            </CardContent>
          </Card>

          <Card className="card-interactive">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Passes Expiring Soon
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">38</div>
              <p className="text-xs text-muted-foreground mt-1">
                Within next 30 days
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground pt-4 border-t">
          © IDS ID PVT LTD by Prashant Pawar
        </div>
      </div>
    </AppLayout>
  );
}
