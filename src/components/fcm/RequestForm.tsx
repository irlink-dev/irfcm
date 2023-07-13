'use client'

import * as React from 'react'
import Input from '@/types/Input'
import FirebasePreference from '@/types/FirebasePreference'
import Request from '@/types/Request'
import RequestType from '@/types/RequestType'
import { getFirebaseToken } from '@/hooks/firebase'
import { requestFcm } from '@/hooks/fcm'
import { showErrorSnackbar, showSuccessSnackbar } from '@/hooks/snackbar'
import { useSnackbar } from 'notistack'
import { SelectChangeEvent } from '@mui/material/Select'
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material'

interface RequestFormProps {
    input: Input
    setInput: (input: Input) => void
    getStorageFiles: () => any
    firebasePref: FirebasePreference
}

const RequestForm = ({ input, setInput, getStorageFiles, firebasePref }: RequestFormProps) => {

    const { enqueueSnackbar } = useSnackbar()

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<number>
    ) => {
        const { value, name } = event.target

        if ('checked' in event.target && name === 'isIncludeRecord') {
            setInput({
                ...input,
                [name]: event.target.checked
            })
        } else {
            setInput({
                ...input,
                [name]: value,
            })
        }
    }

    const handleSubmit = async () => {
        const token = await getFirebaseToken(input.phoneNumber)
        const request: Request = {
            authorizationKey: firebasePref.authorizationKey,
            token: token,
            date: input.date,
            type: input.type.toString(),
            isIncludeRecord: input.isIncludeRecord,
            priority: 'high'
        }
        const response = await requestFcm(request)
        console.log(response)

        if (response.success === 1) {
            showSuccessSnackbar(enqueueSnackbar, 'FCM 전송 성공')
            setTimeout(() => {
                getStorageFiles().then(() => {
                    /* empty */
                })
            }, 3000)
        }
        if (response.failure === 1) {
            showErrorSnackbar(enqueueSnackbar, 'FCM 전송 실패')
        }
    }

    return (
        <>
            {/* Request Form */}
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>

                <Typography>요청 양식</Typography>

                {/* Corporate Phone Number */}
                <TextField
                    label="법인폰 번호"
                    name="phoneNumber"
                    value={input.phoneNumber}
                    onChange={handleChange}
                    required
                />

                {/* Log Date */}
                <TextField
                    label="날짜"
                    name="date"
                    value={input.date}
                    onChange={handleChange}
                    required
                />

                {/* FCM Request Type */}
                <FormControl>

                    <InputLabel id="type">요청 타입</InputLabel>

                    <Select
                        labelId="type"
                        name="type"
                        value={input.type}
                        label="요청 타입"
                        onChange={handleChange}
                    >

                        <MenuItem value={RequestType.UPLOAD_LOGS}>
                            [1] 로그
                        </MenuItem>

                        <MenuItem value={RequestType.UPLOAD_FILE_LIST}>
                            [2] 파일 리스트
                        </MenuItem>

                        <MenuItem value={RequestType.UPLOAD_RECORDS}>
                            [5] 녹취 파일 업로드
                        </MenuItem>

                    </Select>

                </FormControl>

                {/* [CHECKBOX] Whether to Include AMR Files - Only works on UPLOAD_LOGS */}
                <FormGroup>

                    <FormControlLabel
                        control={
                            <Checkbox
                                name="isIncludeRecord"
                                value={input.isIncludeRecord}
                                checked={input.isIncludeRecord}
                                onChange={handleChange}
                            />
                        }
                        label="녹취 파일 포함"
                    />

                </FormGroup>

                {/* [SUBMIT] FCM REQUEST BTN */}
                <Button
                    type="submit"
                    onClick={handleSubmit}
                    variant="contained"
                >
                    FCM 요청
                </Button>

            </Paper>

            {/* Show User Input */}
            <Button
                onClick={() => console.log(input)}
                sx={{ mt: 2 }}
            >
                Show req values
            </Button>
        </>
    )
}

export default RequestForm
