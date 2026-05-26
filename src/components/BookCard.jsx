import { Link } from "react-router-dom";
import { Pencil, Trash2, Calendar, User } from "lucide-react";
import { genreColor } from "@/utils/genres";
import { Card } from "@/components/common/Card";

export default function BookCard({ book, onDeleteClick }) {
  const color = genreColor(book.genre);

  return (
    <Card className="relative overflow-hidden group transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_var(--shadow)] animate-in fade-in duration-300">
      <span
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-1 group-hover:w-1.5 transition-all rounded-l"
        style={{ background: "var(--amber)" }}
      />

      <div className="p-5 pl-6">
        <span
          className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 border"
          style={{
            background: `${color}18`,
            color,
            borderColor: `${color}30`,
          }}
        >
          {book.genre || "Uncategorised"}
        </span>

        <h3 className="font-serif text-lg font-bold text-text leading-tight mb-2 line-clamp-2">
          {book.title}
        </h3>

        <p className="flex items-center gap-1.5 text-muted text-sm mb-1.5">
          <User className="h-3.5 w-3.5" /> {book.author}
        </p>
        <p className="flex items-center gap-1.5 text-muted text-xs">
          <Calendar className="h-3.5 w-3.5" /> {book.publicationYear}
        </p>

        <div className="flex gap-2 mt-4 pt-4 border-t border-border">
          <Link
            to={`/edit/${book.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 px-3.5 py-2 bg-amber/10 text-amber rounded-md text-[0.8125rem] font-semibold hover:bg-amber/20 transition-colors"
          >
            <Pencil className="h-3.5 w-3.5" /> Edit
          </Link>
          <button
            type="button"
            onClick={() => onDeleteClick(book)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3.5 py-2 bg-rust/10 text-rust rounded-md text-[0.8125rem] font-semibold hover:bg-rust/20 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </button>
        </div>
      </div>
    </Card>
  );
}
