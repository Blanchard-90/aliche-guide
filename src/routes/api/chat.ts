import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const SYSTEM = `You are ALITCHÉ Coach — an empathetic academic and career orientation guide for high-school graduates in Benin and West Africa.
- Answer in the user's language (French by default; English if asked).
- Be warm, concrete, short. Use bullet lists when listing programs, careers or institutions.
- Reference real Beninese institutions when relevant (UAC, EPAC, INSTI, ENEAM, IFRI).
- When recommending paths, justify with skills, employability and growth.
- Always end with one short follow-up question to keep the user engaged.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as { messages?: UIMessage[] };
        if (!Array.isArray(messages)) return new Response("Messages required", { status: 400 });
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway("google/gemini-3-flash-preview"),
          system: SYSTEM,
          messages: await convertToModelMessages(messages),
        });
        return result.toUIMessageStreamResponse({ originalMessages: messages });
      },
    },
  },
});
