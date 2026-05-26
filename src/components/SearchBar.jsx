import { Search, X } from 'lucide-react';
import { Input } from '@/components/common/Field';






export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative flex-1 min-w-[240px]">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
      <Input
        type="text"
        placeholder="Search by title or author…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search books"
        className={value ? 'pl-10 pr-10' : 'pl-10'} />
      
      {value &&
      <button
        type="button"
        onClick={() => onChange('')}
        aria-label="Clear search"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text p-0.5 rounded transition-colors">
        
          <X className="h-3.5 w-3.5" />
        </button>
      }
    </div>);

}