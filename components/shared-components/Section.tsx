interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-white text-lg font-semibold">{title}</h2>

      {children}
    </section>
  );
}