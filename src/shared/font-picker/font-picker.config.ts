import Font from './font.model';

export default interface FontPickerConfig {
	fonts: Array<Font>;
	selectedFont: string;

	className?: string;
	onFontSelect?: (font: Font) => void;
	children?: JSX.Element;
}
