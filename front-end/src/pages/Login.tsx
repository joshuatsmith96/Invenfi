import '../animations.css'
import BackgroundBlobs from '../components/BackgroundBlobs'
import LoginContainer from '../components/Login/LoginContainer'
import RegisterSection from '../components/Login/RegisterSection'

const Login = () => {
    return(
        <div className="relative w-full h-[100vh] flex flex-col justify-center items-center overflow-hidden">
            <BackgroundBlobs />
            <h1 className='text-4xl z-5 mb-10 font-bold max-sm:text-3xl'>Welcome to <span className='text-[#5D49EE]'>Invenfi</span></h1>
            <div className='z-5 flex flex-col gap-5'>
                <LoginContainer />
                <RegisterSection />
            </div>
        </div>
    )
}

export default Login