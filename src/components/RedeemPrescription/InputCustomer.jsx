import React, { useEffect, useState } from 'react';
import FormInput from '../FormInput';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCustomersQuery } from '../../redux/api/customerApi';
import { getPrescriptionFormState, setForm } from '../../redux/reducer/prescriptionSlice';

const InputCustomer = () => {
	const dispatch = useDispatch();
	const { customer_id } = useSelector(getPrescriptionFormState);

	const [keyword, setKeyword] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [placeholder, setPlaceholder] = useState('Pilih Pelanggan');

	const regex = new RegExp(keyword, 'i');

	const { data: CUSTOMERS, isLoading, isSuccess } = useGetCustomersQuery();

	const onClick = (customer) => {
		setIsOpen(false);
		setPlaceholder(customer.name);
		dispatch(setForm({ key: 'customer_id', value: customer.id }));
	};

	useEffect(() => {
		if (isSuccess) {
			if (customer_id && customer_id !== '') {
				const currCustomer = CUSTOMERS.find((customer) => customer.id === customer_id);
				setPlaceholder(currCustomer.name);
			}
		}
	}, [customer_id]);

	let content;
	if (isSuccess) {
		content = CUSTOMERS.filter((customer) => regex.test(customer.name))
			.slice(0, 5)
			.map((curtomer, index) => (
				<FormInput.OptionInputSelectWithSearch
					key={index}
					value={curtomer.id}
					onClick={() => onClick(curtomer)}
					isActive={curtomer.id === customer_id}
				>
					{curtomer.name}
				</FormInput.OptionInputSelectWithSearch>
			));
	}
	return (
		<FormInput>
			<FormInput.Label title={'Pasien/Pelanggan'} required={true} />
			<FormInput.InputSelectWithSearch
				{...{ isOpen, setIsOpen, keyword, setKeyword, placeholder, disabled: isLoading }}
			>
				{content}
			</FormInput.InputSelectWithSearch>
		</FormInput>
	);
};

export default InputCustomer;
