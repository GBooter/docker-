const Docker = require('dockerode')
const fs = require('fs')
const DOCKER_ENGINE_UNIX_SOCKET = '/var/run/docker.sock'
const socket = process.env.DOCKER_SOCKET || DOCKER_ENGINE_UNIX_SOCKET
let stats

try {
  stats = fs.statSync(socket)
  if (!stats.isSocket()) {
    Error('确定Docker程序正在运行吗？')
  }
} catch (e) {
  Error(e)
}

const docker = new Docker({ socketPath: socket })

export default docker
