export default function Main({
  children,
  withPadding = true,
}: {
  children: React.ReactNode | React.ReactNode[];
  withPadding?: boolean;
}) {
  return (
    <main
      className={`min-h-screen ${withPadding ? "pt-[120px] md:pt-[180px]" : ""}`}
    >
      {children}
    </main>
  );
}
