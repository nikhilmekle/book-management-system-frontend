import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'lucide-react';
import { fetchBookById, updateBook } from '@/services/bookService';
import BookForm from '@/components/BookForm';
import { Card } from '@/components/common/Card';

export default function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await fetchBookById(id);
        if (alive) setBook(data);
      } catch (err) {
        if (alive) setFetchError(err instanceof Error ? err.message : 'Failed');
      } finally {
        if (alive) setFetchLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [id]);

  const handleSubmit = async (data) => {
    setIsLoading(true);
    try {
      await updateBook(id, { ...data, publicationYear: Number(data.publicationYear) });
      toast.success(`"${data.title}" updated successfully!`);
      navigate('/');
    } catch (err) {
      toast.error(`Failed to update: ${err instanceof Error ? err.message : 'unknown'}`);
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
              Edit <span className="gradient-text">Book</span>
            </h1>
            <p className="text-muted">Update the details for this book.</p>
          </header>

          {fetchLoading && (
            <Card className="p-8 space-y-5">
              {[80, 55, 65, 40].map((w, i) => (
                <div key={i} className="skeleton h-[18px]" style={{ width: `${w}%` }} />
              ))}
            </Card>
          )}

          {!fetchLoading && fetchError && (
            <Card className="p-8 border-l-4 border-l-rust">
              <p className="text-rust font-semibold">Book not found</p>
              <p className="text-muted text-sm mt-1">{fetchError}</p>
            </Card>
          )}

          {!fetchLoading && book && (
            <Card className="p-8">
              <BookForm
                defaultValues={{
                  title: book.title,
                  author: book.author,
                  genre: book.genre,
                  publicationYear: book.publicationYear,
                }}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                submitLabel="Save Changes"
              />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
