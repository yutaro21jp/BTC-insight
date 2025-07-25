
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'BTCインサイト',
  description: 'ビットコインの最新ニュースを日本語で、わかりやすく。',
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4">{children}</main>
      <Footer />
    </>
  );
}