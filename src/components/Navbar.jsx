import { Link, NavLink } from "react-router-dom";
import { BookOpen, Moon, Sun, Plus } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [dark, toggleDark] = useDarkMode();

  return (
    <header className="sticky top-0 z-40 bg-card/90 backdrop-blur-md border-b border-border">
      <nav className="max-w-[1200px] mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 text-amber">
          <BookOpen className="h-[22px] w-[22px]" />
          <span className="font-serif font-bold text-xl text-text tracking-tight">
            Book Management System
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              cn(
                "font-medium text-sm px-3 py-1.5 rounded-md transition-colors hover:text-amber",
                isActive ? "text-amber bg-amber/10" : "text-muted",
              )
            }
          >
            Library
          </NavLink>

          <Link
            to="/add"
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-amber hover:bg-amber-dark text-white text-sm font-semibold rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden xs:inline sm:inline">Add Book</span>
          </Link>

          <Button
            variant="icon"
            size="icon"
            onClick={toggleDark}
            aria-label="Toggle dark mode"
          >
            {dark ? (
              <Sun className="h-[18px] w-[18px]" />
            ) : (
              <Moon className="h-[18px] w-[18px]" />
            )}
          </Button>
        </div>
      </nav>
    </header>
  );
}
