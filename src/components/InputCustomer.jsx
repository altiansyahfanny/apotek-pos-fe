import React, { useEffect, useState } from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCustomersQuery } from '../redux/api/customerApi';
import { resetForm } from '../redux/reducer/customerSlice';
import Form from './Customer/Form/Create/Form';
import FormInput from './FormInput';
import Modal from './Modal';
import { getComponentModalState, setModalDialog } from '../redux/reducer/componentSlice';

const InputCustomer = ({ setForm, customer_id }) => {
	const dispatch = useDispatch();
	const { modal_add_customer_is_open } = useSelector(getComponentModalState);

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
	}, [customer_id, isSuccess]);

	let content;
	if (isSuccess) {
		content = CUSTOMERS.filter((customer) => customer.status)
			.filter((customer) => regex.test(customer.name))
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

	const closeModal = () => {
		dispatch(setModalDialog({ key: 'modal_add_customer_is_open', value: false }));
		dispatch(resetForm());
	};
	return (
		<>
			<FormInput>
				<FormInput.Label title={'Pasien/Pelanggan'} required={true} />

				<div className="flex gap-x-1.5 items-start">
					<div className="flex-1">
						<FormInput.InputSelectWithSearch
							{...{
								isOpen,
								setIsOpen,
								keyword,
								setKeyword,
								placeholder,
								disabled: isLoading,
								name: 'customer_id',
							}}
						>
							{content}
						</FormInput.InputSelectWithSearch>
					</div>
					<FormInput.SideButton
						bgColor="bg-lime-500"
						onClick={() =>
							dispatch(setModalDialog({ key: 'modal_add_customer_is_open', value: true }))
						}
					>
						<HiOutlinePlus />
					</FormInput.SideButton>
				</div>
			</FormInput>
			<Modal
				isOpen={modal_add_customer_is_open}
				closeModal={closeModal}
				title={'Tambah Pelanggan'}
				width="md"
			>
				<Form closeModal={closeModal} />
			</Modal>
		</>
	);
};

export default InputCustomer;
