import '../assets/spinner.css';

interface LoadingIndicatorProps {
	show: boolean;
	style?: Record<string, string>;
	strokeColor?: string;
	width?: string;
}

export function LoadingIndicator(props: LoadingIndicatorProps) {
	return (
		<svg
			id="loading-spinner"
			style={{ ...props.style, display: props.show ? props.style?.display : 'none' }}
			viewBox="0 0 100 100"
			xmlns="http://www.w3.org/2000/svg"
			width={props.width}
		>
			<circle id="circle" cx="50" cy="50" r="45" style={{ stroke: props.strokeColor }} />
		</svg>
	);
}
