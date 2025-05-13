import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const inter = Inter({
	variable: "--font-body",
	subsets: ["latin"],
});

const interTight = Inter_Tight({
	variable: "--font-heading",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Adarsh Dubey's Blog",
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
					"font-body antialiased max-w-xl px-5 md:px-0 mx-auto"
				}
			>
				<Navbar />
				{children}
				<Footer />
			</body>
			{/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
			<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
		</html>
	);
}
