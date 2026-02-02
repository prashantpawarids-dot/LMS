// =====================================================
// Page Header Component - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import { Button } from '@/components/ui/button';
import { LucideIcon, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actions?: React.ReactNode;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  className?: string;
}

export function PageHeader({
  title,
  description,
  icon: Icon,
  actions,
  primaryAction,
  className,
}: PageHeaderProps) {
  const PrimaryIcon = primaryAction?.icon || Plus;

  return (
    <div className={cn('flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between', className)}>
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="rounded-lg bg-primary/10 p-2">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        )}
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            {title}
          </h1>
          {description && (
            <p className="mt-0.5 text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {actions}
        {primaryAction && (
          <Button onClick={primaryAction.onClick} className="gap-2">
            <PrimaryIcon className="h-4 w-4" />
            {primaryAction.label}
          </Button>
        )}
      </div>
    </div>
  );
}

export default PageHeader;
