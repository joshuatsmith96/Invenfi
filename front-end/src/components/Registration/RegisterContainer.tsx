import LoginInput from "../Login/LoginInput"

const RegisterContainer = () => {
    return(
        <div className="translate-x-[2000px] registerContainer bg-[#ffffffc2] p-10 z-2 rounded-2xl flex flex-col items-center shadow-md w-[450px] max-[480px]:w-[350px]">
            <h1 className="font-medium text-3xl mb-5">Login</h1>
            <LoginInput label="Username" type="text" placeholder="Please enter your username"/>
            <LoginInput label="Password" type="password" placeholder="Please enter your password"/>
        </div>
    )
}

export default RegisterContainer