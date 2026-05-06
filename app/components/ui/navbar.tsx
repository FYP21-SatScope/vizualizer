'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const tabs = [
    { label: 'Map', href: '/map' },
    { label: 'Dashboard', href: '/dashboard' },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-3 flex gap-4">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`px-4 py-2 rounded font-medium transition-colors ${
            pathname.startsWith(tab.href)
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}