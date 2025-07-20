import { useState, type ReactNode } from "react"

type ToolTipType = {
  children: ReactNode
}

const ToolTip = ({children}: ToolTipType) => {
  const [showMessage, setShowMessage] = useState(false)

  const onHover = (action: string) => {
    if(action === "on") {
      setShowMessage(true)
    } else if (action === "off"){
      setShowMessage(false)
    }
  }

  return(
    <span className="relative" onMouseOver={() => onHover("on")} onMouseOut={() => onHover("off")}>
      <span className={`text-white absolute bg-gray-500 delay-200 duration-150 p-2 rounded-md right-[-150px] ${showMessage ? 'opacity-75' : 'opacity-0'}`}>Tool Tip Message</span>
      {children}
    </span>
  )
}

export default ToolTip