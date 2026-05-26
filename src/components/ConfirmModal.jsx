import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';

export default function ConfirmModal({ book, onConfirm, onCancel, isLoading }) {
  useEffect(() => {
    const handler = (e) => {if (e.key === 'Escape') onCancel();};
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onCancel}>
      
      <Card
        className="max-w-md w-full p-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title">
        
        <div className="h-14 w-14 rounded-full bg-rust/10 text-rust flex items-center justify-center mb-5">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h2 id="modal-title" className="font-serif text-xl font-bold text-text mb-2">
          Delete Book?
        </h2>
        <p className="text-muted leading-relaxed mb-7">
          Are you sure you want to remove{' '}
          <strong className="text-text">"{book?.title}"</strong> by{' '}
          <strong className="text-text">{book?.author}</strong>?
          This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onCancel} className="flex-1">Cancel</Button>
          <Button variant="danger" onClick={onConfirm} disabled={isLoading} className="flex-1">
            {isLoading ? 'Deleting…' : 'Yes, Delete'}
          </Button>
        </div>
      </Card>
    </div>);

}