import Link from "next/link";

const Footer = () => {
	return (
		<footer id="footer" className="mt-10">
			<p className="">
				Made with ❤️ by{" "}
				<Link
					href="https://x.com/inclinedadarsh"
					target="_blank"
					rel="noopener noreferrer"
					className="underline underline-offset-2 hover:no-underline"
				>
					Adarsh Dubey
				</Link>
			</p>
		</footer>
	);
};

export default Footer;
