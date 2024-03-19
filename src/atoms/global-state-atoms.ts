import { atom } from 'jotai'
import { MorecxVariants } from '@/enums/morecx-variants'

/**
 * 페이지 로딩 상태.
 */
export const pageLoadingStatusAtom = atom(false)

/**
 * FCM 요청 로딩 상태.
 */
export const fcmRequestLoadingStatusAtom = atom(false)

/**
 * 스토리지 파일 로딩 상태.
 */
export const storageFilesLoadingStatusAtom = atom(false)

/**
 * 모렉스 Build Variants.
 */
export const morecxVariantsAtom = atom(MorecxVariants.CLOUD)
