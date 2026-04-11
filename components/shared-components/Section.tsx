import Title from "../layout/Title";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="space-y-4">
      <Title>{title}</Title>

      {children}
    </section>
  );
}