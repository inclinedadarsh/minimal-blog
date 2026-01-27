import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Geist_Mono, Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	axes: ["opsz"],
	display: "swap",
});

const sourceSerif4 = Source_Serif_4({
	variable: "--font-source-serif-4",
	subsets: ["latin"],
	axes: ["opsz"],
	display: "swap",
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
	title: {
		default: "Adarsh Dubey",
		template: "%s | Adarsh Dubey",
	},
	description:
		"Adarsh Dubey is a web developr and machine learning engineer.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={
					"font-sans antialiased max-w-2xl px-5 md:px-0 mx-auto"
				}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Navbar />
					{children}
					<Footer />
					<Toaster richColors />
				</ThemeProvider>
			</body>
			{/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
			<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
		</html>
	);
}
