import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const baseField =
'w-full bg-cream border-[1.5px] border-border rounded-lg text-text font-sans text-[0.9375rem] outline-none transition-all duration-200 placeholder:text-muted focus:border-amber focus:ring-[3px] focus:ring-amber/15';

export const Input = forwardRef(
  ({ className, ...props }, ref) =>
  <input ref={ref} className={cn(baseField, 'px-4 py-2.5', className)} {...props} />

);
Input.displayName = 'Input';

export const Select = forwardRef(
  ({ className, children, ...props }, ref) =>
  <select ref={ref} className={cn(baseField, 'px-4 py-2.5', className)} {...props}>
      {children}
    </select>

);
Select.displayName = 'Select';