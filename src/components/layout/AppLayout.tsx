// =====================================================
// App Layout - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';

interface AppLayoutProps {
  title?: string;
  children?: React.ReactNode;
}

export function AppLayout({ title, children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex flex-1 flex-col">
          <AppHeader title={title} />
          <main className="flex-1 overflow-auto bg-background p-6">
            {children || <Outlet />}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default AppLayout;
