import * as constantPlugins from '../plugins/constantPlugins'

/** 按需导入组件(避免应用开启所有组件一并加载，这样可以保证启动那个功能就加载对应组件) */
const DockerIndex = () => import('../components/Docker/DockerIndex')
const ContainerInspect = () => import('../components/Docker/Container/ContainerInspect')

const dockerManageRouter = [
  {
    path: constantPlugins.PLUGINS_DOCKERMANAGE_PATH,
    component: DockerIndex,
    children: [
      {
        path: constantPlugins.PLUGINS_DOCKERMANAGE_CHILDREN_ROUTER_PATH,
        component: ContainerInspect
      }
    ]
  }
]

export default dockerManageRouter
