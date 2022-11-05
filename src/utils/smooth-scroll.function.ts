export interface SmoothScrollOptions {
	selector: string;
	msPerFrame?: number;
	duration?: number;
	distance?: number;
}

export type ScrollFunction = (
	xOffset?: -1 | 0 | 1,
	yOffset?: -1 | 0 | 1
) => void;

export function smoothScroll(options: SmoothScrollOptions): ScrollFunction {
	const msPerFrame = options.msPerFrame ?? 1000 / 60;
	/** In milliseconds. */
	const duration = options.duration ?? 300;
	const frames = duration / msPerFrame;
	const distance = options.distance ?? 50;
	const scrollTopPerFrame = distance / frames;

	let intervalId: NodeJS.Timer | undefined;

	return function scroll(
		xOffset: -1 | 0 | 1 = 0,
		yOffset: -1 | 0 | 1 = 0
	): void {
		if (intervalId) {
			clearInterval(intervalId);
		}

		const scrollContainer = document.querySelector(options.selector);
		let i = 1;

		const scrollByOptions: ScrollToOptions = {
			top: yOffset * scrollTopPerFrame,
			left: xOffset * scrollTopPerFrame,
		};

		intervalId = setInterval(() => {
			if (i >= frames) {
				clearInterval(intervalId);
			}

			scrollContainer.scrollBy(scrollByOptions);

			i = i + 1;
		}, msPerFrame);
	};
}
