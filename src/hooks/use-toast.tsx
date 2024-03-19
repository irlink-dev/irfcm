import { SnackbarKey, VariantType, useSnackbar } from 'notistack'
import { Grow, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const useToast = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  /**
   * 토스트 액션 정의.
   */
  const action = (key: SnackbarKey) => {
    return (
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => closeSnackbar(key)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    )
  }

  /**
   * 토스트 표시.
   */
  const showToast = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, {
      variant,
      action: (key: SnackbarKey) => action(key),
      TransitionComponent: Grow,
      // autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
    })
  }

  /**
   * Default 토스트 표시.
   */
  const showDefaultToast = (message: string) => showToast(message, 'default')

  /**
   * Success 토스트 표시.
   */
  const showSuccessToast = (message: string) => showToast(message, 'success')

  /**
   * Error 토스트 표시.
   */
  const showErrorToast = (message: string) => showToast(message, 'error')

  /**
   * Warning 토스트 표시.
   */
  const showWarningToast = (message: string) => showToast(message, 'warning')

  /**
   * Info 토스트 표시.
   */
  const showInfoToast = (message: string) => showToast(message, 'info')

  return {
    showDefaultToast,
    showSuccessToast,
    showErrorToast,
    showWarningToast,
    showInfoToast,
  }
}

export default useToast
