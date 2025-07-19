import type { ReactNode } from "react"

type ContainerType = {
    children: ReactNode;
    className?: string;
}

const Container = ({children, className}: ContainerType) => {
    return(
        <div className={`${className} shadow-sm p-3 bg-white border-gray-300 border-thin rounded-md`}>
            {children}
        </div>
    )
}

export default Container