const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "index",
        component: () => import("pages/IndexPage.vue")
      },
      {
        path: "check/:taskId",
        name: "check",
        component: () => import("pages/CheckTaskStatus.vue")
      },
      {
        path: "video/:videoId",
        name: "info",
        component: () => import("pages/VideoInfo.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue")
  }
]

export default routes
