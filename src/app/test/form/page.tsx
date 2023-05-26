'use client'

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const FormTestPage = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField label="법인폰 번호" />
                    <TextField label="날짜" />
                    <TextField label="요청 타입" />
                    <TextField label="녹취 포함 여부" />

                    <Button
                        type="submit"
                        variant="contained">
                        FCM 요청
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default FormTestPage
