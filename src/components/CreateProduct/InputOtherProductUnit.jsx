import React from 'react';
import { BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_UNITS } from '../../data';
import { getAddProductFormState, setForm } from '../../redux/reducer/addProductSlice';
import InputGroup from '../InputGroup';
import FormInput from '../FormInput';
import { getValidationError, preventCharactersOtherThanNumbers } from '../../helper/form';

const InputNumberOfOtherProductUnits = ({ index, product_unit, handleChange }) => {
	return (
		<FormInput>
			<FormInput.TextInput
				type="text"
				value={product_unit.number_of_other_product_units}
				name={'number_of_other_product_units'}
				onChange={(event) => handleChange(event, index)}
				customError={getValidationError(
					`other_product_units[${index}].number_of_other_product_units`
				)}
			/>
		</FormInput>
	);
};
const InputNumberOfProductUnits = ({ index, product_unit, handleChange, selectedProductUnit }) => {
	return (
		<div className=" flex items-center gap-1.5">
			<div className="text-gray-700"> = </div>
			<InputGroup
				name="number_of_product_units"
				customError={getValidationError(`other_product_units[${index}].number_of_product_units`)}
			>
				<InputGroup.TextInput
					type="text"
					name="number_of_product_units"
					value={product_unit.number_of_product_units}
					onChange={(event) => handleChange(event, index)}
				/>
				<InputGroup.Text text={`/${selectedProductUnit.name}`} />
			</InputGroup>
		</div>
	);
};
const InputProductUnitId = ({ index, product_unit, handleChange }) => {
	return (
		<FormInput>
			<FormInput.InputSelect
				name="product_unit_id"
				value={product_unit.product_unit_id}
				onChange={(event) => handleChange(event, index)}
				customError={getValidationError(`other_product_units[${index}].product_unit_id`)}
			>
				<FormInput.InputSelect.Option value={''}>Satuan Produk</FormInput.InputSelect.Option>
				{PRODUCT_UNITS.map((product_unit, index) => (
					<FormInput.InputSelect.Option key={index} value={product_unit.id}>
						{product_unit.name}
					</FormInput.InputSelect.Option>
				))}
			</FormInput.InputSelect>
		</FormInput>
	);
};

const InputOtherProductUnit = () => {
	const dispatch = useDispatch();
	const { other_product_units, product_unit_id } = useSelector(getAddProductFormState);

	const selectedProductUnit = PRODUCT_UNITS.find(
		(product_unit) => product_unit.id == product_unit_id
	);

	const handleChange = (event, index) => {
		preventCharactersOtherThanNumbers(event);
		const { value, name } = event.target;
		const numericValue = Number(value);

		const new_form = [...other_product_units];
		new_form[index] = { ...new_form[index], [name]: numericValue };

		dispatch(setForm({ key: 'other_product_units', value: new_form }));
	};

	const handleDeleteOtherProductUnit = (index) => {
		const new_product_unit = [...other_product_units];
		if (new_product_unit[index].is_edit) {
			new_product_unit[index] = { ...new_product_unit[index], is_delete: true };
		} else {
			new_product_unit.splice(index, 1);
		}
		dispatch(setForm({ key: 'other_product_units', value: new_product_unit }));
	};

	const onClick = () => {
		const new_product_unit = [...other_product_units];
		new_product_unit.push({
			product_unit_id: '',
			number_of_other_product_units: 0,
			number_of_product_units: 0,
			is_delete: false,
			is_edit: false,
		});
		dispatch(setForm({ key: 'other_product_units', value: new_product_unit }));
	};

	return (
		<div className="mt-1 flex flex-col gap-1.5">
			{other_product_units.map((product_unit, index) => {
				if (!product_unit.is_delete) {
					return (
						<div key={index} className="flex gap-1.5 items-start">
							<div className="grid grid-cols-3 gap-1.5 items-start">
								<InputNumberOfOtherProductUnits {...{ index, product_unit, handleChange }} />
								<InputProductUnitId {...{ index, product_unit, handleChange }} />
								<InputNumberOfProductUnits
									{...{ index, product_unit, handleChange, selectedProductUnit }}
								/>
							</div>
							<InputGroup.Button onClick={() => handleDeleteOtherProductUnit(index)}>
								<BsTrash />
							</InputGroup.Button>
						</div>
					);
				}
			})}
			<div>
				<button
					className="bg-lime-500 text-white text-sm rounded px-3 text-center py-1.5"
					onClick={onClick}
				>
					Tambah Satuan Lainnya
				</button>
			</div>
		</div>
	);
};

export default InputOtherProductUnit;
