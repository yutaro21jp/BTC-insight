import './globals.css';

export const metadata = {
  title: 'BTCインサイト',
  description: 'ビットコインの最新ニュースを日本語で、わかりやすく。',
  icons: {
    icon: '/btc-insight-logo.png',
  },
  openGraph: {
    title: 'BTCインサイト | ビットコインの最新ニュースを、日本語で、わかりやすく。',
    description: 'ビットコインの最新ニュースを日本語で、わかりやすく。',
    url: process.env.NEXT_PUBLIC_BASE_URL || '/',
    siteName: 'BTCインサイト',
    images: [
      {
        url: '/btc-insight-logo.png',
        width: 800,
        height: 600,
        alt: 'BTCインサイト ロゴ',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BTCインサイト | ビットコインの最新ニュースを、日本語で、わかりやすく。',
    description: 'ビットコインの最新ニュースを日本語で、わかりやすく。',
    images: ['/btc-insight-logo.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}