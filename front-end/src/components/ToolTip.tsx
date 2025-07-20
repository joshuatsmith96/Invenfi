import { useState, type ReactNode } from "react"

type ToolTipType = {
  children: ReactNode,
  message: string
}

const ToolTip = ({ children, message }: ToolTipType) => {
  const [showMessage, setShowMessage] = useState(false)

  return (
    <span
      className="relative flex items-center"
      onMouseOver={() => setShowMessage(true)}
      onMouseOut={() => setShowMessage(false)}
    >
      <span
        className={`absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-500 text-white p-2 rounded-md transition-opacity duration-150 ${
          showMessage ? 'opacity-75' : 'opacity-0'
        }`}
      >
        {message}
      </span>
      {children}
    </span>
  )
}

export default ToolTip
