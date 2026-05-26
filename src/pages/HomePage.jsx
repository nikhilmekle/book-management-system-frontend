import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useBooks } from '@/hooks/useBooks';
import { deleteBook } from '@/services/bookService';
import BookCard from '@/components/BookCard';
import SearchBar from '@/components/SearchBar';
import GenreFilter from '@/components/GenreFilter';
import Loader from '@/components/Loader';
import EmptyState from '@/components/EmptyState';
import ConfirmModal from '@/components/ConfirmModal';
import Pagination from '@/components/Pagination';
import SortBar from '@/components/SortBar';
import { Card } from '@/components/common/Card';

export default function HomePage() {
  const {
    books, totalBooks, loading, error, genres,
    searchQuery, setSearchQuery,
    selectedGenre, setSelectedGenre,
    sortField, sortDir, toggleSort,
    page, setPage, totalPages, removeBook,
  } = useBooks();

  const [bookToDelete, setBookToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const hasFilters = !!(searchQuery || selectedGenre);
  const handleDeleteClick = useCallback((b) => setBookToDelete(b), []);
  const handleCancelDelete = useCallback(() => setBookToDelete(null), []);

  const handleConfirmDelete = async () => {
    if (!bookToDelete) return;
    setDeleting(true);
    try {
      await deleteBook(bookToDelete.id);
      removeBook(bookToDelete.id);
      toast.success(`"${bookToDelete.title}" removed from your library.`);
      setBookToDelete(null);
    } catch (err) {
      toast.error(`Failed to delete: ${err instanceof Error ? err.message : 'unknown'}`);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="page-bg">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-8 pb-16">
        <header className="mb-8 animate-in fade-in slide-in-from-top-2 duration-500">
          <h1 className="font-serif font-black text-text leading-tight mb-1.5 text-3xl sm:text-4xl md:text-[2.75rem]">
            Your <span className="gradient-text">Library</span>
          </h1>
          <p className="text-muted">Manage, search, and organise your book collection.</p>
        </header>

        <div className="flex flex-wrap gap-3 mb-6">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <GenreFilter genres={genres} value={selectedGenre} onChange={setSelectedGenre} />
        </div>

        {!loading && !error && (
          <div className="mb-5">
            <SortBar sortField={sortField} sortDir={sortDir} toggleSort={toggleSort} total={totalBooks} />
          </div>
        )}

        {loading && <Loader />}

        {!loading && error && (
          <Card className="p-10 text-center border-l-4 border-l-rust">
            <p className="text-rust font-semibold mb-2">Failed to load books</p>
            <p className="text-muted text-sm">{error}</p>
          </Card>
        )}

        {!loading && !error && books.length === 0 && <EmptyState hasFilters={hasFilters} />}

        {!loading && !error && books.length > 0 && (
          <>
            <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
              {books.map((book) => (
                <BookCard key={book.id} book={book} onDeleteClick={handleDeleteClick} />
              ))}
            </div>
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}
      </div>

      {bookToDelete && (
        <ConfirmModal
          book={bookToDelete}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          isLoading={deleting}
        />
      )}
    </div>
  );
}
