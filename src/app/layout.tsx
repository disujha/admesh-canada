import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";

export const metadata: Metadata = {
  title: "AdMesh // Canada's Retail Media Infrastructure",
  description: "Programmatic retail media infrastructure connecting brands to local grocery stores, pharmacies, cafes, and convenience networks across Canada.",
  icons: {
    icon: '/favicon.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
