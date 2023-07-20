import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAccessFormState, setAllForm } from '../../redux/reducer/userAccessSlice';

const Checkbox = ({ label, onChange, checked = false }) => {
	return (
		<div className="flex items-center gap-2">
			<input
				type="checkbox"
				className="w-4 h-4 text-lime-600 bg-gray-100 border-gray-300 rounded focus:ring-lime-500 focus:ring-2 "
				onChange={onChange}
				checked={checked}
			/>

			<span>{label}</span>
		</div>
	);
};

const Form = () => {
	const dispatch = useDispatch();
	const modules = useSelector(getUserAccessFormState);

	const onChange = (modIndex) => {
		const newForm = [...modules];
		newForm[modIndex] = { ...newForm[modIndex], checked: !newForm[modIndex].checked };

		dispatch(setAllForm(newForm));
	};

	const onChangeMenu = (permission_key) => {
		const updatedArray = modules.map((mod) => {
			return {
				...mod,
				menus: mod.menus.map((menu) => {
					if (menu.permission_key === permission_key) {
						return {
							...menu,
							checked: !menu.checked,
						};
					}

					return menu;
				}),
			};
		});

		dispatch(setAllForm(updatedArray));
	};

	const onChangeMenuAction = (permission_key) => {
		const updatedArray = modules.map((mod) => {
			return {
				...mod,
				menus: mod.menus.map((menu) => {
					return {
						...menu,
						menu_actions: menu.menu_actions.map((menu_action) => {
							if (menu_action.permission_key === permission_key) {
								return {
									...menu_action,
									checked: !menu_action.checked,
								};
							}
							return menu_action;
						}),
					};
				}),
			};
		});

		dispatch(setAllForm(updatedArray));
	};

	return (
		<div>
			<div className="grid grid-cols-3 gap-4">
				{modules.map((mod, modIndex) => {
					return (
						<div className="border rounded p-4" key={modIndex}>
							{/* <h1>{mod.name}</h1> */}
							<Checkbox
								label={mod.name}
								onChange={() => onChange(modIndex)}
								checked={mod.checked}
							/>
							{mod.menus.map((menu, menuIndex) => (
								<div key={menuIndex} className="px-4">
									{/* <h2>{menu.name}</h2> */}
									<Checkbox
										label={menu.name}
										checked={menu.checked}
										onChange={() => onChangeMenu(menu.permission_key)}
									/>
									{menu.menu_actions.map((menu_action, index) => (
										<div key={index} className="px-4">
											{/* <h3>{menu_action.name}</h3> */}
											<Checkbox
												label={menu_action.name}
												checked={menu_action.checked}
												onChange={() => onChangeMenuAction(menu_action.permission_key)}
											/>
										</div>
									))}
								</div>
							))}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Form;
