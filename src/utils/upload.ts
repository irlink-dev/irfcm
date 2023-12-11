import axios from 'axios'
import fs from 'fs'
import path from 'path'
import FormData from 'form-data'
import Logger from '@/utils/log'

const TAG = 'utils/upload'

/**
 * form data 생성.
 */
export const createFormData = (file: any, uploadPath: string) => {
  const formData = new FormData()
  formData.append('REQ_TYPE', 'REQ_TYPE_FILE')
  formData.append('REQ_ID', 'ziphone')
  formData.append('REQ_PWD', 'irlink')
  formData.append('REQ_PATHNAME', uploadPath)
  formData.append('REQ_SIZE', fs.statSync(file).size.toString())
  formData.append('REQ_FILENAME', fs.createReadStream(file))
  return formData
}

/**
 * 파일 업로드.
 */
export const upload = async (
  file: any,
  uploadHost: string,
  uploadPath: string,
  onResponse: (data: any) => void,
) => {
  const formData = createFormData(file, uploadPath)
  Logger.log(TAG, `upload. formData: ${JSON.stringify(formData)}`)

  try {
    const response = await axios.post(uploadHost, formData, {
      headers: formData.getHeaders(),
    })
    onResponse(response)
    ////
  } catch (error: any) {
    Logger.error(TAG, error)
    onResponse(error)
  }
}
