export const numberTabelWithPagination = (index, limit, current_page) => {
	return index + 1 + limit * (current_page - 1);
};
