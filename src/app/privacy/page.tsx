import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Hatian",
  description:
    "How Hatian handles your data. Your expense amounts stay on your device and in your private database.",
};

export default function PrivacyPolicy() {
  return (
    <main className="py-16 px-6">
      <article className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="font-body text-sm font-medium text-accent mb-2 tracking-wide uppercase">
            Legal
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-text leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="font-body text-sm text-text-secondary">
            Effective date: April 12, 2026
          </p>
        </div>

        <div className="space-y-10 font-body text-text-secondary text-[15px] leading-relaxed">
          {/* Intro */}
          <section>
            <p>
              Hatian (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
              provides a mobile application for splitting expenses with friends
              and groups. This Privacy Policy explains what information we
              collect, how we use it, and what choices you have.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="font-heading text-xl font-bold text-text mb-3">
              1. Information We Collect
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-body font-semibold text-text mb-1">
                  Account information
                </h3>
                <p>
                  When you create an account, we collect your name, email
                  address, and profile photo (if you choose to provide one). If
                  you sign in through Apple or Google, we receive only the
                  information you authorize those services to share.
                </p>
              </div>
              <div>
                <h3 className="font-body font-semibold text-text mb-1">
                  Expense &amp; financial data
                </h3>
                <p>
                  Hatian lets you log expenses, split bills, and track balances.
                  The amounts, descriptions, and group details you enter are
                  stored in your private database hosted on{" "}
                  <strong className="text-text">Supabase</strong> (our
                  infrastructure provider) and synchronized to your device.{" "}
                  <strong className="text-text">
                    We do not sell, share, or use your financial data for
                    advertising.
                  </strong>
                </p>
              </div>
              <div>
                <h3 className="font-body font-semibold text-text mb-1">
                  Receipt images
                </h3>
                <p>
                  If you use the receipt-scanning feature, images are processed
                  to extract item names and amounts. Receipt images are not
                  stored on our servers after processing is complete.
                </p>
              </div>
              <div>
                <h3 className="font-body font-semibold text-text mb-1">
                  Usage data
                </h3>
                <p>
                  We collect anonymous, aggregated usage data (e.g., which
                  features are used most) to improve the app. This data cannot
                  be used to identify you personally.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="font-heading text-xl font-bold text-text mb-3">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To provide and maintain the Hatian service</li>
              <li>
                To sync your expense data across your devices and with group
                members you choose to share with
              </li>
              <li>To process receipts for automatic bill-splitting</li>
              <li>To send payment reminders you have opted into</li>
              <li>To improve app performance and fix bugs</li>
            </ul>
            <p className="mt-4">
              We do <strong className="text-text">not</strong> use your data for
              targeted advertising, profiling, or sale to third parties.
            </p>
          </section>

          {/* Data Storage & Security */}
          <section>
            <h2 className="font-heading text-xl font-bold text-text mb-3">
              3. Data Storage &amp; Security
            </h2>
            <p>
              Your expense data is stored in a secure{" "}
              <strong className="text-text">Supabase</strong> database with
              row-level security enabled. Data is encrypted in transit (TLS) and
              at rest. Only you and the group members you explicitly invite can
              access your shared expenses.
            </p>
            <p className="mt-3">
              Certain data (such as cached expense amounts) may also reside
              on-device for offline access. This data never leaves your device
              except to sync with our database.
            </p>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="font-heading text-xl font-bold text-text mb-3">
              4. Third-Party Services
            </h2>
            <p className="mb-3">
              We use the following third-party services to operate Hatian:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-text">Supabase</strong> — database
                hosting, authentication, and file storage
              </li>
              <li>
                <strong className="text-text">Apple Sign In / Google Sign In</strong>{" "}
                — optional authentication providers
              </li>
            </ul>
            <p className="mt-3">
              Each of these services has its own privacy policy governing how
              they handle data. We encourage you to review them.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="font-heading text-xl font-bold text-text mb-3">
              5. Your Rights
            </h2>
            <p>You can, at any time:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong className="text-text">Access</strong> your data through
                the app
              </li>
              <li>
                <strong className="text-text">Export</strong> your expense
                history
              </li>
              <li>
                <strong className="text-text">Delete</strong> your account and
                all associated data by contacting us or using the in-app option
              </li>
            </ul>
            <p className="mt-3">
              Upon account deletion, all your personal data and expense records
              are permanently removed from our systems within 30 days.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="font-heading text-xl font-bold text-text mb-3">
              6. Children&apos;s Privacy
            </h2>
            <p>
              Hatian is not intended for children under the age of 13. We do not
              knowingly collect personal information from children. If you
              believe a child has provided us with personal data, please contact
              us so we can remove it.
            </p>
          </section>

          {/* Changes to This Policy */}
          <section>
            <h2 className="font-heading text-xl font-bold text-text mb-3">
              7. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. If we make
              significant changes, we will notify you through the app or by
              email. Continued use of Hatian after changes constitutes acceptance
              of the updated policy.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="font-heading text-xl font-bold text-text mb-3">
              8. Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy or your data,
              reach out at{" "}
              <a
                href="mailto:privacy@hatian.app"
                className="text-primary font-medium hover:underline"
              >
                privacy@hatian.app
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
