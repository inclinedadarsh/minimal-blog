"use client";

import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const Subscribe = ({ slug }: { slug: string }) => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const schema = z.object({
		email: z.string().trim().email("Please enter a valid email."),
		name: z
			.string()
			.trim()
			.max(20, "Name must be less than 20 characters.")
			.optional()
			.or(z.literal("").transform(() => undefined)),
	});

	const handleSubmit = async () => {
		if (isLoading) return;

		const parsed = schema.safeParse({ email, name });
		if (!parsed.success) {
			const firstIssue = parsed.error.issues[0];
			toast.error(
				firstIssue?.message ??
					"Please check your details and try again.",
			);
			return;
		}

		setIsLoading(true);
		try {
			const payload = {
				name: parsed.data.name,
				email: parsed.data.email,
				from: slug,
			};

			const res = await fetch("/api/subscribe", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			const json = await res.json().catch(() => ({}));

			if (res.status === 201) {
				toast.success("You're on the list! 🎉");
				setEmail("");
				setName("");
				return;
			}

			if (res.status === 409) {
				toast("You're already on the list. All set!");
				return;
			}

			if (res.status === 400) {
				const detailMsg =
					Array.isArray(json?.details) && json.details[0]?.message
						? json.details[0].message
						: "Please double-check your info and try again.";
				toast.error(detailMsg);
				return;
			}

			if (res.status >= 500) {
				toast.error(
					"Something went wrong on our side. Try again in a bit.",
				);
				return;
			}

			toast("Hmm, that didn't work. Please try again.");
		} catch (err) {
			toast.error("Network error. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="mt-8">
			<p className="text-xl font-bold">Like what you read?</p>
			<p className="">
				You can put in your email below to get notified when I publish
				new blogs. No spam, promise :D
			</p>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
				<div className="flex flex-col gap-2">
					<Label htmlFor="email">Email</Label>
					<Input
						value={email}
						onChange={e => setEmail(e.target.value)}
						id="email"
						placeholder="batman@gmail.com"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<Label htmlFor="name">Name (optional)</Label>
					<Input
						value={name}
						onChange={e => setName(e.target.value)}
						id="name"
						placeholder="Batman"
					/>
				</div>
			</div>
			<Button
				className="mt-4"
				onClick={handleSubmit}
				disabled={isLoading}
				aria-busy={isLoading}
			>
				{isLoading ? "Adding you..." : "Count me in!"}
			</Button>
		</div>
	);
};

export default Subscribe;
