import React from 'react';
import { FaRandom } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { FormInput } from '../../components';
import InputAlternativePrice from '../../components/CreateProduct/InputAlternativePrice';
import InputCategoryProduct from '../../components/CreateProduct/InputCategoryProduct';
import InputPrice from '../../components/CreateProduct/InputPrice';
import InputProductUnit from '../../components/CreateProduct/InputProductUnit';
import { PRODUCT_STATUSES, RACKS, SUPPLIERS } from '../../data';
import { toastError, toastSuccess } from '../../helper/toast';
import { useCreateProductMutation, useUpdateProductMutation } from '../../redux/api/productApi';
import { getAddProductFormState, resetForm, setForm } from '../../redux/reducer/addProductSlice';
import { resetErrors, setErrors } from '../../redux/reducer/validationSlice';
import { MainLayout } from '../../templates';
import { useNavigate } from 'react-router-dom';
import { generateSKU, tranformForm } from '../../helper/createProduct';
import { formatThousand, formatToRupiah } from '../../helper/currency';

const preventCharactersOtherThanNumbers = (event) => {
	event.target.value = event.target.value.replace(/[^0-9]/g, '');
};

const CreateProduct = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const form = useSelector(getAddProductFormState);
	const { product_category_id, price } = useSelector(getAddProductFormState);

	const [create, { isLoading }] = useCreateProductMutation();
	const [update, responseUpdate] = useUpdateProductMutation();

	const handleSubmit = async () => {
		const data = tranformForm(form);

		console.log('data : ', data);
		// return;
		dispatch(resetErrors());

		try {
			let response;

			if (form.is_edit) {
				response = await update(data).unwrap();
			} else {
				response = await create(data).unwrap();
			}

			navigate('/dashboard/products', { replace: true });
			toastSuccess(response.message);
			dispatch(resetForm());
		} catch (error) {
			if (error.status === 422) return dispatch(setErrors(error.data.errors));
			toastError(error.data.message);
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		dispatch(setForm({ key: name, value: value }));
	};

	const handleChangeNumber = (event) => {
		preventCharactersOtherThanNumbers(event);
		const { name, value } = event.target;
		dispatch(setForm({ key: name, value: Number(value) }));
	};

	return (
		<MainLayout title="Tambah Produk">
			<div className="grid grid-cols-2 gap-4">
				<div className="flex flex-col gap-1.5">
					<h1 className="text-gray-700 text-xl mb-2">Informasi Produk</h1>
					<FormInput>
						<FormInput.Label title={'Nama Produk'} required={true} />
						<FormInput.TextInput
							required={true}
							name={'name'}
							value={form.name}
							onChange={handleChange}
						/>
					</FormInput>
					<FormInput>
						<FormInput.Label title={'Nama Supplier/Pabrik'} />
						<FormInput.TextInput
							required={true}
							name={'factory_name'}
							value={form.factory_name}
							onChange={handleChange}
						/>
					</FormInput>
					<FormInput>
						<FormInput.Label title={'Kode Produk (SKU)'} required={true} />
						<div className="flex gap-x-1.5 items-start">
							<div className="flex-1">
								<FormInput.TextInput
									required={true}
									name={'sku_code'}
									value={form.sku_code}
									onChange={handleChange}
								/>
							</div>
							<FormInput.SideButton
								bgColor="bg-lime-500"
								onClick={() =>
									dispatch(setForm({ key: 'sku_code', value: generateSKU(form.name) }))
								}
							>
								<FaRandom />
							</FormInput.SideButton>
						</div>
					</FormInput>
					<FormInput>
						<FormInput.Label title={'Barcode'} required={true} />
						<FormInput.TextInput
							required={true}
							name={'barcode'}
							value={form.barcode}
							onChange={handleChange}
						/>
					</FormInput>
					<FormInput>
						<FormInput.Label title={'Zat Aktif'} />
						<FormInput.TextInput
							label={'Zat Aktif'}
							name={'active_substance'}
							value={form.active_substance}
							onChange={handleChange}
						/>
					</FormInput>
					<FormInput>
						<FormInput.Label title={'Bentuk dan Kekuatan Kesediaan'} />
						<FormInput.TextInput name={'sku_code'} value={form.sku_code} onChange={handleChange} />
					</FormInput>
					<FormInput>
						<FormInput.Label title={'Informasi Lainnya'} />
						<FormInput.TextInput
							name={'other_information'}
							value={form.other_information}
							onChange={handleChange}
						/>
					</FormInput>
					<FormInput>
						<FormInput.Label title={'Status Produk'} required={true} />
						<FormInput.InputSelect
							value={form.product_status_id}
							name={'product_status_id'}
							onChange={handleChange}
						>
							<FormInput.InputSelect.Option value={''}>
								Pilih Status Produk
							</FormInput.InputSelect.Option>
							{PRODUCT_STATUSES.map((product_status, index) => (
								<FormInput.InputSelect.Option key={index} value={product_status.id}>
									{product_status.name}
								</FormInput.InputSelect.Option>
							))}
						</FormInput.InputSelect>
					</FormInput>
				</div>
				<div className="flex flex-col gap-1.5">
					<h1 className="text-gray-700 text-xl mb-2">Informasi Harga Produk</h1>
					<InputCategoryProduct />
					{product_category_id && product_category_id != 2 && (
						<>
							<InputProductUnit />
							<FormInput>
								<FormInput.Label title={'Minimum Stok'} required={false} />
								<FormInput.TextInput
									type="text"
									name={'minimum_stock'}
									value={form.minimum_stock}
									onChange={handleChangeNumber}
								/>
							</FormInput>

							<FormInput>
								<FormInput.Label title={'Rak Penyimpanan'} required={true} />
								<FormInput.InputSelect
									value={form.rack_id}
									name={'rack_id'}
									onChange={handleChange}
								>
									<FormInput.InputSelect.Option value={''}>
										Pilih Rak Penyimpanan
									</FormInput.InputSelect.Option>
									{RACKS.map((rack, index) => (
										<FormInput.InputSelect.Option key={index} value={rack.id}>
											{rack.name}
										</FormInput.InputSelect.Option>
									))}
								</FormInput.InputSelect>
							</FormInput>

							<InputPrice />
							<InputAlternativePrice />
						</>
					)}

					{product_category_id && product_category_id == 2 && (
						<FormInput>
							<FormInput.Label title={'Harga Jual'} required={true} />
							<FormInput.TextInput
								value={formatThousand(price)}
								type={'text'}
								name={'price'}
								onChange={handleChangeNumber}
							/>
						</FormInput>
					)}
				</div>
			</div>
			<hr className="my-4" />
			<div className="flex justify-end">
				<button
					className="bg-lime-500 text-sm text-white px-5 py-1.5 rounded hover:bg-primary transition"
					onClick={handleSubmit}
					disabled={isLoading || responseUpdate.isLoading}
				>
					{form.is_edit ? 'Ubah' : 'Simpan'}
				</button>
			</div>
		</MainLayout>
	);
};

export default CreateProduct;
