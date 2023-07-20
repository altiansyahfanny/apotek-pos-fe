import React from 'react';
import { BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { getPrescriptionFormState, setForm } from '../../../../redux/reducer/prescriptionSlice';
import FormInput from '../../../FormInput';

const InputPrescription = () => {
	const dispatch = useDispatch();
	const { prescription_details, doctor } = useSelector(getPrescriptionFormState);

	const addItem = () => {
		const newForm = [...prescription_details];
		newForm.push({ content: '', is_edit: false });
		dispatch(setForm({ key: 'prescription_details', value: newForm }));
	};

	const handleDeleteRow = (index, prescriprion_detail) => {
		const newValue = [...prescription_details];
		if (prescriprion_detail.is_edit) {
			newValue[index] = { ...newValue[index], is_delete: true };
		} else {
			newValue.splice(index, 1);
		}

		dispatch(setForm({ key: 'prescription_details', value: newValue }));
	};

	const onChange = (e, index, prescriprion_detail) => {
		const { value } = e.target;

		const newForm = [...prescription_details];

		if (prescriprion_detail.is_edit) {
			newForm[index] = { ...newForm[index], content: value };
		} else {
			newForm[index] = { ...newForm[index], content: value };
		}

		dispatch(setForm({ key: 'prescription_details', value: newForm }));
	};
	return (
		<div className="border-t mt-4">
			<div className="mt-4">
				<div className="text-gray-700 text-sm">
					<div className="flex">
						<span className="w-1/5">Nama Dokter</span>
						<span className="">:</span>
						<span className="flex-1 ml-2">{doctor.name ?? '...'}</span>
					</div>
					<div className="flex">
						<span className="w-1/5">No. SIP</span>
						<span className="">:</span>
						<span className="flex-1 ml-2">{doctor.sip ?? '...'}</span>
					</div>
				</div>
			</div>

			<div className="mt-4 flex flex-col gap-2">
				{prescription_details.map((prescriprion_detail, index) => {
					if (!prescriprion_detail.is_delete) {
						return (
							<div key={index} className="flex items-start gap-2">
								<span className="text-gray-700 font-semibold text-sm">R/</span>
								<div className="flex-1">
									<FormInput>
										<FormInput.TextArea
											name={`prescription_details[${index}].content`}
											value={prescriprion_detail.content}
											onChange={(e) => onChange(e, index, prescriprion_detail)}
										/>
									</FormInput>
								</div>
								{index !== 0 && (
									<button
										type="button"
										onClick={() => handleDeleteRow(index, prescriprion_detail)}
										className="grid place-content-center rounded px-3 py-2.5 cursor-pointer transition bg-red-500 text-white text-sm"
									>
										<BsTrash />
									</button>
								)}
							</div>
						);
					}
				})}
			</div>
			<div className="mt-2">
				<button type="button" className="btn bg-lime-500 text-white" onClick={addItem}>
					Tambah Item
				</button>
			</div>
		</div>
	);
};

export default InputPrescription;
