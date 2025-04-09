export const formatToClientDate = (date?: Date, birth?: boolean) => {
	if (!date) {
		return '';
	}

	if (birth) {
		return new Date(date).toLocaleDateString();
	}

	return new Date(date).toLocaleDateString(undefined, {
		hour: 'numeric',
		minute: 'numeric',
	});
};
