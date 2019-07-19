const Home = () => import('@/components/Home')

const addRoutes = ({router, routerLocales}) => {
  let routes = routerLocales.map((routerLocale) => {
    return {
      component: Home,
      name: `home_${routerLocale.locale}`,
      path: `/${routerLocale.addRoutePrefix ? routerLocale.locale : ''}`
    }
  })

  router.addRoutes(routes)
}

export default {
  addRoutes
}
