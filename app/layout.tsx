import './globals.css';

export const metadata = {
  title: 'BTCインサイト',
  description: 'ビットコインの最新ニュースを日本語で、わかりやすく。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}