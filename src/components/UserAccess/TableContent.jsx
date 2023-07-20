import React from 'react';
import { IoMdOptions } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { getUserAccessQueryState, setQuery } from '../../redux/reducer/userAccessSlice';
import Table from '../Table';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const TableContent = ({ data }) => {
	const navigate = useNavigate();
	const { limit, current_page } = useSelector(getUserAccessQueryState);

	const onClickEdit = (user) => {
		navigate('update-user-access/' + user.id);
	};
	return (
		<div className="mt-2">
			<Table>
				<Table.TH>
					<Table.THD textAlign="center">No</Table.THD>
					<Table.THD>Nama Grup</Table.THD>
					<Table.THD>Deskripsi Grup</Table.THD>
					<Table.THD textAlign="right">Aksi</Table.THD>
				</Table.TH>
				<Table.TB>
					{data.data
						// .filter((user) => user.id !== 1)
						.map((user, index) => (
							<Table.TBR key={index}>
								<Table.TBD textAlign="center">{index + 1}</Table.TBD>
								<Table.TBD>{user.name}</Table.TBD>
								<Table.TBD>Gudang Utama</Table.TBD>
								<Table.TBD textAlign="right">
									<Table.ButtonAction labelIcon={<IoMdOptions />}>
										<Table.ButtonAction.Option
											icon={<AiOutlineArrowRight size={18} />}
											text={'Edit'}
											action={() => onClickEdit(user)}
										/>
									</Table.ButtonAction>
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
