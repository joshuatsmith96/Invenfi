const RegisterSection = () => {

    const onClicked = (e) => {
        const loginContainer = document.getElementsByClassName("loginContainer")[0];
        const registerContainer = document.getElementsByClassName("registerContainer")[0];
        loginContainer.classList.add("class", "swipe-out-left")
        setTimeout(() => {
           registerContainer.classList.add("class", "swipe-in-right") 
        }, 500)
    }

    return(
        <div className="bg-[#ffffffc2] p-5 z-2 rounded-2xl flex flex-col items-center shadow-md w-full">
            <p>Don't have an account? <span className="text-[#3C7DF5] hover:cursor-pointer" onClick={(e) => onClicked(e)}>Sign up here</span></p>
        </div>
    )
}

export default RegisterSection