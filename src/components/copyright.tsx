import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://irlink.net/">
        IR-LINK [EASY COMMUNICATION]
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Copyright
