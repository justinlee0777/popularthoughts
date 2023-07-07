export default async function loadFont(
	family: string,
	url: string,
	descriptors?: FontFaceDescriptors
) {
	const fontFace = new FontFace(family, `url(${url})`, descriptors);

	document.fonts.add(fontFace);

	await fontFace.load();
}
