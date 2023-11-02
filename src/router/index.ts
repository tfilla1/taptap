// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    meta: {title: 'taptap - home'},
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/components/MidiView.vue'),
      },
      {
        path: 'canvas',
        name: 'canvas',
        title: 'Canvas Test Kit',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: 'animations',
        name: 'animations',
        title: 'AnimeJS Testing Kit',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/components/Animations.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.afterEach((to) => {
  console.log(import.meta.env.BASE_URL)
  console.log({env: import.meta.env})
  document.title = to.meta.title as string || 'taptap'
})
export default router
