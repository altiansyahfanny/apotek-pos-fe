import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getForm, setForm } from '../../redux/reducer/posSlice';
import FormInputTable from '../../FormInputTabel';
import { getPrescriptionFormState, setForm } from '../../../redux/reducer/prescriptionSlice';

const InputBatch = ({ index }) => {
	const dispatch = useDispatch();
	const { product_prescriptions } = useSelector(getPrescriptionFormState);
	const { product_stocks, product_stock_type } = product_prescriptions[index];

	const onClickOption = (product_stock) => {
		const newProducts = [...product_prescriptions];
		newProducts[index] = {
			...newProducts[index],
			product_stock_id: product_stock.id,
			product_stock_type: `${product_stock.batch_number} (${product_stock.qty})`,
		};
		dispatch(setForm({ key: 'products', value: newProducts }));
	};

	return (
		<FormInputTable.InputSelect
			className={'w-28'}
			value={product_stock_type ?? 'Pilih Batch'}
			index={index}
			name={'product_stock_id'}
		>
			{product_stocks.map((ps, index) => (
				<FormInputTable.Option key={index} onClick={() => onClickOption(ps)}>
					{`${ps.batch_number} (${ps.qty})`}
				</FormInputTable.Option>
			))}
		</FormInputTable.InputSelect>
	);
};

export default InputBatch;
