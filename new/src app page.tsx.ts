"use client";
import Link from 'next/link';
import { Globe, BookOpen, Terminal } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-3">
          ECHO MIND 智言
        </h1>
        <p className="text-slate-400 max-w-md">高压逻辑表达训练场。在这里，输入转化为深刻的见解，AI 锤炼你的语言锋芒。</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* 中文区 */}
        <Link href="/arena?lang=zh" className="group p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 shadow-xl hover:shadow-emerald-950/20 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
              <BookOpen size={24} />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-slate-100">中文思辨区 (Chinese Zone)</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              聚焦于逻辑漏洞剖析、成语典故润色、复杂语境下的精细化表达。扩充你的批判性叙事素材库。
            </p>
          </div>
          <div className="mt-8 text-emerald-400 font-medium text-sm flex items-center gap-1">
            进入训练场 &rarr;
          </div>
        </Link>

        {/* 英文区 */}
        <Link href="/arena?lang=en" className="group p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 shadow-xl hover:shadow-blue-950/20 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
              <Globe size={24} />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-slate-100">英文思维区 (English Zone)</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              侧重于英语母语者逻辑（Linear Thinking）、核心学术词汇的高频流利应用及跨文化国际视野输出。
            </p>
          </div>
          <div className="mt-8 text-blue-400 font-medium text-sm flex items-center gap-1">
            Enter Arena &rarr;
          </div>
        </Link>
      </div>
    </div>
  );
}