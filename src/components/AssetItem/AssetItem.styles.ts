import tw from "twin.macro"

export const ListElement = tw.li`
    flex flex-row
`
export const ContentWrapper = tw.div`
    border-solid border-x border-t border-b-0 border-gray-500 select-none cursor-pointer flex flex-1 items-center p-4 bg-item-custom-color hover:bg-hover-item-custom-color
`
export const AssetImg = tw.div`
    flex flex-col items-center justify-center w-10 h-10 mr-4
`
export const Img = tw.img`
    mx-auto object-cover rounded-full
`
export const NameAndPriceWrapper = tw.div`
    flex-1 pl-1 md:mr-16
`
export const Name = tw.div`
   font-medium dark:text-white
`
export const LatestPrice = tw.div`
   text-sm text-gray-200
`
export const ValueAndBalance = tw.div`
   grid justify-items-stretch
`
export const AssetValue = tw.div`
   text-gray-600 dark:text-gray-200 font-medium justify-self-end
`
export const Balance = tw.div`
   text-xs text-gray-600 dark:text-gray-200 justify-self-end
`
export const ArrowBtn = tw.button`
   flex justify-end w-8 text-right
`
