import type { Metadata } from 'next';

import { Geist_Mono, Lora, Nunito } from 'next/font/google';

import { ThemeProvider } from '@/components/theme-provider';

import './globals.css';

import { Toaster } from '@/components/ui/sonner';

const nunito = Nunito({
  variable: '--font-sans',
  subsets: ['latin'],
});

const lora = Lora({
  variable: '--font-serif',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Grapevine',
  description: 'The wine companion for MWs, and those in the making.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nunito.variable} ${lora.variable} ${geistMono.variable} antialiased bg-muted`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
