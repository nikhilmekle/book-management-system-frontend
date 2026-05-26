
import { cn } from '@/lib/utils';

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        'bg-card border border-border rounded-xl shadow-[0_2px_12px_var(--shadow)]',
        className
      )}
      {...props} />);


}