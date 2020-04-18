/**
 * 自定义渲染进程
 */
import { ipcRenderer } from 'electron'
import { IPC_CHANNEL_SAVED_FILE } from './constantIPC'

/** 实现保存文件通道监听 */
export function tarFileSaveInit (callback) {
  ipcRenderer.on(IPC_CHANNEL_SAVED_FILE, (event, path) => {
    if (!path) {
      callback(new Error('文件路径为空!'), path)
    } else {
      callback(null, path)
    }
  })
}
