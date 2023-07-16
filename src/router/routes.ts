import {RouteRecordRaw} from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/calculator',
    component: () => import('./../views/Calculator.vue'),
    meta: { title: 'Calculator'},
  }
]
export default routes
