import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

type LoginInputType = {
  id: string,
  label: string;
  type: 'text' | 'password';
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Field = ({id, label, type, placeholder, onChange}: LoginInputType) => {
  return (
    <div className='mb-5 w-full'>
      <p className="mb-2 font-medium">{label}</p>
      <div className="border flex flex-row items-center p-3 w-full border-[#d9d9d9] rounded-lg">
        <FontAwesomeIcon icon={type==="password" ? faLock : faUser} />
        {type === "text" ? <input id={id} type="text" className="outline-none pl-2 w-full" placeholder={placeholder} onChange={onChange} /> : <input id={id} type="password" className="outline-none pl-2 w-full" placeholder="Enter your username" onChange={onChange} />}
      </div>
      <p className='hidden text-red-400 mt-1 text-sm'>Please enter a {label.toLowerCase()}</p>
    </div>
  );
};

export default Field