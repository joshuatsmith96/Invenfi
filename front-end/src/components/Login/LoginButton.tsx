type LoginButtonType = {
    onClick: () => void
}

const LoginButton = ({onClick}: LoginButtonType) => {
    return(
        <button className="hover:cursor-pointer mt-5 w-full h-12 rounded-full font-bold text-white bg-gradient-to-r from-[#5E6AEE] to-[#CF8EEB]" onClick={onClick}>Login</button>
    )
}

export default LoginButton