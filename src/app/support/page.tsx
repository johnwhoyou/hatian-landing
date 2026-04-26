import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support — Hatian",
  description:
    "Need help with Hatian? Reach out to our support team.",
};

export default function Support() {
  return (
    <main className="py-16 px-6">
      <article className="max-w-2xl mx-auto">
        <div className="mb-12">
          <p className="font-body text-sm font-medium text-accent mb-2 tracking-wide uppercase">
            Support
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-text leading-tight">
            Support
          </h1>
        </div>

        <div className="font-body text-text-secondary text-[15px] leading-relaxed">
          <p>
            If you have any questions, issues, or feedback about Hatian,
            we&apos;d love to hear from you. Reach out to us at{" "}
            <a
              href="mailto:support@hatian.app"
              className="text-primary font-medium hover:underline"
            >
              support@hatian.app
            </a>{" "}
            and we&apos;ll get back to you as soon as we can.
          </p>
        </div>
      </article>
    </main>
  );
}
