import { OptionsObject, SnackbarKey, SnackbarMessage, VariantType } from 'notistack'

/**
 * Snackbar 위치 옵션.
 */
const anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'right'
}

/**
 * Snackbar 표시.
 */
const showVariantSnackbar = (
    message: string,
    variant: VariantType,
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey
) => {
    enqueueSnackbar(message, {
        variant,
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
        }
    })
}

/**
 * 기본 Snackbar 표시.
 */
const showDefaultSnackbar = (
    message: string,
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey
) => {
    enqueueSnackbar(message, {
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
        }
    })
}

/**
 * Success Snackbar 표시.
 */
const showSuccessSnackbar = (
    message: string,
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey
) => {
    showVariantSnackbar(
        message,
        'success',
        enqueueSnackbar
    )
}

export { showDefaultSnackbar, showSuccessSnackbar }
