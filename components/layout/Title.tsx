"use client"

export default function Title({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h1 className="text-[20px] font-semibold mb-6">
      {children}
    </h1>
  )
}