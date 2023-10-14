const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/Index.vue')
      },
      {
        path: 'contact',
        name: 'contact',
        component: () => import('pages/Contact.vue')
      },
      {
        path: 'menu',
        redirect: { name: 'menu' },
        children: [
          {
            path: ':lang',
            name: 'menu',
            component: () => import('pages/BarMenu.vue'),
            props: true
          }
        ]
      }
    ]
    // redirect: { name: 'cocktails' },
    // children: [
    //   {
    //     path: 'cocktails',
    //     name: 'cocktails',
    //     component: () => import('pages/Cocktails.vue')
    //   }
    // ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
