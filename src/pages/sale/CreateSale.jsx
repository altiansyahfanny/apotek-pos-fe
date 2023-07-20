import React from 'react';
import Form from '../../components/POS/Form/Form';
import InputProduct from '../../components/POS/InputProduct';
import TableProduct from '../../components/POS/TableProduct';
import { formatToRupiah } from '../../helper/currency';
import { countTotal } from '../../helper/pos';
import { MainLayout } from '../../templates';
import { useSelector } from 'react-redux';
import { getForm } from '../../redux/reducer/posSlice';

const CreateSale = () => {
	const form = useSelector(getForm);
	return (
		<MainLayout title={'Point of Sale'}>
			<div className="flex justify-between py-4 border-b">
				<div className="w-1/4">
					<InputProduct />
				</div>
				<div className="grid place-content-center">
					<h1 className="text-3xl text-gray-700 font-semibold">
						{`${formatToRupiah(countTotal(form))}`}
					</h1>
				</div>
			</div>
			<div className="flex items-start gap-x-4 mt-4">
				<div className="w-1/4 bg-white shadow p-4 rounded border-t">
					<Form />
				</div>
				<div className="w-3/4 bg-white">
					<TableProduct />
				</div>
			</div>
		</MainLayout>
	);
};

export default CreateSale;
