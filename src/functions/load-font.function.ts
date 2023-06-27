export default async function loadFont(
	family: string,
	url: string,
	descriptors?: FontFaceDescriptors
) {
	if (!document.fonts.check(`12px ${family}`)) {
		const fontFace = new FontFace(family, `url(${url})`, descriptors);

		document.fonts.add(fontFace);

		await fontFace.load();
	}
}
