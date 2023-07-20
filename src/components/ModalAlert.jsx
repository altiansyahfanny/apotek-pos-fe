import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

const Button = ({ children, disabled, onClick, color = 'red' }) => {
	return (
		<button
			type="button"
			className={`w-20 py-2 bg-${color}-600 hover:bg-${color}-500 transition text-white rounded-lg disabled:bg-${color}-400 focus:outline-none`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

const ModalAlert = ({ title = 'Title', isOpen, onClose, children }) => {
	const closeAlert = () => onClose();

	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative" style={{ zIndex: 1000 }} onClose={closeAlert}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-70" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
									<div className="">
										<h2 className="text-2xl font-medium text-center">{title}</h2>
										<div className="flex items-center gap-x-2 mt-6 justify-center">{children}</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

ModalAlert.Button = Button;

export default ModalAlert;
