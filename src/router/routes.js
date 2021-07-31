import TheEmptyRouterView from "@/components/TheEmptyRouterView";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: { name: "index" },
    component: TheEmptyRouterView,
    children: [
      {
        path: "/",
        name: "index",
        component: () =>
          import(/* webpackChunkName: "index" */ "@/pages/Index.vue")
      }
    ]
  }
];
export default routes;
