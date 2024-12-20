const noDashboardRoutes = [
    "/",
    new RegExp("^/my-notebooks/([^/]+)/([^/]+)/(?!create-card$)[^/]+$"),
    new RegExp("^/my-notebooks/note"),
];

export default noDashboardRoutes;