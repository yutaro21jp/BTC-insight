
'use client'

import { useState } from 'react'

const timelineData = [
  {
    year: '2008',
    events: [
      {
        title: 'Satoshi Nakamotoが論文を発表',
        description: 'ビットコインの基本的な仕組みを記述した論文「Bitcoin: A Peer-to-Peer Electronic Cash System」が公開される。',
      },
    ],
  },
  {
    year: '2009',
    events: [
      {
        title: 'ジェネシスブロックが生成される',
        description: 'ビットコインの最初のブロック（ジェネシスブロック）が生成され、ネットワークが稼働を開始する。',
      },
    ],
  },
  {
    year: '2010',
    events: [
      {
        title: '初のビットコイン取引',
        description: 'プログラマーのラズロ・ハニエツが、1万BTCで2枚のピザを購入。これが記録上初のビットコインによる商取引とされる。',
      },
    ],
  },
  {
    year: '2011',
    events: [
      {
        title: '競合の暗号資産が登場',
        description: 'ビットコインのオープンソースコードを基にした、他の暗号資産（アルトコイン）が登場し始める。',
      },
      {
        title: 'WikiLeaksがビットコインでの寄付受付を開始',
        description: '内部告発サイトWikiLeaksが、ビットコインでの寄付受け入れを開始し、注目を集める。',
      },
    ],
  },
  {
    year: '2012',
    events: [
      {
        title: '初の半減期',
        description: 'マイニング報酬が50BTCから25BTCに半減する、初の「半減期」を迎える。',
      },
    ],
  },
  {
    year: '2013',
    events: [
      {
        title: '価格が1,000ドルを突破',
        description: 'キプロス危機などを背景にビットコインへの注目が高まり、価格が初めて1,000ドルを突破する。',
      },
    ],
  },
  {
    year: '2014',
    events: [
      {
        title: 'マウントゴックス社の破綻',
        description: '当時世界最大級の取引所であったマウントゴックス社が、ハッキングにより大量のビットコインを失い破綻。市場に大きな打撃を与える。',
      },
    ],
  },
  {
    year: '2017',
    events: [
      {
        title: 'ビットコイン独立記念日',
        description: '2017年8月1日、ブロックサイズ戦争の末にSegWitが有効化され、ビットコインの分散性と独立性が守られた日。多くのビットコイナーがこの日を「ビットコイン独立記念日」と呼ぶ。',
      },
      {
        title: '価格が2万ドルに迫る',
        description: '暗号資産市場全体が盛り上がりを見せ、ビットコイン価格は年末に2万ドルに迫る勢いで高騰する。',
      },
    ],
  },
  {
    year: '2020',
    events: [
      {
        title: 'コロナショックと金融緩和',
        description: '新型コロナウイルスのパンデミックによる経済の不確実性と、各国の中央銀行による大規模な金融緩和を背景に、価値の保存手段としてビットコインが注目される。',
      },
    ],
  },
  {
    year: '2021',
    events: [
      {
        title: 'エルサルバドルが法定通貨に採用',
        description: 'エルサルバドルが、世界で初めてビットコインを法定通貨として採用する。',
      },
      {
        title: '価格が史上最高値を更新',
        description: '機関投資家の参入などが進み、4月には価格が64,000ドルを超え、史上最高値を更新する。',
      },
    ],
  },
  {
    year: '2024',
    events: [
      {
        title: '米国でビットコイン現物ETFが承認される',
        description: '米国証券取引委員会（SEC）が、ビットコインの現物ETFを初めて承認。これにより、より多くの投資家がビットコインにアクセスしやすくなる。',
      },
      {
        title: '価格が73,000ドルを突破',
        description: '現物ETFへの資金流入などを背景に、3月には価格が73,000ドルを超え、史上最高値を更新する。',
      },
      {
        title: '4回目の半減期',
        description: 'マイニング報酬が6.25BTCから3.125BTCに半減する、4回目の「半減期」を迎える。',
      },
    ],
  },
  {
    year: '2025',
    events: [
      {
        title: '今後の予測',
        description: '（ここに2025年以降の予測や出来事を追加します）',
      },
    ],
  },
]

export default function Timeline() {
  const [openYears, setOpenYears] = useState<string[]>([])

  const toggleYear = (year: string) => {
    setOpenYears((prevOpenYears) =>
      prevOpenYears.includes(year)
        ? prevOpenYears.filter((y) => y !== year)
        : [...prevOpenYears, year]
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mt-16 py-12 bg-gray-50 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-12">ビットコイン歴史年表</h2>
      <div className="border-l-2 border-gray-200">
        {timelineData.map((item) => (
          <div key={item.year} className="relative">
            <div className="absolute -left-[11px] top-0 h-full">
              <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded-full"></div>
            </div>
            <div className="ml-8">
              <button
                onClick={() => toggleYear(item.year)}
                className="text-xl font-bold w-full text-left focus:outline-none"
              >
                {item.year}
              </button>
              {openYears.includes(item.year) && (
                <div className="mt-4 mb-8">
                  {item.events.map((event, index) => (
                    <div key={index} className="p-4 border rounded-lg shadow-sm">
                      <h3 className="font-bold">{event.title}</h3>
                      <p className="mt-2 text-gray-600">{event.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
