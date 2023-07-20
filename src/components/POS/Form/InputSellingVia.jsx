import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getForm, setForm } from '../../../redux/reducer/posSlice';
import FormInput from '../../FormInput';
import { useState } from 'react';

const DATAS = [
	'Offline',
	'GoApotik',
	'GrabHealth',
	'GrabMart',
	'Halodoc',
	'KlikDokter',
	'Shopee',
	'Tiktok',
	'Tokopedia',
	'Whatsapp',
	'Lainya',
];

const InputSellingVia = () => {
	const dispatch = useDispatch();
	const { selling_via } = useSelector(getForm);

	const [keyword, setKeyword] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const regex = new RegExp(keyword, 'i');

	const onClick = (value) => {
		setIsOpen(false);
		dispatch(setForm({ key: 'selling_via', value }));
	};
	return (
		<FormInput>
			<FormInput.Label title={'Penjualan Via'} required={true} />
			<FormInput.InputSelectWithSearch
				{...{
					isOpen,
					setIsOpen,
					keyword,
					setKeyword,
					placeholder: selling_via,
					disabled: false,
				}}
			>
				{DATAS.filter((data) => regex.test(data))
					.slice(0, 5)
					.map((data, index) => (
						<FormInput.OptionInputSelectWithSearch
							key={index}
							value={data}
							onClick={() => onClick(data)}
							isActive={data === selling_via}
						>
							{data}
						</FormInput.OptionInputSelectWithSearch>
					))}
			</FormInput.InputSelectWithSearch>
		</FormInput>
	);
};

export default InputSellingVia;
