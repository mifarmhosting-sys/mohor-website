export default function SiteLayout({ children }) {
  return (
    <>
      <link rel="stylesheet" href="/styles.css" precedence="default" />
      {children}
    </>
  );
}
