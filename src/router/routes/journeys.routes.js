export default [
    {
        name:'Journey-Page',
        path: '/public-transport/:journeyId?',
        component:() => import('@/pages/JourneysPage.vue'),
    }
]