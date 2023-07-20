import moment from 'moment';
import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import { id } from 'react-date-range/dist/locale/index';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { MdOutlineDateRange } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { getSaleQueryState, setQuery } from '../../redux/reducer/saleSlice';
import ModalDate from '../ModalDate';

const FilterDate = () => {
	const dispatch = useDispatch();
	const { date } = useSelector(getSaleQueryState);
	const { start_date, end_date, key } = date;
	const [selectionRange, setSelectionRange] = useState({
		startDate: moment(start_date, 'DD-MM-YYYY').toDate(),
		endDate: moment(end_date, 'DD-MM-YYYY').toDate(),
		key,
	});

	const [isOpen, setIsOpen] = useState(false);

	const handleSelect = (item) => {
		setSelectionRange(item.selection);
	};

	const handleSubmit = () => {
		setIsOpen(false);
		const value = {
			start_date: moment(selectionRange.startDate).format('DD-MM-YYYY'),
			end_date: moment(selectionRange.endDate).format('DD-MM-YYYY'),
			key: selectionRange.key,
		};
		dispatch(setQuery({ key: 'date', value }));
	};
	return (
		<div>
			<div
				className="form-input cursor-pointer flex items-center justify-between gap-2"
				onClick={() => setIsOpen(true)}
			>
				<span>
					{`${moment(start_date, 'DD-MM-YYYY').format('DD MMM YYYY')} -
					${moment(end_date, 'DD-MM-YYYY').format('DD MMM YYYY')}`}
				</span>

				<span className="text-gray-600">
					<MdOutlineDateRange size={16} />
				</span>
			</div>
			<ModalDate isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<DateRange
					locale={id}
					ranges={[selectionRange]}
					onChange={handleSelect}
					color={'#65a30d'}
					rangeColors={['#65a30d']}
				/>
				<ModalDate.Button onClick={handleSubmit}>Terapkan</ModalDate.Button>
			</ModalDate>
		</div>
	);
};

export default FilterDate;
