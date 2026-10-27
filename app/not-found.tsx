import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 bg-charcoal text-soft-white">
      <span className="text-xs uppercase tracking-[0.25em] text-[#F3DFA2] font-semibold mb-3">
        404 — Page Not Found
      </span>
      <h1 className="font-serif text-4xl sm:text-5xl text-soft-white mb-4">
        Looking for a property or page?
      </h1>
      <p className="text-stone-gray max-w-md text-sm leading-relaxed mb-8">
        The page you are looking for may have moved or no longer exists. Let&apos;s get you back to the home page or connect directly.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-[#F3DFA2] text-charcoal text-xs font-semibold tracking-wider uppercase hover:bg-[#E4C878] transition-colors rounded-[2px]"
        >
          Return Home
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 border border-hairline text-soft-white text-xs font-medium tracking-wider uppercase hover:border-[#F3DFA2] hover:text-[#F3DFA2] transition-colors rounded-[2px]"
        >
          Contact Careme
        </Link>
      </div>
    </div>
  );
}
