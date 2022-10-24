import { Button, Input} from '@mui/material';

interface Props {
	createQuant: () => void;
	input: string;
	setInput: (input: string) => void;
}


export const NewQuantSection = ( { createQuant, input, setInput }: Props ) => {
	
		return (
			<>
		<Button data-testid="sendButton" onClick={createQuant}>New item</Button>
		<Input data-testid="quantText" value={input} onChange={e => setInput(e.target.value)}/>	
		</>
		)
	}

