import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userSpeech, lang } = await request.json();

    // 提示词工程：规范大模型化身为《奇葩说》或国际大专辩论赛最佳辩手
    const systemPrompt = `
      你现在是国际大专辩论赛的最佳辩手，兼具极强的逻辑思辨力和爆棚的幽默感（类似《奇葩说》犀利毒舌且金句频出的导师风格）。
      请针对用户的口头表达文本进行切中要害、绝不留情面的犀利点评。
      
      你必须且只能返回一个标准的 JSON 对象，格式严格如下（不要输出任何 markdown 标记如 \`\`\`json）：
      {
        "scores": {
          "logic": 7,
          "reflex": 6,
          "fluency": 8,
          "wit": 5,
          "depth": 6
        },
        "feedback": "你的逻辑听起来很清晰，但语言像一块干燥的压缩饼干，我们得加点幽默的调味剂。你一直在循环‘技术坏处’，却没有切入‘制度重塑’的要害...",
        "exemplar": "如果是金牌辩手会这样切入：‘各位，技术不是抢走面包的强盗，而是逼迫我们停止用体力换取廉价面包的闹钟！面对算法垄断，我们要税的不是冷冰冰的机器，而是重塑社会分配的傲慢！’"
      }
    `;

    // 这里是调用大模型 API 的伪代码。
    // 在真实 Vercel 环境中，你只需将下方的 env.OPENAI_API_KEY 配置到 Vercel 控制台即可。
    /*
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o', // 或 gemini-1.5-pro
        response_format: { type: "json_object" }, // 强制要求 JSON 返回
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `用户在${lang === 'zh' ? '中文区' : '英文区'}的训练表达内容为：${userSpeech}` }
        ]
      })
    });
    const result = await response.json();
    return NextResponse.json(JSON.parse(result.choices[0].message.content));
    */

    // 以下为未配置 API 密钥时的 Mock 模拟返回数据（确保部署后立即可用）
    const mockData = {
      scores: { logic: 8, reflex: 7, fluency: 9, wit: 5, depth: 6 },
      feedback: lang === 'zh' 
        ? "你的逻辑线条拉得很直，但语言干瘪得像一张没有刷酱的煎饼。光谈算法剥削，听起来像在开诉苦大会。我们得加点思辨的辣椒面！"
        : "Your structure is clear but as predictable as a textbook. You focus too much on 'AI steals jobs' instead of 'AI redefines the value of human consciousness'. Let's add some punchlines.",
      exemplar: lang === 'zh'
        ? "如果是金牌辩手会怎么说：‘机器拿走的是它能重复的苦工，留给人类的是无法被算法解构的灵性。收机器人税不是为了保护落后，而是为了给人类的尊严买单！’"
        : "How a master debater frames it: 'AI isn't the executioner of human labor; it's the liberator. We shouldn't tax the silicon; we should tax the obsolete mindset that defines human worth solely by productivity!'"
    };

    return NextResponse.json(mockData);

  } catch (error) {
    return NextResponse.json({ error: 'Server Internal Error' }, { status: 500 });
  }
}