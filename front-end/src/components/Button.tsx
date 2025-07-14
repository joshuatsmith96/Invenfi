import type { ReactNode } from "react"

type ButtonType = {
    onClick: () => void,
    children: ReactNode,
    color?: string,
    bgColor?: string,
    border?: boolean,
    thin?: boolean
}

const Button = ({onClick, children, color, bgColor, thin}: ButtonType) => {
    return(
        <button className={`hover:cursor-pointer mt-5 w-full h-12 rounded-lg flex flex-row justify-center items-center px-10 py-8 ${thin ? 'font-regular' : 'font-bold'} ${color ? `text-[${color}]` : 'text-white'} shadow-sm shadow-[#a1a1a1] ${bgColor? 'bg-gradient-to-r from-[#5E6AEE] to-[#CF8EEB]' : ''}`} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button