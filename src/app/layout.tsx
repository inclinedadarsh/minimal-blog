import type { Metadata } from "next";
import { Geist_Mono, Inter, Source_Serif_4 } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { HackModeProvider } from "@/contexts/hack-mode";

const _inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	axes: ["opsz"],
	display: "swap",
});

const _sourceSerif4 = Source_Serif_4({
	variable: "--font-source-serif-4",
	subsets: ["latin"],
	axes: ["opsz"],
	display: "swap",
});

const _geistMono = Geist_Mono({
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
					"font-sans antialiased max-w-3xl px-5 md:px-0 mx-auto dark"
				}
			>
				<HackModeProvider>
					<Navbar />
					{children}
					<Footer />
				</HackModeProvider>
				<Script
					async
					data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID || ""}
					strategy="afterInteractive"
				/>
			</body>
		</html>
	);
}
