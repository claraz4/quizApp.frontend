const noDashboardRoutes = [
    "/",
    new RegExp("^/my-notebooks/([^/]+)/([^/]+)/(?!create-card$)[^/]+$")
];

export default noDashboardRoutes;