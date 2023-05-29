import React from 'react';
import { useSelector } from 'react-redux';
import Form from '../../components/POS/Form/Form';
import InputProduct from '../../components/POS/InputProduct';
import TableProduct from '../../components/POS/TableProduct';
import { formatToRupiah } from '../../helper/currency';
import { countSubtotal } from '../../helper/pos';
import { getForm } from '../../redux/reducer/posSlice';
import { MainLayout } from '../../templates';

const CreateSale = () => {
	const { products } = useSelector(getForm);

	return (
		<div className="p-4 flex-1">
			<MainLayout.PageTitle title={'Point of Sale'} />
			<div className="flex justify-between py-4 border-b">
				<InputProduct />
				<div className="grid place-content-center flex-1">
					<h1 className="text-3xl text-gray-700 tracking-wider font-semibold ">
						{`Rp. ${formatToRupiah(countSubtotal(products))}`}
					</h1>
				</div>
			</div>
			<div className="flex items-start gap-x-4 mt-4">
				<div className="w-1/4 bg-white shadow p-4 rounded">
					<Form />
				</div>
				<div className="w-3/4 bg-white shadow rounded">
					<TableProduct />
				</div>
			</div>
		</div>
	);
};

export default CreateSale;
