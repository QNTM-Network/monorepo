import { map } from 'lodash';

import {Quant}from "../Quant/index";
import {IQuant} from '../../utils/types/index';

interface Props {
	quants: IQuant[];
	setDisplayQuants: (quants: IQuant[]) => void;
	displayQuants: IQuant[];
}

export const QuantList = ({ displayQuants, quants, setDisplayQuants}: Props) => {
	return (
		<div>
			{map(quants, (quant: IQuant, key: number) => {
				return (
					<div key={key}>
						<Quant displayQuants={displayQuants} setDisplayQuants={setDisplayQuants} quant={quant} />
					</div>
				);
			})}
		</div>
	);
}

