import { User } from '@/app/types';
import { useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';

export function useSearchUsers(baseValue: User[]) {
	const [filter, setFilter] = useState('');
	const [users, setUsers] = useState(baseValue);
	const debaunceSearchData = useDebounce(filter, 300);

	function onSearch() {
		if (!baseValue) {
			return [];
		}

		return baseValue?.filter(user => {
			return (
				user.name.toLowerCase().includes(filter.toLowerCase()) ||
				user.email.toLowerCase().includes(filter.toLowerCase())
			);
		});
	}

	useEffect(() => {
		if (debaunceSearchData) {
			setUsers(onSearch());
		} else {
			setUsers(baseValue);
		}
	}, [debaunceSearchData, baseValue]);

	return { setFilter, users, filter };
}
