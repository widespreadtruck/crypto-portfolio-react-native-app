import React from "react"
import { useSpring, animated } from "react-spring"

const WarningBanner = ({ status }: { status: boolean }) => {
const animationProps = useSpring({
  from: { transform: "translateX(100%)" },
  to: { transform: status ? "translateX(0%)" : "translateX(100%)" },
})

  return (
    <animated.div
      style={animationProps}
      className="fixed top-0 right-0 p-4"
      role="alert"
    >
      <div className="flex bg-red-100 rounded-lg p-4 mb-4">
        <svg
          className="w-5 h-5 text-red-700"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          ></path>
        </svg>
        <p className="ml-3 text-md text-red-700">
          <span className="font-medium">Sorry... </span> The Price data is
          currently unavailable for this asset. Try later.
        </p>
      </div>
    </animated.div>
  )
}

export default WarningBanner
