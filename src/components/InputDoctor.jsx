import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetDoctorsQuery } from '../redux/api/doctorApi';
import FormInput from './FormInput';
import Modal from './Modal';
import Form from './Doctor/Form/Create/Form';
import { HiOutlinePlus } from 'react-icons/hi';
import { resetForm } from '../redux/reducer/doctorSlice';
import { getComponentModalState, setModalDialog } from '../redux/reducer/componentSlice';

const InputDoctor = ({ setForm, doctor_id }) => {
	const dispatch = useDispatch();
	const { modal_add_doctor_is_open } = useSelector(getComponentModalState);

	const { data: DOCTORS, isLoading, isSuccess } = useGetDoctorsQuery();

	const [keyword, setKeyword] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [placeholder, setPlaceholder] = useState('Pilih Dokter');

	const regex = new RegExp(keyword, 'i');

	const onClick = (doctor) => {
		setIsOpen(false);
		setPlaceholder(doctor.name);
		dispatch(setForm({ key: 'doctor_id', value: doctor.id }));
		dispatch(setForm({ key: 'doctor', value: doctor })); // sebaiknya kasih perkondisian
	};

	useEffect(() => {
		if (isSuccess) {
			if (doctor_id && doctor_id !== '') {
				const currDoctor = DOCTORS.find((doctor) => doctor.id === doctor_id);
				setPlaceholder(currDoctor.name);
			}
		}
	}, [doctor_id, isSuccess]);

	let content;
	if (isSuccess) {
		content = DOCTORS.filter((doctor) => doctor.status)
			.filter((doctor) => regex.test(doctor.name))
			.slice(0, 5)
			.map((doctor, index) => (
				<FormInput.OptionInputSelectWithSearch
					key={index}
					value={doctor.id}
					onClick={() => onClick(doctor)}
					isActive={doctor.id === doctor_id}
				>
					{doctor.name}
				</FormInput.OptionInputSelectWithSearch>
			));
	}

	const closeModal = () => {
		dispatch(setModalDialog({ key: 'modal_add_doctor_is_open', value: false }));
		dispatch(resetForm());
	};

	return (
		<>
			<FormInput>
				<FormInput.Label title={'Dokter'} required={true} />
				<div className="flex gap-x-1.5 items-start">
					<div className="flex-1">
						<FormInput.InputSelectWithSearch
							{...{
								isOpen,
								setIsOpen,
								keyword,
								setKeyword,
								placeholder,
								disabled: isLoading,
								name: 'doctor_id',
							}}
						>
							{content}
						</FormInput.InputSelectWithSearch>
					</div>
					<FormInput.SideButton
						bgColor="bg-lime-500"
						onClick={() =>
							dispatch(setModalDialog({ key: 'modal_add_doctor_is_open', value: true }))
						}
					>
						<HiOutlinePlus />
					</FormInput.SideButton>
				</div>
			</FormInput>
			<Modal
				isOpen={modal_add_doctor_is_open}
				closeModal={closeModal}
				title={'Tambah Dokter'}
				width="lg"
			>
				<Form closeModal={closeModal} />
			</Modal>
		</>
	);
};

export default InputDoctor;
