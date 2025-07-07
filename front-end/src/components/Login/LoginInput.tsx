import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

type LoginInputType = {
    label: string,
    type: "text" | "password",
    placeholder: string
}

const LoginInput = ({label, type, placeholder}: LoginInputType) => {
  return (
    <div className='mb-5'>
      <p className="mb-2 font-medium">{label}</p>
      <div className="border flex flex-row items-center p-3 w-[400px] border-[#d9d9d9] rounded-lg">
        <FontAwesomeIcon icon={type==="password" ? faLock : faUser} />
        {type === "text" ? <input type="text" className="outline-none pl-2 w-full" placeholder={placeholder} /> : <input type="password" className="outline-none pl-2 w-full" placeholder="Enter your username" />}
      </div>
      {type === "password" ? <div className='flex flex-row justify-right'><Link to="/" className='text-right font-light text-sm mt-2 w-full'>Forgot Password?</Link></div> : ""}
    </div>
  );
};

export default LoginInput