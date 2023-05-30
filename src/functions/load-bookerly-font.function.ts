export default async function loadBookerlyFont(): Promise<void> {
	const fontFace = new FontFace('Bookerly', 'url(/Bookerly-Regular.ttf)');

	document.fonts.add(fontFace);

	await fontFace.load();
}
