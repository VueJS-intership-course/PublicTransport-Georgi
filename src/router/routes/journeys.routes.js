export default [
    {
        name:'Journey-Page',
        path: '/public-transport/:journeyId?',
        component:() => import('@/pages/JourneysPage.vue'),
    },
    {
        name:'ten-stops',
        path:'/transport/all/:id?',
        component:() => import('@/pages/AllStopsPage.vue')
    }
]