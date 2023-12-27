import {
  OptionsObject,
  SnackbarKey,
  SnackbarMessage,
  VariantType,
} from 'notistack'

/**
 * Snackbar 위치 옵션.
 */
const anchorOrigin = {
  vertical: 'bottom',
  horizontal: 'right',
}

/**
 * Snackbar 표시.
 */
export const showVariantSnackbar = (
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject,
  ) => SnackbarKey,
  message: string,
  variant: VariantType,
) => {
  enqueueSnackbar(message, {
    variant,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right',
    },
  })
}

/**
 * 기본 Snackbar 표시.
 */
export const showDefaultSnackbar = (
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject,
  ) => SnackbarKey,
  message: string,
) => {
  showVariantSnackbar(enqueueSnackbar, message, 'default')
}

/**
 * Success Snackbar 표시.
 */
export const showSuccessSnackbar = (
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject,
  ) => SnackbarKey,
  message: string,
) => {
  showVariantSnackbar(enqueueSnackbar, message, 'success')
}

/**
 * Error Snackbar 표시.
 */
export const showErrorSnackbar = (
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject,
  ) => SnackbarKey,
  message: string,
) => {
  showVariantSnackbar(enqueueSnackbar, message, 'error')
}

/**
 * Warning Snackbar 표시.
 */
export const showWarningSnackbar = (
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject,
  ) => SnackbarKey,
  message: string,
) => {
  showVariantSnackbar(enqueueSnackbar, message, 'warning')
}

/**
 * Info Snackbar 표시.
 */
export const showInfoSnackbar = (
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject,
  ) => SnackbarKey,
  message: string,
) => {
  showVariantSnackbar(enqueueSnackbar, message, 'info')
}
