// app/layout.tsx
export const metadata = {
  title: "To-Do App",
  description: "A simple todo application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 p-8">{children}</body>
    </html>
  );
}
