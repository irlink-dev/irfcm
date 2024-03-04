import { MorecxVariants } from '@/enums/morecx-variants'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'

export const MorecxVariantsContext = createContext({
  /**
   * MorecX Build Variants.
   */
  variant: MorecxVariants.CLOUD,
  setVariant: ((variant: MorecxVariants) => {
    /* empty */
  }) as Dispatch<SetStateAction<MorecxVariants>>,
})

export const MorecxVariantsProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  /** MorecX Build Variants */
  const [variant, setVariant] = useState(MorecxVariants.CLOUD)

  return (
    <MorecxVariantsContext.Provider value={{ variant, setVariant }}>
      {children}
    </MorecxVariantsContext.Provider>
  )
}
