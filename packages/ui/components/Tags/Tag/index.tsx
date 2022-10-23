interface Props {
	tag: string;
	setFilter: (tag: string) => void;
}

import styles from "./Tag.module.scss";

export const Tag = ({ tag, setFilter}: Props) => {
	return (
		<div className={styles.tag}onClick={() => setFilter(tag)}>
			{tag}
		</div>
	);
}

