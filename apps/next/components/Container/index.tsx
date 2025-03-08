export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}) {
  return (
    <div
      className={`${className} mx-auto px-4 sm:px-6 md:px-8 xl:max-w-[1700px]`}
    >
      {children}
    </div>
  );
}
