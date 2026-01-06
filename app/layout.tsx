import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RideWire AI Hub',
  description: 'AI-powered social network with diagnostic garage',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">
        <div className="min-h-screen flex flex-col">
          <header className="bg-slate-900 border-b border-slate-800 p-4">
            <h1 className="text-2xl font-bold text-cyan-400">⚡ RideWire AI Hub</h1>
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
