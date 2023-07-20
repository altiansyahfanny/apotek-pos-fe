import React from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_UNITS } from '../../data';
import { getAddProductFormState, setForm } from '../../redux/reducer/addProductSlice';
import FormInput from '../FormInput';
import InputOtherProductUnit from './InputOtherProductUnit';

const InputProductUnit = () => {
	const dispatch = useDispatch();
	const { product_unit_id, other_product_units, is_edit } = useSelector(getAddProductFormState);

	const onChange = (e) => {
		const { value, name } = e.target;
		dispatch(setForm({ key: name, value }));

		// jika value === '' maka reset otherProductUnits
		if (value.length === 0) dispatch(setForm({ key: 'other_product_units', value: [] }));
	};

	return (
		<FormInput>
			<FormInput.Label title={'Satuan Produk (Silakan pilih satuan terkecil)'} required={true} />
			<div className="flex gap-1.5 items-start">
				<div className="flex-1">
					<FormInput.InputSelect
						name={'product_unit_id'}
						value={product_unit_id}
						onChange={onChange}
						disabled={is_edit}
					>
						<FormInput.InputSelect.Option value={''}>
							Pilih Satuan Produk
						</FormInput.InputSelect.Option>
						{PRODUCT_UNITS.map((product_unit, index) => (
							<FormInput.InputSelect.Option key={index} value={product_unit.id}>
								{product_unit.name}
							</FormInput.InputSelect.Option>
						))}
					</FormInput.InputSelect>
				</div>
				<FormInput.SideButton
					bgColor="bg-lime-500"
					onClick={() => console.log('other_product_units: ', other_product_units)}
				>
					<HiOutlinePlus />
				</FormInput.SideButton>
			</div>
			<div className="">{product_unit_id && <InputOtherProductUnit />}</div>
		</FormInput>
	);
};

export default InputProductUnit;
