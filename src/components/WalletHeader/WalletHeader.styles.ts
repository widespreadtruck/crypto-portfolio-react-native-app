import tw from "twin.macro"

export const Container = tw.div`
    flex items-center py-4 w-full pb-10 pt-10 
`
export const ImgWrapper = tw.div`
    relative h-10 w-10 mr-4 flex items-center justify-center
`
export const ImgBackground = tw.div`
    absolute inset-0 flex items-center justify-center bg-purple-500 opacity-50 rounded-full
`
export const TitlesContainer = tw.div`
    flex-1 pl-1 md:mr-16
`
export const Title = tw.div`
    text-lg text-gray-200
`
export const Balance = tw.div`
    font-medium text-white
`
export const CloseBtn = tw.div`
    flex self-start w-8 text-right
`
