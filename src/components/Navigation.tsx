import Image from "next/image";
import Link from "next/link";

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/hatian.png"
            alt="Hatian logo"
            width={32}
            height={32}
            className="w-8 h-8 rounded-lg"
          />
          <span className="font-heading text-lg font-bold text-text">
            Hatian
          </span>
        </Link>
        <a
          href="#download"
          className="bg-text text-background px-6 py-2 rounded-full text-sm font-body font-semibold hover:opacity-90 transition-opacity"
        >
          Download
        </a>
      </div>
    </nav>
  );
}
