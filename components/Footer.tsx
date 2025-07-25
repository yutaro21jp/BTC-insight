
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} BTCインサイト. All rights reserved.
          </div>
          <nav className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/" className="text-gray-500 hover:text-gray-900">ホーム</Link>
            <Link href="/blog" className="text-gray-500 hover:text-gray-900">ブログ</Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900">クイズ</Link>
            <Link href="https://diamondhandscommunity.substack.com/t/btc-insight" className="text-gray-500 hover:text-gray-900" target="_blank" rel="noopener noreferrer">ニュースレター</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
