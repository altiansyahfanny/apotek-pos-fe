import React from 'react';
import { BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { ALTERNATIVE_PRICES, PRODUCT_UNITS } from '../../data';
import { formatThousand, formatToRupiah } from '../../helper/currency';
import { getValidationError, preventCharactersOtherThanNumbers } from '../../helper/form';
import { getAddProductFormState, setForm } from '../../redux/reducer/addProductSlice';
import FormInput from '../FormInput';
import InputGroup from '../InputGroup';
import { useState } from 'react';

const InputPrice = ({
	selectedAlternativePrice,
	alternative_price,
	index,
	handleChangeAlternativePrices,
}) => {
	return (
		<div>
			<InputGroup.Label title={`Harga Jual (${selectedAlternativePrice.alternative_price_name})`} />
			<InputGroup
				name={'price'}
				customError={getValidationError(`alternative_prices[${index}].price`)}
			>
				<InputGroup.Text text={'Rp'} />
				<InputGroup.TextInput
					type="text"
					name="price"
					value={formatThousand(alternative_price.price)}
					onChange={(event) => handleChangeAlternativePrices(event, index)}
				/>
			</InputGroup>
		</div>
	);
};
const InputMinimumItem = ({
	selected_product_unit,
	alternative_price,
	index,
	handleChangeAlternativePrices,
}) => {
	return (
		<div className="">
			<InputGroup.Label title={'Jumlah Item'} />
			<InputGroup
				name={'minimum_item'}
				customError={getValidationError(`alternative_prices[${index}].minimum_item`)}
			>
				<InputGroup.Text text={<div className="text-lg">&ge;</div>} />
				<InputGroup.TextInput
					type="text"
					name="minimum_item"
					value={formatThousand(alternative_price.minimum_item)}
					onChange={(event) => handleChangeAlternativePrices(event, index)}
				/>
				<InputGroup.Text text={`/${selected_product_unit.name ?? 'Satuan'}`} />
			</InputGroup>
		</div>
	);
};

const InputAlternativePrice = () => {
	const dispatch = useDispatch();
	const [selectPriceIsVisible, setSelectPriceIsVisible] = useState(false);
	const { alternative_prices, product_unit_id } = useSelector(getAddProductFormState);
	const selected_product_unit = PRODUCT_UNITS.find(
		(product_unit) => product_unit.id == product_unit_id
	);

	const handleChange = (e) => {
		setSelectPriceIsVisible(false);
		const newValue = [...alternative_prices];
		newValue.push({
			alternative_price_category_id: parseInt(e.target.value),
			price: 0,
			minimum_item: 0,
			is_edit: false,
			is_delete: false,
		});

		console.log('newValue : ', newValue);

		dispatch(setForm({ key: 'alternative_prices', value: newValue }));
	};

	const handleDeleteRow = (index) => {
		const newValue = [...alternative_prices];
		if (newValue[index].is_edit) {
			newValue[index] = { ...newValue[index], is_delete: true };
		} else {
			newValue.splice(index, 1);
		}
		dispatch(setForm({ key: 'alternative_prices', value: newValue }));
	};

	const handleChangeAlternativePrices = (event, index) => {
		preventCharactersOtherThanNumbers(event);
		const { name, value } = event.target;
		const numericValue = Number(value);

		const curr = [...alternative_prices];
		curr[index] = { ...curr[index], [name]: numericValue };
		dispatch(setForm({ key: 'alternative_prices', value: curr }));
	};

	return (
		<div>
			<div>
				{alternative_prices.map((alternative_price, index) => {
					const selectedAlternativePrice = ALTERNATIVE_PRICES.find(
						(a) => a.alternative_price_id == alternative_price.alternative_price_category_id
					);
					{
						if (!alternative_price.is_delete) {
							return (
								<div key={index} className="flex gap-1.5 items-start">
									<div className="flex flex-col">
										<div className="opacity-0">Label</div>
										<InputGroup.Button bgColor="bg-transparent">
											<span className="text-gray-700">{`#${index + 2}`}</span>
										</InputGroup.Button>
									</div>
									<InputPrice
										{...{
											selectedAlternativePrice,
											alternative_price,
											index,
											handleChangeAlternativePrices,
										}}
									/>
									<InputMinimumItem
										{...{
											selected_product_unit,
											alternative_price,
											index,
											handleChangeAlternativePrices,
										}}
									/>
									<div className="flex flex-col">
										<div className="opacity-0">Label</div>
										<InputGroup.Button
											textColor="text-white"
											bgColor="bg-red-500"
											onClick={() => handleDeleteRow(index)}
										>
											<BsTrash />
										</InputGroup.Button>
									</div>
								</div>
							);
						}
					}
				})}
			</div>
			{!selectPriceIsVisible && (
				<button
					type="button"
					className="btn bg-lime-500 text-white"
					onClick={() => setSelectPriceIsVisible(true)}
				>
					Tambah Harga
				</button>
			)}
			{selectPriceIsVisible && (
				<FormInput>
					<FormInput.Label title={'Pilih Metode Harga Jual Alternatif (Grosir, Member, Online)'} />
					<FormInput.InputSelect
						name=""
						value=""
						onChange={handleChange}
						disabled={product_unit_id ? false : true}
					>
						<FormInput.InputSelect.Option value={''}>
							{product_unit_id ? 'Pilih Harga Alternatif' : 'Pilih Satuan Produk Terlebih Dahulu'}
						</FormInput.InputSelect.Option>
						{ALTERNATIVE_PRICES.map((alternative_price, index) => (
							<FormInput.InputSelect.Option
								key={index}
								value={alternative_price.alternative_price_id}
							>
								{alternative_price.alternative_price_name}
							</FormInput.InputSelect.Option>
						))}
					</FormInput.InputSelect>
				</FormInput>
			)}
		</div>
	);
};

export default InputAlternativePrice;

// return (
// 	<>
// 		<FormInput>
// 			<FormInput.Label title={'Pilih Metode Harga Jual Alternatif (Grosir, Member, Online)'} />
// 			<FormInput.InputSelect
// 				name=""
// 				value=""
// 				onChange={handleChange}
// 				disabled={product_unit_id ? false : true}
// 			>
// 				<FormInput.InputSelect.Option value={''}>
// 					{product_unit_id ? 'Pilih Harga Alternatif' : 'Pilih Satuan Produk Terlebih Dahulu'}
// 				</FormInput.InputSelect.Option>
// 				{ALTERNATIVE_PRICES.map((alternative_price, index) => (
// 					<FormInput.InputSelect.Option
// 						key={index}
// 						value={alternative_price.alternative_price_id}
// 					>
// 						{alternative_price.alternative_price_name}
// 					</FormInput.InputSelect.Option>
// 				))}
// 			</FormInput.InputSelect>
// 		</FormInput>
// 		{alternative_prices.map((alternative_price, index) => {
// 			const selectedAlternativePrice = ALTERNATIVE_PRICES.find(
// 				(a) => a.alternative_price_id == alternative_price.alternative_price_category_id
// 			);
// 			return (
// 				<div key={index} className="flex gap-1.5 items-start">
// 					<div className="flex flex-col">
// 						<div className="opacity-0">Label</div>
// 						<InputGroup.Button bgColor="bg-transparent">
// 							<span className="text-gray-700">{`#${index + 2}`}</span>
// 						</InputGroup.Button>
// 					</div>
// 					<InputPrice
// 						{...{
// 							selectedAlternativePrice,
// 							alternative_price,
// 							index,
// 							handleChangeAlternativePrices,
// 						}}
// 					/>
// 					<InputMinimumItem
// 						{...{
// 							selected_product_unit,
// 							alternative_price,
// 							index,
// 							handleChangeAlternativePrices,
// 						}}
// 					/>
// 					<div className="flex flex-col">
// 						<div className="opacity-0">Label</div>
// 						<InputGroup.Button
// 							textColor="text-white"
// 							bgColor="bg-red-500"
// 							onClick={() => handleDeleteRow(index)}
// 						>
// 							<BsTrash />
// 						</InputGroup.Button>
// 					</div>
// 				</div>
// 			);
// 		})}
// 	</>
// );
