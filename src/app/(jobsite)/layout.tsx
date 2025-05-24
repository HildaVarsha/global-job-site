import { Footer, TopNavbar } from "@/components/shared";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <TopNavbar />
      {children}
      {/* Footer */}
      <Footer />
    </div>
  );
}
