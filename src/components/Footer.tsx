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
					className="text-orange-600 hover:text-orange-400 dark:hover:text-orange-300 dark:text-orange-400 transition-colors"
				>
					Adarsh Dubey
				</Link>
				.
			</p>
		</footer>
	);
};

export default Footer;
