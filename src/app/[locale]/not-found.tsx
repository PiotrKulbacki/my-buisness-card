import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 py-24 text-center">
      <h1 className="display text-5xl">404</h1>
      <p className="text-[var(--fg-muted)]">Page not found.</p>
      <Link
        href="/"
        className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-[var(--accent-ink)]"
      >
        Home
      </Link>
    </div>
  );
}
