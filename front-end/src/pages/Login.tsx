import '../animations.css';
import BackgroundBlobs from '../components/Blocks/Blob/BackgroundBlobs';
import LoginContainer from '../views/Login/LoginContainer';
import RegisterSection from '../views/Login/RegisterSection';
import Register from '../views/Register/Register';
import { useRef } from 'react';

type LoginProps = {
  onLogin: () => void;
};

const Login = ({ onLogin }: LoginProps) => {
  const registerRef = useRef<HTMLDivElement>(null);
  const loginRef = useRef<HTMLDivElement>(null);
  const regSectionRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center overflow-hidden max-md:justify-start pt-15">
      <BackgroundBlobs />
      <h1 className='text-4xl z-5 mb-10 font-bold max-[480px]:text-3xl'>Welcome to <span className='text-[#5D49EE]'>Invenfi</span></h1>
      <div className='z-5 flex flex-col gap-5' ref={loginRef}>
        <LoginContainer onLogin={onLogin} regSectionRef={regSectionRef}/>
        <RegisterSection registerRef={registerRef} />
      </div>
      <Register ref={registerRef} loginRef={loginRef} />
    </div>
  );
};

export default Login;
