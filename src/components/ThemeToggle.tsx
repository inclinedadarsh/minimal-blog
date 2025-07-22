"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<button
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			className="p-2 rounded-md hover:bg-muted dark:hover:bg-muted transition-colors cursor-pointer"
			aria-label="Toggle theme"
			type="button"
		>
			<Sun size={18} className="hidden dark:block" />
			<Moon size={18} className="block dark:hidden" />
		</button>
	);
}
