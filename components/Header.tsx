
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="w-full border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* 左：ロゴ */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/btc-insight-header.png" // ロゴ画像パス
            alt="BTCインサイト"
            width={192}
            height={192}
          />
        </Link>

        {/* 右：ナビゲーション */}
        <nav className="flex space-x-6 text-purple-700 text-sm sm:text-base font-medium">
          <Link href="/">ホーム</Link>
          <Link href="/blog">ブログ</Link>
          <Link href="https://diamondhandscommunity.substack.com" target="_blank" rel="noopener noreferrer">後援</Link>
          <Link href="https://diamondhandscommunity.substack.com/t/btc-insight" target="_blank" rel="noopener noreferrer">ニュースレター</Link>
        </nav>

      </div>
    </header>
  )
}
