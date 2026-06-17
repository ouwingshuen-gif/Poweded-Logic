import './globals.css' // 确保在同一目录下或全局引入了 Tailwind 的 @tailwind base; 等

export const metadata = {
  title: '智言 EchoMind - AI 辩论逻辑训练场',
  description: '用 AI 提升你的双语逻辑思辨与极限表达能力',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className="bg-slate-950 text-slate-50 min-h-screen font-sans">
        {children}
      </body>
    </html>
  )
}