import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { dark} from '@clerk/themes';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Short-ly',
  description: 'A URL shortener built with Next.js',
   icons: {
    icon:"/favicon.svg"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: [dark],
        variables: {
          colorPrimary: 'white',
          colorText: '#ffffff',
        },
      }}
    >
      <html lang="en" suppressHydrationWarning={true}>
        <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className=" min-h-screen w-full flex items-start justify-center">
              <Toaster position="top-center" reverseOrder={false} />
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
