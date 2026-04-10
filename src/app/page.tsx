export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="text-center pt-20 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          {/* App icon */}
          <div className="w-[72px] h-[72px] rounded-[20px] bg-gradient-to-br from-accent to-primary mx-auto mb-6 flex items-center justify-center shadow-lg">
            <span className="text-4xl">🦅</span>
          </div>

          <h1 className="font-heading text-5xl md:text-6xl font-extrabold text-text leading-tight mb-4">
            Split expenses.
            <br />
            Keep friends.
          </h1>

          <p className="font-body text-lg text-text-secondary mb-8 max-w-md mx-auto">
            The easiest way to split bills with your barkada.
          </p>

          {/* Store buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-3" id="download">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-text text-background px-7 py-3.5 rounded-xl text-base font-body font-semibold hover:opacity-90 transition-opacity"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.97 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
              </svg>
              App Store
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-text text-background px-7 py-3.5 rounded-xl text-base font-body font-semibold hover:opacity-90 transition-opacity"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.53 12.9 20.18 13.18L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" />
              </svg>
              Google Play
            </a>
          </div>

          <p className="font-body text-sm text-text-secondary">
            Free · No ads · No subscriptions
          </p>
        </div>
      </section>

      {/* Phone Mockup Placeholder */}
      <section className="pb-16 px-6">
        <div className="max-w-xs mx-auto">
          <div className="bg-card rounded-[2.5rem] border-2 border-border p-4 shadow-sm">
            <div className="bg-surface rounded-[2rem] min-h-[420px] flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-3">
                <span className="text-2xl">📱</span>
              </div>
              <p className="font-body text-sm text-text-secondary">
                App screenshot
              </p>
              <p className="font-body text-xs text-accent mt-1">
                Coming soon
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: "📷",
              title: "Receipt Scanning",
              description: "Snap a receipt, auto-split the items.",
            },
            {
              icon: "👥",
              title: "Group Expenses",
              description: "Track balances across trips & roommates.",
            },
            {
              icon: "💸",
              title: "Easy Settlements",
              description: "Settle up with proof in one tap.",
            },
            {
              icon: "🔔",
              title: "Payment Reminders",
              description: "Gentle nudges so you don't have to ask.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-card rounded-2xl p-8 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="font-heading text-base font-bold text-text mb-1">
                {feature.title}
              </h3>
              <p className="font-body text-sm text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text leading-tight mb-3">
            No more awkward
            <br />
            &ldquo;you owe me&rdquo; texts.
          </h2>
          <p className="font-body text-base text-text-secondary mb-8">
            Free forever. No ads. No subscriptions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-text text-background px-7 py-3.5 rounded-xl text-base font-body font-semibold hover:opacity-90 transition-opacity"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.97 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
              </svg>
              App Store
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-text text-background px-7 py-3.5 rounded-xl text-base font-body font-semibold hover:opacity-90 transition-opacity"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.53 12.9 20.18 13.18L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" />
              </svg>
              Google Play
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
