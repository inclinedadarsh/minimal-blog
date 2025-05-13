import { cn } from "@/lib/utils";
import Link from "next/link";

type NavLink = {
	label: string;
	href: string;
	openInNewTab?: boolean;
};

const navLinks: NavLink[] = [
	{
		label: "home",
		href: "/",
	},
	{
		label: "blogs",
		href: "/blog",
	},
	{
		label: "website",
		href: "https://adarshdubey.com",
		openInNewTab: true,
	},
];

const Navbar = () => {
	return (
		<nav id="navbar" className="py-5 md:py-10">
			<ul className="flex gap-5 md:gap-7">
				{navLinks.map(link => (
					<li key={link.label}>
						<Link
							className={cn(
								"text-primary hover:text-primary/70 transition-colors",
							)}
							href={link.href}
							target={link.openInNewTab ? "_blank" : "_self"}
							rel={link.openInNewTab ? "noopener noreferrer" : ""}
						>
							{link.label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navbar;
