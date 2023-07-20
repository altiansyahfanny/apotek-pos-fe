import { Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { BsGear, BsPower } from 'react-icons/bs';
import { FaPowerOff, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ProfilePic } from '../../../assets';
import { useSendLogoutMutation } from '../../../redux/api/authApi';
import { BiLogIn, BiUser } from 'react-icons/bi';

const Profile = () => {
	const [isOpen, setIsOpen] = useState(false);

	const [sendLogout, { isLoading }] = useSendLogoutMutation();

	const ref = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await sendLogout().unwrap();
			navigate('/login');
		} catch (error) {
			console.log('error : ', error);
		}
	};

	return (
		<div className="relative" ref={ref} onClick={() => setIsOpen(!isOpen)}>
			<div className="flex items-center gap-x-3 text-gray-300 hover:text-white cursor-pointer">
				<div className="border w-10 h-10 rounded-full grid place-content-center">
					<img className="w-8 h-8  aspect-square rounded-full" src={ProfilePic} />
				</div>
				<p className="font-normal text-sm">Owner</p>
			</div>

			<Transition appear show={isOpen} as={Fragment}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300 origin-top-right"
					enterFrom="opacity-0 scale-0"
					enterTo="opacity-100 scale-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-0"
				>
					<div className="absolute bg-white right-0 top-14 rounded border">
						<div className="border-b py-1.5">
							<Link>
								<div className="flex items-center gap-3 py-1.5 px-3 min-w-[150px] hover:bg-gray-100 transition-all">
									<BiUser color="#4b5563" />
									<span className="text-gray-600 text-sm">Profile</span>
								</div>
							</Link>
							<Link>
								<div className="flex items-center gap-3 py-1.5 px-3 min-w-[150px] hover:bg-gray-100 transition-all">
									<BsGear color="#4b5563" />
									<span className="text-gray-600 text-sm">Pengaturan</span>
								</div>
							</Link>
						</div>
						<div className="py-1.5">
							<button onClick={handleLogout} disabled={isLoading}>
								<div className="flex items-center gap-3 py-1.5 px-3 min-w-[150px] hover:bg-gray-100 transition-all">
									<BsPower color="#4b5563" />
									<span className="text-gray-600 text-sm">Keluar</span>
								</div>
							</button>
						</div>
					</div>
				</Transition.Child>
			</Transition>
		</div>
	);
};

export default Profile;
