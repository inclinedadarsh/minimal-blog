import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error("Missing Supabase environment variables");
}

// Check if a connection already exists
let supabaseInstance: ReturnType<typeof createClient> | null = null;

export const supabase = () => {
	if (supabaseInstance) {
		return supabaseInstance;
	}

	supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
	});

	return supabaseInstance;
};
