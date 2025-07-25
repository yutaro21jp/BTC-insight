import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'BTCインサイト',
  description: 'ビットコインの最新ニュースを日本語で、わかりやすく。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="max-w-7xl mx-auto px-4">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
