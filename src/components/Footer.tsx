import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-body text-xs text-text-secondary">
          © {new Date().getFullYear()} Hatian ·{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy
          </Link>{" "}
          ·{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms
          </Link>
        </p>
      </div>
    </footer>
  );
}
