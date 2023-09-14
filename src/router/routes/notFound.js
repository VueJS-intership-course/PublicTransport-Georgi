export default [
    {
        path:'/NotFound(.*)',
        component:() => import('@/pages/NotFound.vue')
    }
]