interface Props {
	tag: string;
	setFilter: (tag: string) => void;
}

export const Tag = ({ tag, setFilter}: Props) => {
	return (
		<div onClick={() => setFilter(tag)}>
			{tag}
		</div>
	);
}

