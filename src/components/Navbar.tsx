"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS } from "@/constants";
import { cn } from "@/lib/utils";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<nav id="navbar" className="py-5 md:py-10">
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-4">
					<div className="w-5 h-5 rounded-full bg-green-500" />
					<Link
						className="text-foreground-title px-2 py-1 rounded-sm border"
						href="mailto:dubeyadarshmain@gmail.com"
					>
						Let's talk
					</Link>
				</div>
				{/* Mobile menu button */}
				<button
					type="button"
					className="md:hidden p-2 -ml-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					aria-label="Toggle menu"
				>
					{isMenuOpen ? <X size={20} /> : <Menu size={20} />}
				</button>

				{/* Desktop navigation */}
				<ul className="hidden md:flex gap-5 md:gap-7">
					{NAV_LINKS.map(link => (
						<li key={link.label}>
							<Link
								className={cn(
									"text-foreground-body hover:text-foreground-title transition-colors font-mono",
								)}
								href={link.href}
								target={link.openInNewTab ? "_blank" : "_self"}
								rel={
									link.openInNewTab
										? "noopener noreferrer"
										: ""
								}
							>
								{link.label}
							</Link>
						</li>
					))}
				</ul>
			</div>

			{/* Mobile navigation */}
			<div
				className={cn(
					"md:hidden",
					isMenuOpen
						? "block absolute top-[4.5rem] left-0 right-0 bg-background border-b border-border p-4"
						: "hidden",
				)}
			>
				<ul className="flex flex-col gap-4">
					{NAV_LINKS.map(link => (
						<li key={link.label}>
							<Link
								className={cn(
									"text-foreground-body hover:text-foreground-title transition-colors block py-2 font-mono",
								)}
								href={link.href}
								target={link.openInNewTab ? "_blank" : "_self"}
								rel={
									link.openInNewTab
										? "noopener noreferrer"
										: ""
								}
								onClick={() => setIsMenuOpen(false)}
							>
								{link.label}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
