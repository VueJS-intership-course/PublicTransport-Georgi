const routes = [];

const routeModules = import.meta.glob('./routes/*.routes.js', {
  import: 'default',
  eager: true,
});

Object.values(routeModules).forEach(route => {
  routes.push(...route);
});

console.log(routes);


export default routes