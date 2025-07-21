import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Charis_SIL, Fira_Code } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";

const charisSil = Charis_SIL({
	variable: "--font-charis",
	subsets: ["latin"],
	weight: ["400", "700"],
});

const firaCode = Fira_Code({
	variable: "--font-fira-code",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
	title: {
		default: "Adarsh Dubey's Blog",
		template: "%s | Adarsh Dubey",
	},
	description: "Adarsh Dubey's Blog",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={
					"font-body antialiased max-w-2xl px-5 md:px-0 mx-auto"
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
				</ThemeProvider>
			</body>
			{/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
			<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
		</html>
	);
}
