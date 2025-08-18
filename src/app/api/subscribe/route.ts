import WelcomeEmail from "@/components/emails/welcome";
import { supabase } from "@/lib/supabase";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// Define the validation schema
const subscribeSchema = z.object({
	name: z
		.string()
		.max(20, "Name must be less than 20 characters.")
		.optional(),
	email: z.string().email("Invalid email address"),
	from: z.string().min(1, "From field is required"),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const validatedData = subscribeSchema.parse(body);

		const supabaseClient = supabase();

		// First check if user with same email already exists
		const { data: existingUser, error: checkError } = await supabaseClient
			.from("subscribers")
			.select("id")
			.eq("email", validatedData.email)
			.single();

		if (checkError && checkError.code !== "PGRST116") {
			// PGRST116 is "not found" error, which is expected if no user exists
			console.error("Error checking existing user:", checkError);
			return NextResponse.json(
				{ error: "Failed to check subscription status" },
				{ status: 500 },
			);
		}

		if (existingUser) {
			return NextResponse.json(
				{ error: "Email already subscribed" },
				{ status: 409 },
			);
		}

		// Insert the subscriber into the database
		const { data, error } = await supabaseClient
			.from("subscribers")
			.insert({
				name: validatedData.name,
				email: validatedData.email,
				from: validatedData.from,
			})
			.select()
			.single();

		if (error) {
			console.error("Supabase error:", error);
			return NextResponse.json(
				{ error: "Failed to subscribe" },
				{ status: 500 },
			);
		}

		// Send welcome email (non-fatal if it fails)
		const { data: emailData, error: emailError } = await resend.emails.send(
			{
				from: "Adarsh <welcome@adarshdubey.com>",
				to: [validatedData.email],
				replyTo: "dubeyadarshmain@gmail.com",
				subject: "You're on the list! 🎉",
				react: WelcomeEmail({
					name: validatedData.name ?? validatedData.email,
				}),
			},
		);

		// Return success response (include email status)
		return NextResponse.json(
			{
				message: "Successfully subscribed",
				subscriber: data,
				email: emailError ? { error: emailError } : emailData,
			},
			{ status: 201 },
		);
	} catch (error) {
		if (error instanceof z.ZodError) {
			// Handle validation errors
			return NextResponse.json(
				{
					error: "Validation failed",
					details: error.issues,
				},
				{ status: 400 },
			);
		}

		console.error("Unexpected error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
