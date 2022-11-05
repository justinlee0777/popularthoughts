import { smoothScroll } from './smooth-scroll.function';

export function addWindowArrowKeyScrollListener(selector: string): () => void {
	const scroll = smoothScroll({
		selector,
	});

	function keyDownScroll(event: KeyboardEvent): void {
		if (event.key === 'ArrowDown') {
			scroll(undefined, 1);
		} else if (event.key === 'ArrowUp') {
			scroll(undefined, -1);
		}
	}

	window.addEventListener('keydown', keyDownScroll);

	return function cleanUpScrollListener(): void {
		window.removeEventListener('keydown', keyDownScroll);
	};
}
