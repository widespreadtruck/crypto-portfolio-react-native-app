import React, { useState } from "react"

const withLoading = (WrappedComponent: any) => {
  return () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    return (
      <WrappedComponent isLoading={isLoading} setIsLoading={setIsLoading} />
    )
  }
}

export default withLoading
