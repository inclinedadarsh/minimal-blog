import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Link,
	Preview,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";

const WelcomeEmail = (props: { name: string }) => {
	return (
		<Html lang="en" dir="ltr">
			<Tailwind>
				<Head />
				<Preview>You're on the list! 🎉</Preview>
				<Body className="bg-gray-100 font-sans py-[40px]">
					<Container className="bg-white rounded-[12px] max-w-[580px] mx-auto px-[40px] py-[40px]">
						<Section>
							<Heading className="text-[32px] font-bold text-gray-900 text-center mb-[32px] leading-[1.2]">
								You're on the list! 🎉
							</Heading>

							<Text className="text-[16px] text-gray-600 leading-[1.6] mb-[24px]">
								Hi {props.name}, thanks for subscribing to my
								blog! I'm genuinely excited to have you here.
							</Text>

							<Text className="text-[16px] text-gray-600 leading-[1.6] mb-[24px]">
								I'll be sharing blogs, projects and whatever's
								on my mind directly to your inbox. No spam, no
								nonsense, just authentic content when
								inspiration strikes.
							</Text>

							<Text className="text-[16px] text-gray-600 leading-[1.6] mb-[32px]">
								If you ever want to drop off the list, no hard
								feelings at all, just{" "}
								<Link
									href="mailto:dubeyadarshmain@gmail.com"
									className="text-blue-600 underline"
								>
									let me know
								</Link>{" "}
								and I'll take care of it right away.
							</Text>

							<Text className="text-[16px] text-gray-600 leading-[1.6] mb-[40px]">
								Looking forward to sharing this journey with
								you!
							</Text>

							<Text className="text-[16px] text-gray-800 font-medium">
								Cheers,
								<br />
								Adarsh
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default WelcomeEmail;
