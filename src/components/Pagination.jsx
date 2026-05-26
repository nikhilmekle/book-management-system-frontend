import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';







export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const all = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visible = all.filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1);

  const pageBtn = (active, disabled = false) =>
  cn(
    'h-9 w-9 flex items-center justify-center rounded-lg font-sans text-sm transition-all',
    active ?
    'bg-amber text-white font-bold border-0' :
    'border-[1.5px] border-border bg-card text-text font-medium hover:border-amber hover:text-amber',
    disabled && 'opacity-50 cursor-not-allowed hover:border-border hover:text-text'
  );

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10">
      <button
        type="button"
        aria-label="Previous page"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={pageBtn(false, page === 1)}>
        
        <ChevronLeft className="h-4 w-4" />
      </button>

      {visible.map((p, idx) => {
        const prev = visible[idx - 1];
        return (
          <span key={p} className="flex gap-1.5 items-center">
            {prev && p - prev > 1 &&
            <span className="text-muted text-sm px-1">…</span>
            }
            <button
              type="button"
              onClick={() => onPageChange(p)}
              className={pageBtn(p === page)}
              aria-current={p === page ? 'page' : undefined}>
              
              {p}
            </button>
          </span>);

      })}

      <button
        type="button"
        aria-label="Next page"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={pageBtn(false, page === totalPages)}>
        
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>);

}