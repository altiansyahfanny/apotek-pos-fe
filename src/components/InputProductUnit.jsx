import React, { useEffect, useState } from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductUnitsQuery } from '../redux/api/productUnitApi';
import { getComponentModalState, setModalDialog } from '../redux/reducer/componentSlice';
import { resetForm } from '../redux/reducer/customerSlice';
import FormInput from './FormInput';
import Modal from './Modal';
import Form from './ProductUnit/Form/Form';

const InputProductUnit = ({ setForm, product_unit_id }) => {
	const dispatch = useDispatch();
	const { modal_add_product_unit_is_open } = useSelector(getComponentModalState);

	const [keyword, setKeyword] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [placeholder, setPlaceholder] = useState('Pilih Satuan Produk');

	const regex = new RegExp(keyword, 'i');

	const { data: PRODUCT_UNITS, isLoading, isSuccess } = useGetProductUnitsQuery();

	const onClick = (customer) => {
		setIsOpen(false);
		setPlaceholder(customer.name);
		dispatch(setForm({ key: 'product_unit_id', value: customer.id }));
	};

	useEffect(() => {
		if (isSuccess) {
			if (product_unit_id && product_unit_id !== '') {
				const currCustomer = PRODUCT_UNITS.find((customer) => customer.id === product_unit_id);
				setPlaceholder(currCustomer.name);
			}
		}
	}, [product_unit_id, isSuccess]);

	let content;
	if (isSuccess) {
		content = PRODUCT_UNITS.filter((product_unit) => regex.test(product_unit.name))
			.slice(0, 5)
			.map((product_unit, index) => (
				<FormInput.OptionInputSelectWithSearch
					key={index}
					value={product_unit.id}
					onClick={() => onClick(product_unit)}
					isActive={product_unit.id === product_unit_id}
				>
					{product_unit.name}
				</FormInput.OptionInputSelectWithSearch>
			));
	}

	const closeModal = () => {
		dispatch(setModalDialog({ key: 'modal_add_product_unit_is_open', value: false }));
		dispatch(resetForm());
	};
	return (
		<>
			<FormInput>
				<FormInput.Label title={'Satuan Produk'} required={true} />

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
								name: 'product_unit_id',
							}}
						>
							{content}
						</FormInput.InputSelectWithSearch>
					</div>
					<FormInput.SideButton
						bgColor="bg-lime-500"
						onClick={() =>
							dispatch(setModalDialog({ key: 'modal_add_product_unit_is_open', value: true }))
						}
					>
						<HiOutlinePlus />
					</FormInput.SideButton>
				</div>
			</FormInput>
			<Modal
				isOpen={modal_add_product_unit_is_open}
				closeModal={closeModal}
				title={'Tambah Satuan Produk'}
				width="md"
			>
				<Form closeModal={closeModal} />
			</Modal>
		</>
	);
};

export default InputProductUnit;
