"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";
// import { useEffect } from "react";

export function ThemeProvider({
	children,
	...props
}: React.ComponentProps<typeof NextThemesProvider>) {
	// useEffect(() => {
	// 	// Initialize background color from localStorage
	// 	const savedColor = localStorage.getItem("theme-color");
	// 	if (savedColor) {
	// 		document.documentElement.style.setProperty(
	// 			"--background",
	// 			savedColor,
	// 		);
	// 	}
	// }, []);

	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
