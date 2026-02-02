// =====================================================
// Reports & Analytics Page - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import { FileBarChart2 } from 'lucide-react';
import { AppLayout } from '@/components/layout';
import { PageHeader } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReportsPage() {
  return (
    <AppLayout title="Reports & Analytics">
      <div className="space-y-6 animate-fade-in">
        <PageHeader
          title="Reports & Analytics"
          description="High level view of labour, attendance, payroll and compliance KPIs"
          icon={FileBarChart2}
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="card-interactive min-h-[180px]">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Attendance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-24 rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground">
                Attendance chart placeholder
              </div>
            </CardContent>
          </Card>

          <Card className="card-interactive min-h-[180px]">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Payroll Cost by Site</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-24 rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground">
                Payroll chart placeholder
              </div>
            </CardContent>
          </Card>

          <Card className="card-interactive min-h-[180px]">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Compliance Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-24 rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground">
                Compliance chart placeholder
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

