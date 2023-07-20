import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

const Button = ({ children, disabled, onClick, color = 'lime' }) => {
	return (
		<button
			type="button"
			className={`w-full py-1.5 bg-${color}-600 hover:bg-${color}-500 transition text-white rounded-lg disabled:bg-${color}-400 focus:outline-none`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

const ModalDate = ({ isOpen, onClose, children }) => {
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
						<div className="flex min-h-full items-center justify-center text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="p-8 transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
									<div className="flex flex-col items-center">{children}</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

ModalDate.Button = Button;

export default ModalDate;
