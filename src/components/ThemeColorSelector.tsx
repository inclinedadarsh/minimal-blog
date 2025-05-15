"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

const lightThemeColors = [
	{ name: "white", value: "oklch(1 0 0)" },
	{ name: "pastel-yellow", value: "oklch(0.98 0.02 85)" },
	{ name: "pastel-blue", value: "oklch(0.98 0.02 240)" },
	{ name: "pastel-green", value: "oklch(0.98 0.02 140)" },
];

const darkThemeColors = [
	{ name: "black", value: "oklch(0.141 0.005 285.823)" },
	{ name: "dark-yellow", value: "oklch(0.2 0.02 85)" },
	{ name: "dark-blue", value: "oklch(0.2 0.02 240)" },
	{ name: "dark-green", value: "oklch(0.2 0.02 140)" },
];

// Helper function to get the corresponding color in the other mode
const getCorrespondingColor = (color: string, isDark: boolean) => {
	const currentThemeColors = isDark ? darkThemeColors : lightThemeColors;
	const otherThemeColors = isDark ? lightThemeColors : darkThemeColors;

	const currentIndex = currentThemeColors.findIndex(c => c.value === color);
	if (currentIndex === -1) return null;

	return otherThemeColors[currentIndex].value;
};

// Helper function to get outline color based on the theme color
const getOutlineColor = (color: string, isDark: boolean) => {
	// For white/black, use a neutral color
	if (
		color === lightThemeColors[0].value ||
		color === darkThemeColors[0].value
	) {
		return isDark ? "oklch(0.25 0 0)" : "oklch(0.6 0 0)";
	}

	// Extract the color components
	const match = color.match(/oklch\(([\d.]+) ([\d.]+) ([\d.]+)\)/);
	if (!match) return isDark ? "oklch(0.25 0 0)" : "oklch(0.6 0 0)";

	const [, lightness, chroma, hue] = match.map(Number);

	// For light mode, make it darker
	// For dark mode, make it very slightly lighter
	const newLightness = isDark ? lightness + 0.05 : lightness - 0.2;

	return `oklch(${newLightness} ${chroma} ${hue})`;
};

export function ThemeColorSelector() {
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [selectedColor, setSelectedColor] = useState<string | null>(null);

	// Wait for theme to be resolved
	useEffect(() => {
		setMounted(true);
	}, []);

	// Function to update background color
	const updateBackgroundColor = useCallback((color: string) => {
		setSelectedColor(color);
		localStorage.setItem("theme-color", color);
		document.documentElement.style.setProperty("--background", color);
	}, []);

	// Initialize colors
	useEffect(() => {
		if (!mounted) return;

		const isDark = resolvedTheme === "dark";
		const colors = isDark ? darkThemeColors : lightThemeColors;

		// Initialize selected color from localStorage
		const savedColor = localStorage.getItem("theme-color");
		if (savedColor) {
			// Check if the saved color belongs to the current theme
			const currentThemeColors = isDark
				? darkThemeColors
				: lightThemeColors;
			const colorExists = currentThemeColors.some(
				color => color.value === savedColor,
			);

			if (colorExists) {
				updateBackgroundColor(savedColor);
			} else {
				// If saved color doesn't match current theme, get the corresponding color
				const correspondingColor = getCorrespondingColor(
					savedColor,
					!isDark,
				);
				if (correspondingColor) {
					updateBackgroundColor(correspondingColor);
				} else {
					// If no corresponding color found, use default
					const defaultColor = isDark
						? darkThemeColors[0].value
						: lightThemeColors[0].value;
					updateBackgroundColor(defaultColor);
				}
			}
		} else {
			// Set default color based on theme
			const defaultColor = isDark
				? darkThemeColors[0].value
				: lightThemeColors[0].value;
			updateBackgroundColor(defaultColor);
		}
	}, [mounted, resolvedTheme, updateBackgroundColor]);

	// Don't render anything until mounted
	if (!mounted) return null;

	const isDark = resolvedTheme === "dark";
	const colors = isDark ? darkThemeColors : lightThemeColors;

	return (
		<div className="flex items-center gap-2">
			{colors.map(color => (
				<button
					type="button"
					key={color.name}
					onClick={() => updateBackgroundColor(color.value)}
					className={cn(
						"w-6 h-6 rounded-full border-2 transition-all",
						"hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2",
						"border-neutral-200 dark:border-neutral-800",
						selectedColor === color.value && "ring-2 ring-offset-2",
					)}
					style={{
						backgroundColor: color.value,
						...(selectedColor === color.value &&
							({
								"--tw-ring-color": getOutlineColor(
									color.value,
									isDark,
								),
							} as React.CSSProperties)),
					}}
					aria-label={`Select ${color.name} theme`}
				/>
			))}
		</div>
	);
}
