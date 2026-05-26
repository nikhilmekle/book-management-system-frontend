import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';








export default function SortBar({ sortField, sortDir, toggleSort, total }) {
  const Btn = ({ field, label }) => {
    const active = sortField === field;
    return (
      <button
        type="button"
        onClick={() => toggleSort(field)}
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border-[1.5px] font-sans font-semibold text-[0.8125rem] transition-all',
          active ?
          'border-amber bg-amber/10 text-amber' :
          'border-border bg-transparent text-muted hover:text-amber hover:border-amber'
        )}>
        
        {label}
        {active && (sortDir === 'asc' ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />)}
      </button>);

  };

  return (
    <div className="flex items-center justify-between flex-wrap gap-3">
      <p className="text-muted text-sm">
        <strong className="text-text">{total}</strong> {total === 1 ? 'book' : 'books'} found
      </p>
      <div className="flex gap-2 items-center">
        <span className="text-muted text-[0.8125rem]">Sort:</span>
        <Btn field="title" label="Title" />
        <Btn field="publicationYear" label="Year" />
      </div>
    </div>);

}