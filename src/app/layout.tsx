import './globals.css';
import './app.scss';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { Metadata } from 'next';
import TRPCProvider from '~/api/TRPCProvider';
import { AppContextProvider } from '~/components/AddDataContext';
import { cookies } from 'next/headers';
import { z } from 'zod';
import NavBar from '~/components/pages/NavBar';
import { getCachedSession } from '~/lib/cache_server_route_data';
import FloatingParticles from '~/components/FloatingParticles';

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getCachedSession();

  return (
    <html lang="en" suppressHydrationWarning className="dark" style={{ colorScheme: 'dark' }}>
      <body
        className={cn(
          'antialiased',
          'overflow-y-scroll bg-black text-white sm:px-2 lg:px-3 xl:px-4 2xl:px-4'
        )}
      >
        <ThemeProvider
          attribute={['class']}
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <TRPCProvider>
            <AppContextProvider initialSession={session}>
              {/* Background with animated gradients */}
              <div className="fixed inset-0 bg-gradient-to-br from-emerald-900/20 via-cyan-900/20 to-green-900/20" />

              {/* Floating particles - Client only to avoid hydration mismatch */}
              <FloatingParticles />
              <div className="relative z-10">
                <NavBar />
                {children}
              </div>
              <Toaster richColors={true} position="bottom-center" />
            </AppContextProvider>
          </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

const getUserInfoFromCookie = async () => {
  const cookieStore = await cookies();
  try {
    const user_ = cookieStore.get('user_info');
    if (!user_) return null;
    const [email, password] = z.tuple([z.string(), z.string()]).parse(user_.value.split(':'));
    return { name: 'Prashant', email };
  } catch (e) {
    return null;
  }
};

// export const runtime = 'edge';

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico'
  }
};
