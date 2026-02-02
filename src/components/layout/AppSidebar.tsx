// =====================================================
// App Sidebar - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  MapPin, 
  HardHat,
  ClipboardList,
  UserCog,
  Settings,
  LogOut,
  ChevronDown,
  CalendarClock,
  BadgeIndianRupee,
  ClipboardCheck,
  ShieldCheck,
  Package,
  Truck,
  FileBarChart2,
  FileText
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import logo from '@/assets/logo.png';

const mainNavItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    title: 'Attendance',
    icon: ClipboardList,
    href: '/attendance',
  },
  {
    title: 'Shifts & Roster',
    icon: CalendarClock,
    href: '/shifts',
  },
];

const masterNavItems = [
  {
    title: 'Labours',
    icon: Users,
    href: '/labours',
  },
  {
    title: 'Contractors',
    icon: HardHat,
    href: '/contractors',
  },
  {
    title: 'Sites',
    icon: MapPin,
    href: '/sites',
  },
  {
    title: 'Companies',
    icon: Building2,
    href: '/companies',
  },
  {
    title: 'Pass Management',
    icon: ClipboardCheck,
    href: '/passes',
  },
];

const adminNavItems = [
  {
    title: 'Users',
    icon: UserCog,
    href: '/users',
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/settings',
  },
  {
    title: 'HR Requests',
    icon: FileText,
    href: '/hr-requests',
  },
];

const opsNavItems = [
  {
    title: 'Payroll & Wages',
    icon: BadgeIndianRupee,
    href: '/payroll',
  },
  {
    title: 'Assets & Tools',
    icon: Package,
    href: '/assets',
  },
  {
    title: 'Vehicles & Transport',
    icon: Truck,
    href: '/vehicles',
  },
  {
    title: 'Safety & Compliance',
    icon: ShieldCheck,
    href: '/compliance',
  },
  {
    title: 'Reports & Analytics',
    icon: FileBarChart2,
    href: '/reports',
  },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (href: string) => location.pathname === href;

  const handleLogout = () => {
    // Clear any stored auth data (for future API integration)
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    localStorage.removeItem('selected_company');
    // Navigate to login
    navigate('/login');
  };

  return (
    <Sidebar className="border-r border-sidebar-border bg-gradient-sidebar shadow-lg">
      <SidebarHeader className="border-b border-sidebar-border/50 px-4 py-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-white rounded-lg shadow-sm">
            <img src={logo} alt="IDS SmartTech" className="h-8 w-auto" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm font-semibold text-blue-900">
              Labour Management
            </span>
            <span className="text-xs text-blue-600/70">
              by Prashant Pawar
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="scrollbar-thin px-2 py-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-700/60 text-xs uppercase tracking-wider mb-2 font-semibold">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    className={cn(
                      "transition-all duration-200 text-slate-700 hover:bg-blue-100 hover:text-blue-700",
                      isActive(item.href) && "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md hover:from-blue-600 hover:to-indigo-600 hover:text-white"
                    )}
                  >
                    <NavLink to={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Operations */}
        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between text-blue-700/60 text-xs uppercase tracking-wider mb-2 hover:text-blue-800 transition-colors font-semibold">
                Operations
                <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {opsNavItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive(item.href)}
                        className={cn(
                          "transition-all duration-200",
                          isActive(item.href) && "bg-sidebar-primary text-sidebar-primary-foreground"
                        )}
                      >
                        <NavLink to={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Master Data */}
        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between text-blue-700/60 text-xs uppercase tracking-wider mb-2 hover:text-blue-800 transition-colors font-semibold">
                Master Data
                <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {masterNavItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive(item.href)}
                        className={cn(
                          "transition-all duration-200",
                          isActive(item.href) && "bg-sidebar-primary text-sidebar-primary-foreground"
                        )}
                      >
                        <NavLink to={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Administration */}
        <SidebarGroup>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between text-blue-700/60 text-xs uppercase tracking-wider mb-2 hover:text-blue-800 transition-colors font-semibold">
                Administration
                <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminNavItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive(item.href)}
                        className={cn(
                          "transition-all duration-200",
                          isActive(item.href) && "bg-sidebar-primary text-sidebar-primary-foreground"
                        )}
                      >
                        <NavLink to={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/50 p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              className="text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="mt-3 text-center">
          <p className="text-[10px] text-blue-800/50 font-medium">
            © IDS ID PVT LTD by Prashant Pawar
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
