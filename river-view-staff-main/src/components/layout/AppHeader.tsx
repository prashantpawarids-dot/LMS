// =====================================================
// App Header - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import { useNavigate } from 'react-router-dom';
import { Bell, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';

interface AppHeaderProps {
  title?: string;
}

export function AppHeader({ title = 'Dashboard' }: AppHeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored auth data (for future API integration)
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    localStorage.removeItem('selected_company');
    // Navigate to login
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-card px-6">
      {/* Sidebar Toggle */}
      <SidebarTrigger className="md:hidden">
        <Menu className="h-5 w-5" />
      </SidebarTrigger>

      {/* Page Title */}
      <div className="flex-1">
        <h1 className="font-display text-xl font-semibold text-foreground">
          {title}
        </h1>
      </div>

      {/* Search */}
      <div className="hidden md:flex md:w-80">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-9 bg-secondary/50 border-0 focus-visible:ring-1"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-[10px] flex items-center justify-center bg-accent text-accent-foreground">
            3
          </Badge>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium">Admin User</span>
                <span className="text-xs text-muted-foreground">Company Admin</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default AppHeader;
