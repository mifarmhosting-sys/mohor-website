export const metadata = {
  title: 'MOHOR - Special Education & Rehabilitation Centre',
  description:
    'We provide a loving and supportive place for children with special needs to thrive through family support, therapy, and education.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
