const YouTubeEmbed = ({ embedLink }: { embedLink: string }) => {
	if (!embedLink) return null;
	return (
		<div className="relative pb-[56.25%] h-0">
			<iframe
				src={embedLink}
				title="YouTube video player"
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerPolicy="strict-origin-when-cross-origin"
				allowFullScreen
				style={{ aspectRatio: "16/9" }}
				className="absolute top-0 left-0 w-full h-full rounded-lg"
			/>
		</div>
	);
};

export default YouTubeEmbed;
