import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_CATEGORIES } from '../../data';
import { getAddProductFormState, setForm } from '../../redux/reducer/addProductSlice';
import FormInput from '../FormInput';

const InputCategoryProduct = () => {
	const dispatch = useDispatch();
	const { product_category_id } = useSelector(getAddProductFormState);

	const onChange = (e) => {
		const { value, name } = e.target;
		dispatch(setForm({ key: name, value }));
	};
	return (
		<FormInput>
			<FormInput.Label title={'Kategori Produk'} required={true} />
			<FormInput.InputSelect
				required={true}
				name={'product_category_id'}
				value={product_category_id}
				onChange={onChange}
			>
				<option value={''}>Pilih Kategori Produk</option>
				{PRODUCT_CATEGORIES.map((product_category, index) => (
					<option key={index} value={product_category.id}>
						{product_category.name}
					</option>
				))}
			</FormInput.InputSelect>
		</FormInput>
	);
};

export default InputCategoryProduct;
