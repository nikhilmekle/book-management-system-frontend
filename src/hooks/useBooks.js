import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchBooks } from '@/services/bookService';
import { useDebounce } from './useDebounce';


const PAGE_SIZE = 8;



export function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortField, setSortField] = useState('title');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchQuery, 350);

  const loadBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchBooks();
      setBooks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {loadBooks();}, [loadBooks]);
  useEffect(() => {setPage(1);}, [debouncedSearch, selectedGenre, sortField, sortDir]);

  const removeBook = useCallback((id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const genres = useMemo(() => {
    const set = new Set(books.map((b) => b.genre).filter(Boolean));
    return ['', ...Array.from(set).sort()];
  }, [books]);

  const filtered = useMemo(() => {
    const q = debouncedSearch.toLowerCase();
    return books.
    filter((b) => {
      const matchSearch =
      !q ||
      b.title?.toLowerCase().includes(q) ||
      b.author?.toLowerCase().includes(q);
      const matchGenre = !selectedGenre || b.genre === selectedGenre;
      return matchSearch && matchGenre;
    }).
    sort((a, b) => {
      const av = sortField === 'publicationYear' ?
      Number(a.publicationYear) :
      (a[sortField] || '').toString().toLowerCase();
      const bv = sortField === 'publicationYear' ?
      Number(b.publicationYear) :
      (b[sortField] || '').toString().toLowerCase();
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [books, debouncedSearch, selectedGenre, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const toggleSort = (field) => {
    if (sortField === field) setSortDir((d) => d === 'asc' ? 'desc' : 'asc');else
    {setSortField(field);setSortDir('asc');}
  };

  return {
    books: paginated,
    totalBooks: filtered.length,
    loading, error, genres,
    searchQuery, setSearchQuery,
    selectedGenre, setSelectedGenre,
    sortField, sortDir, toggleSort,
    page, setPage, totalPages,
    reload: loadBooks, removeBook
  };
}