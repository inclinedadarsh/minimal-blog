import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
	variable: "--font-inter",
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
				className={`${inter.className} antialiased max-w-xl px-5 md:px-0 mx-auto`}
			>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
