"use client";
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mic, Square, Sparkles, Timer, ArrowLeft, ShieldAlert } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

export default function ArenaPage() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'zh';

  // 状态管理
  const [isRecording, setIsRecording] = useState(false);
  const [selectedTime, setSelectedTime] = useState('1m');
  const [aiLoading, setAiLoading] = useState(false);
  const [report, setReport] = useState<any>(null);

  // 模拟触发 AI 导师点评接口
  const handleStartEvaluation = async () => {
    setAiLoading(true);
    try {
      const res = await fetch('/api/judge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userSpeech: "我认为科技的发展确实拉大了贫富差距，因为掌握核心算法的人卷走了大部分利润，普通工人只能被迫转型...",
          lang: lang
        })
      });
      const data = await res.json();
      setReport(data);
    } catch (e) {
      console.error(e);
    } finally {
      setAiLoading(false);
    }
  };

  // 雷达图数据映射
  const chartData = report ? [
    { subject: '逻辑结构', A: report.scores.logic, fullMark: 10 },
    { subject: '临场反应', A: report.scores.reflex, fullMark: 10 },
    { subject: '流利度', A: report.scores.fluency, fullMark: 10 },
    { subject: '幽默感染力', A: report.scores.wit, fullMark: 10 },
    { subject: '内容深度', A: report.scores.depth, fullMark: 10 },
  ] : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 导航 */}
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 mb-8">
        <ArrowLeft size={16} /> 返回分区
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* 左侧：资讯与出题舱 */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="px-2 py-1 text-xs font-semibold rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              今日热点资讯 (Fact-Checked)
            </span>
            <h2 className="text-xl font-bold mt-3 mb-2">生成式 AI 对全球就业市场的结构性重塑</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              据路透社报道，最新技术预测显示，未来三年内蓝领转型率将提高30%。技术垄断导致新财富过度集中于技术精英阶层...
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 mb-3">
              <Sparkles size={18} />
              <h3 className="font-bold">AI 五维思辨提问</h3>
            </div>
            <p className="text-sm text-slate-200 bg-slate-950 p-3 rounded-lg border border-slate-800">
              「核心辩题」：科技巨头垄断算法利益，政府是否应该介入实施“机器人税”以保证社会公平？请结合材料阐述。
            </p>
          </div>
        </div>

        {/* 中间：表达训练场 */}
        <div className="lg:col-span-1 flex flex-col justify-between p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Timer size={20} className="text-blue-400" /> 表达训练场
            </h2>
            {/* 时间选择器 */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {['30s', '1m', '2m', '5m'].map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                    selectedTime === time
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {time === '30s' || time === '1m' ? `${time} 电梯演讲` : `${time} 深度论述`}
                </button>
              ))}
            </div>

            {/* 录音仿真面板 */}
            <div className="h-48 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
              {isRecording && (
                <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none" />
              )}
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                  isRecording ? 'bg-red-600 text-white animate-bounce' : 'bg-blue-600 text-white hover:scale-105'
                }`}
              >
                {isRecording ? <Square size={24} /> : <Mic size={24} />}
              </button>
              <p className="text-xs text-slate-500 mt-4">
                {isRecording ? "正在捕捉声音... 点击方块停止" : "准备就绪，点击麦克风开始高压表达"}
              </p>
            </div>
          </div>

          <button
            onClick={handleStartEvaluation}
            disabled={aiLoading}
            className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-bold text-sm shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {aiLoading ? "辩手导师正在疯狂推演逻辑..." : "提交录音，召唤金牌辩手点评"}
          </button>
        </div>

        {/* 右侧：导师点评台 */}
        <div className="lg:col-span-1 p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-amber-400">
              🏆 导师辩才点评台
            </h2>

            {report ? (
              <div className="space-y-4">
                {/* 蜘蛛网图可视化 */}
                <div className="w-full h-48 bg-slate-950 rounded-xl p-2 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" radius="80%" data={chartData}>
                      <PolarGrid stroke="#334155" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                      <Radar name="用户表现" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* 毒舌反馈 */}
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-sm">
                  <div className="font-bold text-amber-400 mb-1 flex items-center gap-1">
                    <ShieldAlert size={14} /> 犀利点评：
                  </div>
                  <p className="text-slate-300 italic leading-relaxed">"{report.feedback}"</p>
                </div>

                {/* 改写示范 */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm">
                  <div className="font-bold text-emerald-400 mb-1">✨ 金牌辩手绝杀改写：</div>
                  <p className="text-slate-400 leading-relaxed text-xs">{report.exemplar}</p>
                </div>
              </div>
            ) : (
              <div className="h-64 border border-dashed border-slate-800 rounded-xl flex items-center justify-center text-xs text-slate-600 text-center px-4">
                {aiLoading ? "正在拆解您的论点，别急..." : "完成左侧训练后，这里将生成犀利幽默的毒舌评级与高分金句改写"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}