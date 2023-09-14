export default [
    {
        name:'Home Page',
        path: '/public-transport',
        component:() => import('@/pages/JourneysPage.vue'),
        children: [
            {
                name:'single-journey',
                path:':journeyId',
                component: () => import('@/components/Map/OpenMap.vue'),
                props:true
            }
        ]
    }
]