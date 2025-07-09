import LoginInput from "./LoginInput"
import LoginButton from "./LoginButton"

const LoginContainer = () => {
    return(
        <div className="relative bg-[#ffffffc2] p-10 z-2 rounded-2xl flex flex-col items-center shadow-md w-full max-sm:border max-sm:w-[95%]">
            <h1 className="font-medium text-3xl mb-5 max-sm:text-xl">Login</h1>
            <LoginInput label="Username" type="text" placeholder="Please enter your username"/>
            <LoginInput label="Password" type="password" placeholder="Please enter your password"/>
            <LoginButton />
        </div>
    )
}

export default LoginContainer