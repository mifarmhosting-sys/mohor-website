import './admin.css';

export const metadata = {
  title: 'MOHOR Dashboard',
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }) {
  return <div className="adm">{children}</div>;
}
