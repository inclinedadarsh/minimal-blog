import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
	throw new Error("Missing Supabase environment variables");
}

// Check if a connection already exists
let supabaseInstance: ReturnType<typeof createClient> | null = null;

export const supabase = () => {
	if (supabaseInstance) {
		return supabaseInstance;
	}

	supabaseInstance = createClient(supabaseUrl, supabaseServiceKey, {
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
	});

	return supabaseInstance;
};
