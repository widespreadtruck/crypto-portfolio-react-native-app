import tw from "twin.macro"

export const Container = tw.div`
    flex h-screen w-screen
`
export const Wrapper = tw.div`
    container flex flex-col items-center justify-start mx-auto w-3/5 pt-12
`
export const FlexContainer = tw.div`
    container flex items-center justify-start mb-10
`
export const FlexRow = tw.div`
    flex flex-row items-center justify-center h-full space-x-5 animate-pulse mr-4
`
export const Circle = tw.div`
    w-10 h-10 bg-gray-600 rounded-full
`
export const WidthThird = tw.div`
    w-1/3 bg-gray-600 animate-pulse h-12 rounded-xl self-start
`
export const HeightTwenty = tw.div`
    w-full bg-gray-600 animate-pulse h-20 rounded-xl m-0.5
`
