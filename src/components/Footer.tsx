import Link from "next/link";

const Footer = () => {
	return (
		<footer id="footer" className="mt-10 py-8 border-t border-border">
			<p className="">
				Made with ❤️ by{" "}
				<Link
					href="https://x.com/inclinedadarsh"
					target="_blank"
					rel="noopener noreferrer"
					className="text-link hover:text-link-hover  transition-colors"
				>
					Adarsh Dubey
				</Link>
				.
			</p>
		</footer>
	);
};

export default Footer;
