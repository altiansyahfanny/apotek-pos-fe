import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
// import { resetErrors } from '../redux/reducers/validationSlice';

const Modal = ({ title, isOpen, closeModal, children, width = '2xl' }) => {
	const dispatch = useDispatch();
	const handleCloseModal = () => {
		closeModal();
		// dispatch(resetErrors());
	};

	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative" style={{ zIndex: 999 }} onClose={handleCloseModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-70 z-40" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto z-50">
						<div className="flex min-h-full items-center justify-center p-16 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel
									className={`w-full max-w-${width} transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all`}
								>
									<div className="flex items-center justify-between">
										<Dialog.Title
											as="h3"
											className="text-lg font-medium leading-6 text-gray-900 font-pasicico"
										>
											{title}
										</Dialog.Title>
										<button
											type="button"
											className="font-medium border w-7 rounded-full text-gray-800 aspect-square grid place-content-center hover:bg-gray-100 transition hover:scale-110 hover:shadow hover:text-gray-600 focus:outline-none"
											onClick={handleCloseModal}
										>
											X
										</button>
									</div>
									<hr className="my-4" />
									<div>{children}</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default Modal;
