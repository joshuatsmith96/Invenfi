import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

type LoginInputType = {
  id: string,
  label: string;
  type: 'text' | 'password';
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, required: boolean) => void;
  required: boolean
};

const Field = ({id, label, type, placeholder, onChange, required}: LoginInputType) => {
  return (
    <div className='mb-5 w-full'>
      <p className="mb-2 font-medium">{label}</p>
      <div className="border flex flex-row items-center p-3 w-full border-[#d9d9d9] rounded-lg">
        <FontAwesomeIcon icon={type==="password" ? faLock : faUser} />
        <input id={id} type={type} className="outline-none pl-2 w-full" placeholder={placeholder} onChange={(e) => onChange?.(e, required)} />
      </div>
      <p className='hidden text-red-400 mt-1 text-sm'>Please enter a {label.toLowerCase()}</p>
    </div>
  );
};

export default Field