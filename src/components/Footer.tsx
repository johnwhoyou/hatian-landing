export function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-body text-xs text-text-secondary">
          © {new Date().getFullYear()} Hatian ·{" "}
          <a href="#" className="text-primary hover:underline">
            Privacy
          </a>{" "}
          ·{" "}
          <a href="#" className="text-primary hover:underline">
            Terms
          </a>
        </p>
      </div>
    </footer>
  );
}
