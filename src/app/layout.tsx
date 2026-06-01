import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AnalyticsTracker } from "@/components/providers/analytics-tracker";
import { getSiteSettings } from "@/lib/cms/fetch";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans-fallback",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-fallback",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: {
      default: settings.brandName,
      template: `%s | ${settings.brandName}`,
    },
    description:
      settings.tagline ??
      "Premium digital growth ecosystem for branding, development, marketing, and AI automation.",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AnalyticsTracker />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
