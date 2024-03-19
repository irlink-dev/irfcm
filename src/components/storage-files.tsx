import {
  Box,
  CircularProgress,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import DeleteIcon from '@mui/icons-material/Delete'
import useStorageFiles from '@/hooks/use-storage-files'
import FirebasePreference from '@/interfaces/firebase-preference'
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import Input from '@/interfaces/input'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { printLog } from '@/utils/log'
import { useAtom, useAtomValue } from 'jotai'
import {
  morecxVariantsAtom,
  storageFilesLoadingStatusAtom,
} from '@/atoms/global-state-atoms'

interface StorageFilesProps {
  params: { client: string }
  input: Input
  trigger: boolean
  setTrigger: Dispatch<SetStateAction<boolean>>
  firebasePref: FirebasePreference
  storageRef: firebase.storage.Reference
}

const StorageFiles = ({
  params,
  input,
  trigger,
  setTrigger,
  firebasePref,
  storageRef,
}: StorageFilesProps) => {
  const TAG = 'StorageFiles'
  const { clearStorageFiles, getStorageFiles, storageFileData } =
    useStorageFiles(firebasePref, storageRef)

  const morecxVariant = useAtomValue(morecxVariantsAtom)
  const [isStorageFilesLoading, setIsStorageFilesLoading] = useAtom(
    storageFilesLoadingStatusAtom,
  )

  const onRefreshIconClick = () => {
    getStorageFiles(input, params.client, morecxVariant)
  }

  useEffect(() => {
    printLog(TAG, `useEffect(trigger). trigger: ${trigger}`)

    if (trigger) {
      setTimeout(() => {
        getStorageFiles(input, params.client, morecxVariant).then(() =>
          setTrigger(() => false),
        )
      }, 3000)
    }
  }, [trigger])

  return (
    <Paper
      sx={{
        px: 2,
        pb: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        overflow: 'auto',
        maxHeight: 395,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          position: 'sticky',
          top: 0,
        }}
      >
        <Typography>스토리지 파일</Typography>
        <Box>
          <IconButton onClick={onRefreshIconClick}>
            <RefreshIcon />
          </IconButton>
          <IconButton onClick={clearStorageFiles}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      {isStorageFilesLoading ? (
        // 스토리지 파일 로딩 중일 때 CircularProgress 표시.
        <Box
          sx={{
            width: '100%',
            // height: 345,
            py: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress size={32} thickness={5} color="inherit" />
        </Box>
      ) : (
        <>
          {storageFileData.length > 0 ? (
            // 스토리지 파일 데이터가 존재할 때.
            <Table>
              <TableBody>
                {storageFileData.map((storageFile) => (
                  <TableRow
                    key={storageFile.fileName}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell>
                      <Typography sx={{ fontSize: 14 }}>
                        {decodeURIComponent(storageFile.fileName)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={storageFile.downloadUrl}
                        underline="hover"
                        sx={{ wordBreak: 'keep-all' }}
                      >
                        다운로드
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            // 스토리지 파일 데이터가 존재하지 않을 때.
            <Typography variant="caption" sx={{ color: '#999999' }}>
              스토리지가 비어 있습니다
            </Typography>
          )}
        </>
      )}
    </Paper>
  )
}

export default StorageFiles
