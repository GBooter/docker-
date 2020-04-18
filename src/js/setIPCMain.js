/**
 * 自定义主进程
 */
import { ipcMain, dialog } from 'electron'
import * as constantIPC from './constantIPC'

export default function setIPCMain() {
  /** 监听保存文件对话框 */
  ipcMain.on(constantIPC.IPC_CHANNEL_OPEN_SAVE_DIALOG, (event, fileName) => {
    const options = {
      title: '保存文件',
      defaultPath: fileName
    }
    dialog.showSaveDialog(options)
      .then(value => {
        // 发送信号给渲染进程
        event.sender.send(constantIPC.IPC_CHANNEL_SAVED_FILE, value.filePath)
      })
  })
}
