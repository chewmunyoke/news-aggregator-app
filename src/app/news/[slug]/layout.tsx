import Header from './header';

export default function NewsLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { slug: string };
}>) {
  const category = params.slug;

  return (
    <>
      <Header currentCategory={category} />
      {children}
    </>
  );
}
