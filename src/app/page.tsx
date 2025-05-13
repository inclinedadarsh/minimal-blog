import AllBlogs from "@/components/AllBlogs";

export default function Home() {
	return (
		<main className="md:mt-5">
			<h1 className="text-2xl font-bold font-title">Adarsh Dubey</h1>
			<p className="mt-6 text-foreground/80 mb-5 md:mb-10">
				I'm a Vim enthusiast and tab advocate, finding unmatched
				efficiency in Vim's keystroke commands and tabs' flexibility for
				personal viewing preferences. This extends to my support for
				static typing, where its early error detection ensures cleaner
				code, and my preference for dark mode, which eases long coding
				sessions by reducing eye strain.
			</p>
			<AllBlogs />
		</main>
	);
}
