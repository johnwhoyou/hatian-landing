import Link from "next/link";

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white text-sm font-bold">
            <span className="m-auto">H</span>
          </div>
          <span className="font-heading text-lg font-bold text-text">
            Hatian
          </span>
        </Link>
        <a
          href="#download"
          className="bg-text text-background px-5 py-2 rounded-lg text-sm font-body font-semibold hover:opacity-90 transition-opacity"
        >
          Download
        </a>
      </div>
    </nav>
  );
}
