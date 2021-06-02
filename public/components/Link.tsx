import { ComponentChildren } from 'preact';
import { useLocation } from 'preact-iso';

interface LinkProps {
	class?: string;
	href: string;
	children: ComponentChildren;
	matcher?: (url: string) => boolean;
}

export function Link(props: LinkProps) {
	const { url } = useLocation();

	return (
		<a
			class={props.class || `nav-link ${props.matcher?.(url) ?? url === props.href ? 'active' : ''}`}
			href={props.href}
		>
			{props.children}
		</a>
	);
}
