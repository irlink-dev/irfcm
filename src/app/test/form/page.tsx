'use client'

import * as React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Link from '@mui/material/Link'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { requestType } from '@/hooks/fcm'

const createData = (
    fileName: string,
    downloadUrl: string,
) => {
    return { fileName, downloadUrl }
}

const rows = [
    createData('RecorderLog_20230410', '#'),
    createData('log_20230410', '#'),
]

const { UPLOAD_LOGS, UPLOAD_FILE_LIST } = requestType()

const FormTestPage = () => {

    const [values, setValues] = React.useState({
        phoneNumber: '',
        date: '',
        type: UPLOAD_LOGS,
        isIncludeRecord: false
    })
    const {
        phoneNumber,
        date,
        type,
        isIncludeRecord
    } = values

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<number>
    ) => {
        const { value, name } = event.target

        if ('checked' in event.target && name === 'isIncludeRecord') {
            // console.log(`[${name}] ${event.target.checked}`)
            setValues({
                ...values,
                [name]: event.target.checked
            })
        } else {
            // console.log(`[${name}] ${value}`)
            setValues({
                ...values,
                [name]: value,
            })
        }
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography>요청 양식</Typography>
                    <TextField
                        label="법인폰 번호"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={handleChange}
                        required />
                    <TextField
                        label="날짜"
                        name="date"
                        value={date}
                        onChange={handleChange}
                        required />
                    <FormControl>
                        <InputLabel id="type">요청 타입</InputLabel>
                        <Select
                            labelId="type"
                            name="type"
                            value={type}
                            label="요청 타입"
                            onChange={handleChange}
                        >
                            <MenuItem value={UPLOAD_LOGS}>[1] 로그</MenuItem>
                            <MenuItem value={UPLOAD_FILE_LIST}>[2] 파일 리스트</MenuItem>
                        </Select>
                    </FormControl>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="isIncludeRecord"
                                    value={isIncludeRecord}
                                    checked={isIncludeRecord}
                                    onChange={handleChange} />
                            }
                            label="녹취 파일 포함" />
                    </FormGroup>
                    <Button
                        type="submit"
                        variant="contained"
                    >
                        FCM 요청
                    </Button>

                </Paper>
            </Grid>
            <Grid item xs={12} lg={6}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography>스토리지 파일</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>File name</TableCell>
                                <TableCell>Download</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow
                                    key={row.fileName}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{row.fileName}</TableCell>
                                    <TableCell>
                                        <Link
                                            href={row.downloadUrl}
                                            underline="hover"
                                        >
                                            다운로드
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>

            <Grid item>
                <Button onClick={() => console.log(values)}>Show values</Button>
            </Grid>
        </Grid>
    )
}

export default FormTestPage
