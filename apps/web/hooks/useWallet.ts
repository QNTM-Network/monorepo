import { useCallback, useEffect, useState } from 'react';
import { get, isEmpty } from 'lodash';
import axios from 'axios';

import { setUser, unsetUser } from '../store/reducers/userSlice';

interface CheckUser {
	field: string;
	value: string;
	address: string;
}

const useWallet = () => {
	const [isLoading, setIsLoading] = useState(true);

	const checkUser = useCallback(async (body: CheckUser) => {
		try {
			const res = await axios.post('/api/user/check', body);
			
			if (res.status === 200) {
				setIsLoading(false);
			}
		} catch (err) {
			console.log(err);
		}
	}, []);

	
	const handleLogin = useCallback(async (address: string) => {
	
		if (!address) return;
		
		setIsLoading(true);
		const result = await checkUser({ field: 'address', value: address,  address: address });
		console.log({result});

		const data = get(result, 'data');
		console.log({data});
		if (!isEmpty(data)) {
			} 

		setIsLoading(false);
	}, [checkUser]);
 		
	return {
		isLoading,
		handleLogin,
	};
}

export default useWallet;
