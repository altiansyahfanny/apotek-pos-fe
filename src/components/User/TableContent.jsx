import React from 'react';
import { IoMdOptions } from 'react-icons/io';
import Table from '../Table';
import { getUserQueryState, setQuery } from '../../redux/reducer/userSlice';
import { useSelector } from 'react-redux';
import { numberTabelWithPagination } from '../../helper/table';

const TableContent = ({ data }) => {
	const { limit, key_search, current_page } = useSelector(getUserQueryState);
	return (
		<div className="mt-2">
			<Table>
				<Table.TH>
					<Table.THD textAlign="center">No</Table.THD>
					<Table.THD>Nama</Table.THD>
					<Table.THD>Username</Table.THD>
					<Table.THD>Peran</Table.THD>
					<Table.THD>Gudang</Table.THD>
					<Table.THD textAlign="center">Aksi</Table.THD>
				</Table.TH>
				<Table.TB>
					{data.data.map((user, index) => (
						<Table.TBR key={index}>
							<Table.TBD textAlign="center">
								{numberTabelWithPagination(index, limit, current_page)}
							</Table.TBD>
							<Table.TBD>{user.name}</Table.TBD>
							<Table.TBD>{user.username}</Table.TBD>
							<Table.TBD>{user.role.name}</Table.TBD>
							<Table.TBD>{user.warehouse.name}</Table.TBD>
							<Table.TBD textAlign="center">
								<div className="flex justify-center p-1 cursor-pointer">
									<IoMdOptions />
								</div>
							</Table.TBD>
						</Table.TBR>
					))}
				</Table.TB>
			</Table>

			<Table.Pagination {...{ data, current_page, setQuery, limit }} />
		</div>
	);
};

export default TableContent;
