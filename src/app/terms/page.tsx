import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Hatian",
  description:
    "Terms of Service for Hatian, the expense-splitting app for your barkada.",
};

export default function TermsOfService() {
  return (
    <main className="py-16 px-6">
      <article className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="font-body text-sm font-medium text-accent mb-2 tracking-wide uppercase">
            Legal
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-text leading-tight mb-4">
            Terms of Service
          </h1>
          <p className="font-body text-sm text-text-secondary">
            Effective date: April 12, 2026
          </p>
        </div>

        <div className="space-y-10 font-body text-text-secondary text-[15px] leading-relaxed">
          {/* Intro */}
          <section>
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your use of
              the Hatian mobile application and website (collectively, the
              &ldquo;Service&rdquo;) operated by Hatian (&ldquo;we,&rdquo;
              &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing or using
              the Service, you agree to be bound by these Terms.
            </p>
          </section>

          {/* The Service */}
          <section>
            <h2 className="font-heading text-xl font-bold text-text mb-3">
              1. The Service
            </h2>
            <p>
              Hatian is an expense-splitting application that helps you track
              shared expenses, split bills, and settle balances with friends and
              groups. Hatian is a{" "}
              <strong className="text-text">record-keeping tool</strong> — it
              does not process payments, transfer funds, or act as a financial
              institution.
            </p>
          </section>

          {/* Accounts */}
          <section>
            <h2 className="font-heading text-xl font-bold text-text mb-3">
              2. Accounts
            </h2>
            <p>
              You must create an account to use Hatian. You are responsible for
              maintaining the security of your account credentials and for all
              activity that occurs under your account. You agree to provide
              accurate information and to update it as needed.
            </p>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="font-heading text-xl font-bold text-text mb-3">
              3. Acceptable Use
            </h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Use the Service for any unlawful purpose or to record fraudulent
                transactions
              </li>
              <li>
                Attempt to access another user&apos;s account or data without
                authorization
              </li>
              <li>
                Interfere with or disrupt the Service or its underlying
                infrastructure
              </li>
              <li>
                Reverse-engineer, decompile, or otherwise attempt to extract the
                source code of the application
              </li>
              <li>
                Upload malicious content, including through receipt images or
                profile data
              </li>
            </ul>
          </section>

          {/* User Content */}
          <section>
            <h2 className="font-heading text-xl font-bold text-text mb-3">
              4. User Content
            </h2>
            <p>
              You retain ownership of the data you enter into Hatian, including
              expense descriptions, amounts, and receipt images. By using the
              Service, you grant us a limited license to store and process this
              data solely for the purpose of providing the Service to you and
              your groups.
            </p>
          </section>

          {/* Pricing */}
          <section>
            <h2 className="font-heading text-xl font-bold text-text mb-3">
              5. Pricing
            </h2>
            <p>
              Hatian is currently free to use with no ads and no subscriptions.
              If we introduce paid features in the future, they will be clearly
              communicated and will never be required for core expense-splitting
              functionality.
            </p>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="font-heading text-xl font-bold text-text mb-3">
              6. Disclaimers
            </h2>
            <p>
              The Service is provided &ldquo;as is&rdquo; and &ldquo;as
              available&rdquo; without warranties of any kind, whether express or
              implied. We do not guarantee that the Service will be
              uninterrupted, error-free, or secure at all times.
            </p>
            <p className="mt-3">
              Hatian is a record-keeping tool, not financial advice. We are not
              responsible for disputes between users over expense amounts,
              payments, or settlements.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="font-heading text-xl font-bold text-text mb-3">
              7. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, Hatian shall not be liable
              for any indirect, incidental, special, consequential, or punitive
              damages, or any loss of data, profits, or goodwill arising out of
              your use of the Service. Our total liability for any claim shall
              not exceed the amount you paid us in the twelve months prior to the
              claim (which, while the Service is free, is zero).
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="font-heading text-xl font-bold text-text mb-3">
              8. Termination
            </h2>
            <p>
              You may stop using Hatian and delete your account at any time. We
              may suspend or terminate your access if you violate these Terms. On
              termination, your data will be deleted in accordance with our{" "}
              <a
                href="/privacy"
                className="text-primary font-medium hover:underline"
              >
                Privacy Policy
              </a>
              .
            </p>
          </section>

          {/* Changes to These Terms */}
          <section>
            <h2 className="font-heading text-xl font-bold text-text mb-3">
              9. Changes to These Terms
            </h2>
            <p>
              We may update these Terms from time to time. If we make material
              changes, we will notify you through the app or by email. Continued
              use of the Service after changes constitutes acceptance of the
              updated Terms.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="font-heading text-xl font-bold text-text mb-3">
              10. Governing Law
            </h2>
            <p>
              These Terms are governed by and construed in accordance with the
              laws of the Republic of the Philippines, without regard to
              conflict-of-law principles.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="font-heading text-xl font-bold text-text mb-3">
              11. Contact Us
            </h2>
            <p>
              If you have questions about these Terms, reach out at{" "}
              <a
                href="mailto:support@hatian.app"
                className="text-primary font-medium hover:underline"
              >
                support@hatian.app
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
