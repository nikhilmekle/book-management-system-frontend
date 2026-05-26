import { Link } from 'react-router-dom';
import { Library, Plus } from 'lucide-react';

export default function EmptyState({ hasFilters }) {
  return (
    <div className="text-center py-20 px-8 animate-in fade-in duration-500">
      <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-amber/10 text-amber mb-6">
        <Library className="h-10 w-10" />
      </div>
      <h3 className="font-serif text-2xl font-bold text-text mb-2">
        {hasFilters ? 'No books match your filters' : 'Your library is empty'}
      </h3>
      <p className="text-muted max-w-sm mx-auto mb-8">
        {hasFilters ?
        'Try adjusting your search or genre filter to find books.' :
        'Start building your collection by adding your first book.'}
      </p>
      {!hasFilters &&
      <Link
        to="/add"
        className="inline-flex items-center gap-2 h-10 px-6 bg-amber text-white font-semibold rounded-lg hover:bg-amber-dark transition-colors">
        
          <Plus className="h-4 w-4" /> Add Your First Book
        </Link>
      }
    </div>);

}