import Link from 'next/link';

const footerLinks = {
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Content: [
    { label: 'Movies', href: '/movies' },
    { label: 'Series', href: '/series' },
    { label: 'Live Sports', href: '/sports' },
    { label: 'Browse All', href: '/browse' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Devices', href: '#' },
    { label: 'Accessibility', href: '#' },
    { label: 'Cookie Preferences', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'DMCA', href: '#' },
    { label: 'Refund Policy', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/[0.06] bg-surface">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(91,128,255,0.05),_transparent_60%)] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10">
        {/* Top Row */}
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-block h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 via-violet-500 to-fuchsia-500" />
              <span className="text-xl font-bold text-white">
                Kado<span className="bg-gradient-to-r from-blue-400 to-fuchsia-400 bg-clip-text text-transparent">TV</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Premium streaming for sports, movies, and series. Watch anywhere, on any device.
            </p>
            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {['Twitter', 'Instagram', 'YouTube', 'TikTok'].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-slate-400 transition hover:bg-white/10 hover:text-white"
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{section}</p>
                <ul className="space-y-3">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link href={href} className="text-sm text-slate-400 transition hover:text-white">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom Row */}
        <div className="mt-8 flex flex-col items-center gap-4 text-center text-sm text-slate-500 sm:flex-row sm:justify-between sm:text-left">
          <p>© 2026 KadoTV. All rights reserved.</p>
          <p>Made with ❤️ for premium streamers worldwide.</p>
        </div>
      </div>
    </footer>
  );
}
