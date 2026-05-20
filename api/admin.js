import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

export default async function handler(req, res) {
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");
if (req.method === "OPTIONS") return res.status(200).end();
if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

const { adminKey, action, name, email, password, plan, trialDays } = req.body;
if (adminKey !== process.env.ADMIN_SECRET_KEY) return res.status(401).json({ error: "Unauthorized" });

if (action === "add_user") {
const trialEnd = new Date();
trialEnd.setDate(trialEnd.getDate() + (trialDays || 14));
const { data, error } = await supabase.from("users").insert([{ name, email, password, plan: plan || "bundle", trial_ends_at: trialEnd.toISOString(), subscribed: false, active: true }]);
if (error) return res.status(400).json({ error: error.message });
return res.status(200).json({ success: true });
}

return res.status(400).json({ error: "Invalid action" });
}
