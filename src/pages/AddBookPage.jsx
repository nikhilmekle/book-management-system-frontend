import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'lucide-react';
import { createBook } from '@/services/bookService';
import BookForm from '@/components/BookForm';
import { Card } from '@/components/common/Card';

export default function AddBookPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data) => {
    setIsLoading(true);
    try {
      await createBook({ ...data, publicationYear: Number(data.publicationYear) });
      toast.success(`"${data.title}" added to your library!`);
      navigate('/');
    } catch (err) {
      toast.error(`Failed to add book: ${err instanceof Error ? err.message : 'unknown'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-bg">
      <div className="max-w-[680px] mx-auto px-4 sm:px-6 pt-8 pb-16">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-muted hover:text-amber text-sm font-medium mb-7 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Library
        </Link>

        <div className="animate-in fade-in duration-300">
          <header className="mb-8">
            <h1 className="font-serif font-black text-text mb-1.5 text-2xl sm:text-3xl md:text-4xl">
              Add a New <span className="gradient-text">Book</span>
            </h1>
            <p className="text-muted">Fill in the details below to add a book to your library.</p>
          </header>

          <Card className="p-8">
            <BookForm onSubmit={handleSubmit} isLoading={isLoading} submitLabel="Add to Library" />
          </Card>
        </div>
      </div>
    </div>
  );
}
