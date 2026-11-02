import "server-only";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export type PushMessage = { title: string; body: string; data: Record<string, unknown> };

export async function pushToUser(userId: string, message: PushMessage): Promise<boolean> {
  const { data: user } = await supabaseAdmin
    .from("users").select("expo_push_token").eq("id", userId).maybeSingle();
  if (!user?.expo_push_token) return false;

  const res = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to: user.expo_push_token, ...message, sound: "default" }),
  }).catch(() => null);
  return res?.ok ?? false;
}
