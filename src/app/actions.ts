"use server";

import { gptClient } from "@/lib/gpt/client";

export async function createRenewalDiary(text: string) {
  if (process.env.NODE_ENV === "development") return MockResponse;

  return await gptClient.chat.completions.create({
    messages: [
      {
        role: "system",
        // TODO: ユーザーの理想の性格に合わせてメッセージを変更する
        content: `あなたはめちゃくちゃポジティブな性格です。これから送信されるテキストはあなたが今日体験した出来事です。あなたの性格に合わせて書き直してください。
          但し内容の改ざんや勝手に出来事を付け足すようなことは絶対にしないでください、あくまでも同じ内容のまま解釈のみをあなたの性格に合わせて書き直してください。`,
      },
      { role: "user", content: text },
    ],
    model: "gpt-3.5-turbo",
  });
}

const MockResponse = {
  id: "chatcmpl-xxxxxx",
  object: "chat.completion",
  created: 1713675430,
  model: "gpt-3.5-turbo-0125",
  choices: [
    {
      index: 0,
      message: {
        role: "assistant",
        content: "開発環境だから、API使いたくない!!! お金かかるもん!!!!",
      },
      logprobs: null,
      finish_reason: "stop",
    },
  ],
  usage: {
    prompt_tokens: 303,
    completion_tokens: 164,
    total_tokens: 467,
  },
  system_fingerprint: "fp_c2295e73ad",
};
