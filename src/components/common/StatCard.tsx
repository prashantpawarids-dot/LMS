// =====================================================
// Stat Card Component - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
}

const variantStyles = {
  default: 'bg-card',
  primary: 'bg-gradient-primary text-primary-foreground',
  success: 'bg-success/10 border-success/20',
  warning: 'bg-warning/10 border-warning/20',
  danger: 'bg-destructive/10 border-destructive/20',
};

const iconVariantStyles = {
  default: 'bg-primary/10 text-primary',
  primary: 'bg-white/20 text-white',
  success: 'bg-success/20 text-success',
  warning: 'bg-warning/20 text-warning',
  danger: 'bg-destructive/20 text-destructive',
};

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'stat-card animate-fade-in',
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={cn(
            'text-sm font-medium',
            variant === 'primary' ? 'text-white/80' : 'text-muted-foreground'
          )}>
            {title}
          </p>
          <p className={cn(
            'mt-2 font-display text-3xl font-bold tracking-tight',
            variant === 'primary' ? 'text-white' : 'text-foreground'
          )}>
            {value}
          </p>
          {subtitle && (
            <p className={cn(
              'mt-1 text-sm',
              variant === 'primary' ? 'text-white/70' : 'text-muted-foreground'
            )}>
              {subtitle}
            </p>
          )}
          {trend && (
            <div className={cn(
              'mt-2 inline-flex items-center gap-1 text-sm font-medium',
              trend.isPositive ? 'text-success' : 'text-destructive'
            )}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
              <span className={cn(
                'text-xs',
                variant === 'primary' ? 'text-white/60' : 'text-muted-foreground'
              )}>
                vs last period
              </span>
            </div>
          )}
        </div>
        <div className={cn(
          'rounded-xl p-3',
          iconVariantStyles[variant]
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

export default StatCard;
