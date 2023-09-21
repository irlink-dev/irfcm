import {
  Box,
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
import useStorageFiles from '@/hooks/useStorageFiles'
import FirebasePreference from '@/types/FirebasePreference'
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import Input from '@/types/Input'
import { Dispatch, SetStateAction, useEffect } from 'react'
import LogUtil from '@/utils/log'

interface StorageFilesProps {
  input: Input
  trigger: boolean
  setTrigger: Dispatch<SetStateAction<boolean>>
  firebasePref: FirebasePreference
  storageRef: firebase.storage.Reference
}

const StorageFiles = ({
  input,
  trigger,
  setTrigger,
  firebasePref,
  storageRef,
}: StorageFilesProps) => {
  const TAG = 'StorageFiles'
  const { clearStorageFiles, getStorageFiles, storageFileData } =
    useStorageFiles(firebasePref, storageRef)

  const onRefreshIconClick = () => {
    getStorageFiles(input)
  }

  useEffect(() => {
    if (trigger) {
      LogUtil.log(TAG, `useEffect(trigger). trigger: ${trigger}`)
      setTimeout(() => {
        getStorageFiles(input).then(() => setTrigger(() => false))
      }, 3000)
    }
    if (!trigger) {
      LogUtil.log(TAG, `useEffect(trigger). trigger: ${trigger}`)
    }
  }, [trigger])

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        overflow: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
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

      {storageFileData.length > 0 ? (
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
        <Typography variant="caption" sx={{ color: '#999999' }}>
          스토리지가 비어 있습니다
        </Typography>
      )}
    </Paper>
  )
}

export default StorageFiles
