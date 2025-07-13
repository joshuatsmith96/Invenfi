import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

type LoginInputType = {
  id: string,
  label: string;
  type?: 'password' | 'user' | 'custom';
  customIcon?: IconProp,
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, required: boolean) => void;
  required: boolean
};

const Field = ({id, label, type, customIcon, placeholder, onChange, required}: LoginInputType) => {
  console.log("Type", type)
  console.log("Custom Icon", customIcon)
  return (
    <div className='mb-5 w-full'>
      <p className="mb-2 font-medium">{label}</p>
      <div className="border flex flex-row items-center p-3 w-full border-[#d9d9d9] rounded-lg">
        {type === 'password' || type === 'user' ? <FontAwesomeIcon icon={type==="password" ? faLock : faUser} /> : ""}
        {type === 'custom' && customIcon != undefined ? <FontAwesomeIcon icon={customIcon} /> : ""}
        <input id={id} type={type} className="outline-none pl-2 w-full" placeholder={placeholder} onChange={(e) => onChange?.(e, required)} />
      </div>
      <p className='hidden text-red-400 mt-1 text-sm'>Please enter a {label.toLowerCase()}</p>
    </div>
  );
};

export default Field