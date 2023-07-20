import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toastError, toastInfo, toastSuccess } from '../../../helper/toast';
import { useDeletePendingSaleMutation, useGetPendingSalesQuery } from '../../../redux/api/saleApi';
import { resetForm, setAllForm } from '../../../redux/reducer/posSlice';
import Modal from '../../Modal';
import ModalAlert from '../../ModalAlert';

const PendingSaleButton = () => {
	const dispatch = useDispatch();

	const { data, ...responseQuery } = useGetPendingSalesQuery();
	const [deleteSale, responseDelete] = useDeletePendingSaleMutation();

	const [isOpen, setIsOpen] = useState(false);
	const [alertIsOpen, setAlertIsOpen] = useState(false);

	const [selectedItem, setSelectedItem] = useState({});

	const handleClickButton = () => {
		if (data?.length < 1) return toastInfo('Penjualan Tertunda Kosong');
		setIsOpen(true);
	};

	const handleClickItem = (sale) => {
		setSelectedItem(sale);
		setAlertIsOpen(true);
	};

	const handleSelectItem = () => {
		setIsOpen(false);
		setAlertIsOpen(false);

		const sale = { ...selectedItem };

		const products = sale.product_sales.map((ps) => {
			const product_stock = ps.product.product_stocks.find(
				(product_stock) => product_stock.id === ps.product_stock_id
			);

			const other_product_units = [...ps.product.other_product_units];
			let new_product_units = [
				{
					...ps.product.product_unit,
					number_of_other_product_units: 1,
					number_of_product_units: 1,
				},
			];
			if (other_product_units.length) {
				other_product_units.map((other_product_unit) =>
					new_product_units.push({
						id: other_product_unit.product_unit.id,
						name: other_product_unit.product_unit.name,
						number_of_other_product_units: other_product_unit.number_of_other_product_units,
						number_of_product_units: other_product_unit.number_of_product_units,
					})
				);
			}

			const product_unit = new_product_units.find(
				(product_unit) => product_unit.id === ps.product_unit_id
			);

			return {
				id: ps.product.id,
				name: ps.product.name,
				selling_price: ps.product.price,
				product_subtotal: ps.total,
				price: ps.price,

				product_stock_id: ps.product_stock_id,
				product_stock_type: `${product_stock.batch_number} (${product_stock.qty})`,
				product_stocks: ps.product.product_stocks,

				product_units: new_product_units,
				product_unit_id: ps.product_unit_id,
				product_unit_type: product_unit.name,

				alternative_prices: ps.product.alternative_prices,

				qty_from_product_unit: product_unit.number_of_product_units,
				qty: ps.total / (product_unit.number_of_product_units * ps.price),

				is_custom_price: ps.is_custom_price,
				price_type: ps.price_type,
				is_pending: true,
			};
		});

		const { customer, product_sales, ...newSale } = sale;

		dispatch(
			setAllForm({
				...newSale,
				date: moment(newSale.date).format('YYYY-MM-DDTHH:mm'),
				products,
			})
		);
	};

	const handleDeleteItem = async () => {
		try {
			const response = await deleteSale(selectedItem.id).unwrap();
			toastSuccess(response.message);
			setAlertIsOpen(false);
			dispatch(resetForm());
		} catch (error) {
			toastError(error.data.message);
		}
	};

	let content;
	if (responseQuery.isError) {
		content = (
			<p className="text-gray-800 text-center">
				{responseQuery.error.status === 404 ? 'Kosong' : 'Terjadi Kesalahan'}
			</p>
		);
	}

	if (responseQuery.isSuccess) {
		content = (
			<div className="flex flex-col gap-2">
				{data.map((sale) => (
					<div
						key={sale.id}
						className="border rounded p-4 cursor-pointer hover:bg-gray-100 text-gray-700"
						onClick={() => handleClickItem(sale)}
					>
						<p>{sale.customer.name}</p>
						<p className="text-sm text-gray-600">
							{moment(sale.date).format('dddd, MMMM YYYY HH:mm')}
						</p>
					</div>
				))}
			</div>
		);
	}

	return (
		<>
			<button
				className="bg-amber-400 rounded  w-full px-2 py-3 text-xs font-semibold tracking-wide text-white relative"
				onClick={handleClickButton}
			>
				Penjulan Tertunda
				<div className="bg-red-500 absolute -top-1 -right-1 w-5 grid place-content-center aspect-square rounded-full text-xs">
					{responseQuery.isSuccess ? data.length : 0}
				</div>
			</button>
			<Modal
				closeModal={() => setIsOpen(false)}
				isOpen={isOpen}
				title={'Daftar Penjualan Tertunda'}
			>
				{content}
			</Modal>
			<ModalAlert title={'Pilih Aksi'} isOpen={alertIsOpen} onClose={() => setAlertIsOpen(false)}>
				<ModalAlert.Button
					onClick={handleSelectItem}
					color="sky"
					disabled={responseDelete.isLoading}
				>
					Pilih
				</ModalAlert.Button>
				<ModalAlert.Button onClick={handleDeleteItem} disabled={responseDelete.isLoading}>
					Hapus
				</ModalAlert.Button>
				<ModalAlert.Button onClick={() => setAlertIsOpen(false)} color="slate">
					Batal
				</ModalAlert.Button>
			</ModalAlert>
		</>
	);
};

export default PendingSaleButton;
