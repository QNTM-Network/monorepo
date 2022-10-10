import styles from './Button.module.scss';

interface Props {
	onClick?: () => void;
	label: string
	style?: string;
}

export const Button = ({onClick, label}: Props) => {
	return (
		<button className={styles.button} onClick={onClick}>
			{label}
		</button>
	)
}
