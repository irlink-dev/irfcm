import { atom } from 'jotai'
import { MorecxVariants } from '@/enums/morecx-variants'

/**
 * 페이지 로딩.
 */
export const pageLoadingStatusAtom = atom(false)

/**
 * 모렉스 Build Variants.
 */
export const morecxVariantsAtom = atom(MorecxVariants.CLOUD)
