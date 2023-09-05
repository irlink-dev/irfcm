export default abstract class IrResponse {
  code?: number
  message?: string

  constructor(code?: number, message?: string) {
    this.code = code
    this.message = message
  }

  static Code = {
    SUCCESS: 200,
    FAIL: 400,
  }

  task(task: Task) {
    if (this.code == IrResponse.Code.SUCCESS) {
      task.onSuccess()
    } else {
      task.onFail()
    }
  }
}

interface Task {
  onSuccess: () => void
  onFail: () => void
}
