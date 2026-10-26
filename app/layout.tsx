import type { Metadata } from "next";
import "./globals.css";
import "./sections.css";

export const metadata: Metadata = {
  title: "Alpha Core Solution | Your Digital Service Partner",
  description: "PT. Alpha Core Solution menyediakan layanan IT, network managed service, facility management, manpower supply, project management, dan procurement untuk bisnis di Indonesia.",
  keywords: ["Alpha Core Solution", "layanan IT Indonesia", "networking", "data center", "network managed service", "facility management", "manpower supply", "Bogor"],
  openGraph: {
    title: "Alpha Core Solution — Your Digital Service Partner",
    description: "Solusi teknologi yang efisien, aman, dan sesuai kebutuhan untuk bisnis yang terus bergerak.",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
