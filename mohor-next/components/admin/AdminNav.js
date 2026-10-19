'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNav({ items }) {
  const pathname = usePathname();
  return (
    <nav className="adm-nav">
      {items.map((item) => {
        const on = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href} className={on ? 'on' : ''}>
            {item.label}
            {item.badge ? <span className="adm-badge">{item.badge}</span> : null}
          </Link>
        );
      })}
    </nav>
  );
}
