// =====================================================
// Status Badge Component - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import { cn } from '@/lib/utils';

type StatusType = 
  | 'active' 
  | 'inactive' 
  | 'blocked' 
  | 'pending'
  | 'present'
  | 'absent'
  | 'half_day'
  | 'leave'
  | 'overtime';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  active: {
    label: 'Active',
    className: 'bg-success/10 text-success border-success/20',
  },
  inactive: {
    label: 'Inactive',
    className: 'bg-muted text-muted-foreground border-muted-foreground/20',
  },
  blocked: {
    label: 'Blocked',
    className: 'bg-destructive/10 text-destructive border-destructive/20',
  },
  pending: {
    label: 'Pending',
    className: 'bg-warning/10 text-warning border-warning/20',
  },
  present: {
    label: 'Present',
    className: 'bg-success/10 text-success border-success/20',
  },
  absent: {
    label: 'Absent',
    className: 'bg-destructive/10 text-destructive border-destructive/20',
  },
  half_day: {
    label: 'Half Day',
    className: 'bg-warning/10 text-warning border-warning/20',
  },
  leave: {
    label: 'On Leave',
    className: 'bg-info/10 text-info border-info/20',
  },
  overtime: {
    label: 'Overtime',
    className: 'bg-primary/10 text-primary border-primary/20',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase().replace(' ', '_') as StatusType;
  const config = statusConfig[normalizedStatus] || {
    label: status,
    className: 'bg-muted text-muted-foreground border-muted-foreground/20',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}

export default StatusBadge;
