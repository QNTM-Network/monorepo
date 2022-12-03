import { Button, Input} from '@mui/material';

interface Props {
	createQuant: () => void;
	input: string;
	setInput: (input: string) => void;
}


export const NewQuantSection = ( { createQuant, input, setInput }: Props ) => {
	
		return (
			<>
		<Button variant="contained" data-testid="sendButton" onClick={createQuant}>New item</Button>
		</>
		)
	}

