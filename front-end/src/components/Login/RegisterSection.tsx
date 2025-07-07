import { Link } from "react-router-dom"

const RegisterSection = () => {
    return(
        <div className="bg-[#ffffffc2] p-5 z-2 rounded-2xl flex flex-col items-center shadow-md w-full">
            <p>Don't have an account? <Link to="/registration" className="text-[#3C7DF5]">Sign up here</Link></p>
        </div>
    )
}

export default RegisterSection