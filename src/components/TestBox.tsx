'use client'

import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Link,
  TextField,
  Tooltip,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import useFormat from '@/hooks/useFormat'
import useFirebase from '@/hooks/useFirebase'
import useFcmRequest from '@/hooks/useFcmRequest'
import useStorageFiles from '@/hooks/useStorageFiles'
import FirebasePreference from '@/interfaces/FirebasePreference'

import {
  getLogsInFolder,
  getPhoneNumberList,
  getUserToken,
  sendFcmToAllTokens,
} from '@/utils/firebase'

import { ClientType } from '@/enums/Client'
import { requestFcm } from '@/utils/fcm'
import useLocalStorage from '@/hooks/useLocalStorage'
import DeleteIcon from '@mui/icons-material/Delete'
import { CloudDownload, Downloading, FileDownload } from '@mui/icons-material'
import { batchDownload } from '@/utils/download'

const TAG = 'TestBox'

const TestBox = ({
  params,
  pref,
}: {
  params: { client: ClientType }
  pref: FirebasePreference
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const { initialize, storageRef } = useFirebase(pref)
  // const { input, trigger, setTrigger, onSubmit, doAuth } =
  //   useFcmRequest(pref)
  const { clearStorageFiles, getStorageFiles, storageFileData } =
    useStorageFiles(pref, storageRef!)

  const { getLocalStorageData, setLocalStorageData } = useLocalStorage()

  const [downloadLinks, setDownloadLinks] = useState<Array<string>>([])
  const [showUrl, setShowUrl] = useState<boolean>(false)
  const [selectedRows, setSelectedRows] = useState<any>([])
  const [date, setDate] = useState<string>('')

  useEffect(() => {
    initialize().then(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    setShowUrl(true)
    setLocalStorageData(
      `irfcm:${pref.config.projectId}:${date}`,
      JSON.stringify(downloadLinks),
    )
  }, [downloadLinks])

  const { parseUrl } = useFormat()

  /**
   * FCM 일괄 요청.
   */
  const doFcmRequest = async () => {
    console.log('return.')
    return
    console.log('doFcmRequest.')

    // 22일부터 28일까지.
    const dates = [
      '2023-11-22', // 수
      '2023-11-23', // 목
      '2023-11-24', // 금
      '2023-11-25', // (토)
      '2023-11-26', // (일)
      '2023-11-27', // 월
      '2023-11-28', // 화
    ]

    const tokenList = [''] // 실제 사용할 토큰 배열로 교체.

    for (const date of dates) {
      for (const token of tokenList) {
        const request = {
          token: token,
          type: '1',
          date: date,
          isIncludeRecord: true,
          priority: 'high',
          authorizationKey: pref.authorizationKey!,
        }
        requestFcm(request)
        console.log('➡️ FCM 요청 to:', token, ' | on date:', date)
      }
    }
  }

  const handleBatchProcess = async () => {
    doFcmRequest()
  }

  const handleChange = (event: any) => {
    const { value, name } = event.target
    setDate(value)
  }

  /**
   * 스토리지 조회 일괄 요청.
   */
  const doStorageRequest = async (date: string) => {
    console.log(`doStorageRequest. date: ${date}`)
    const phoneNumberList = await getPhoneNumberList(storageRef!)
    console.log('phoneNumberList: ', phoneNumberList.length, phoneNumberList)

    setDownloadLinks([]) // 다운로드 링크 목록 비우기.

    for (const phoneNumber of phoneNumberList) {
      const urls = await getLogsInFolder(phoneNumber, date, 'amr')
      setDownloadLinks((prevState) => prevState.concat(urls))
    }
  }

  /**
   * 선택된 항목 다운로드.
   */
  const downloadSelectedFiles = () => {
    // zip 압축 방식으로 반드시 바꿔야 함.
    console.log('return')
    return

    selectedRows.forEach((rowId: any) => {
      const selectedRow = rows.find((row) => row.id === rowId)
      if (selectedRow && selectedRow.download) {
        window.open(selectedRow.download, '_blank')
      }
    })
  }

  const doBatchDownload = async () => {
    const data = await fetch(`/api/download`, { method: 'POST' }).then(
      (response) => response.json(),
    )
    console.log(data)
  }

  const showLocalStorageUrls = async () => {
    const data = await getLocalStorageData(
      `irfcm:${pref.config.projectId}:${date}:backup`,
    )
    console.log(data)
    setDownloadLinks(JSON.parse(data))
  }

  const DownloadButton = (props: any) => {
    return (
      <Link href={props.href} underline="hover">
        다운로드
      </Link>
    )
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'fileName', headerName: 'File name', width: 300 },
    { field: 'phoneNumber', headerName: 'Phone number', width: 160 },
    { field: 'date', headerName: 'Date', width: 140 },
    {
      field: 'download',
      headerName: 'Download',
      width: 120,
      renderCell: (params: any) => <DownloadButton href={params.value} />,
    },
  ]

  const rows = downloadLinks
    ? downloadLinks.map((url, index) => ({
        id: index + 1,
        fileName: decodeURIComponent(parseUrl(url)?.fileName || ''),
        phoneNumber: parseUrl(url)?.phoneNumber || '',
        date: parseUrl(url)?.date || '',
        download: url,
      }))
    : [
        // {
        //   id: 1,
        //   fileName: 'temp',
        //   phoneNumber: 'temp',
        //   date: 'temp',
        //   download: 'temp',
        // },
      ]

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            width: '100%',
            height: 345,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress size={64} />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              mb: 1,
            }}
          >
            project id: {pref.config.projectId}
          </Box>

          <Box
            sx={{
              // mb: 1,
              display: 'flex',
              gap: 1,
            }}
          >
            <Button
              variant="contained"
              color="error"
              sx={{ fontWeight: 600 }}
              onClick={handleBatchProcess}
            >
              FCM 일괄 요청
            </Button>

            <Button
              variant="contained"
              color="error"
              sx={{ fontWeight: 600 }}
              onClick={() => doStorageRequest(date)}
            >
              API로 파일 가져오기
            </Button>

            <TextField
              label="요청 날짜"
              variant="outlined"
              name="date"
              size="small"
              value={date}
              onChange={handleChange}
            />

            {/* <Tooltip title="스토리지 파일 가져오기">
              <IconButton
                color="warning"
                onClick={() => doStorageRequest(date)}
              >
                <Downloading />
              </IconButton>
            </Tooltip> */}

            <Button
              variant="contained"
              color="primary"
              onClick={showLocalStorageUrls}
            >
              로컬 스토리지 파일 조회
            </Button>

            {/* <Button
              sx={{ marginLeft: 'auto' }}
              variant="contained"
              onClick={downloadSelectedFiles}
              disabled={selectedRows.length <= 0}
            >
              선택된 항목 다운로드
            </Button> */}

            <Button
              variant="contained"
              color="error"
              sx={{ fontWeight: 600 }}
              onClick={() => doBatchDownload()}
            >
              File stream download
            </Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Box
              sx={{
                marginLeft: 'auto',
              }}
            >
              <Tooltip title={`선택된 ${selectedRows.length}개 항목 다운로드`}>
                <span
                // Tooltip 바로 밑에 disabled Button이 오면 안 됨.
                >
                  <IconButton
                    onClick={downloadSelectedFiles}
                    disabled={selectedRows.length <= 0}
                  >
                    {/* <FileDownload /> */}
                    <CloudDownload />
                  </IconButton>
                </span>
              </Tooltip>

              <Tooltip title="표 비우기">
                <IconButton onClick={() => setDownloadLinks([])}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* 데이터 그리드 */}
          <div style={{ height: 600, width: '100%', backgroundColor: 'white' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 20, 50, 100]}
              checkboxSelection
              onRowSelectionModelChange={(newSelection) => {
                setSelectedRows(newSelection)
              }}
            />
          </div>
        </>
      )}
    </>
  )
}

export default TestBox

/**
 * 추후 배치 페이지를 메리츠 관리자 페이지처럼 만들 예정.
 * - 처음 페이지 로딩 시 useEffect 통해 전체 토큰 리스트를 보여줌.
 * - 전체 체크 또는 선택 체크를 통해 특정 법인폰 여러 대에 일괄 요청 가능.
 * - 스토리지 조회도 체크된 법인폰의 파일만 보여주도록.
 */
