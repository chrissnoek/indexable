export default defineNuxtRouteMiddleware((to) => {
    // Skip if not a trailing slash or if it's the root path
    if (!to.path.endsWith('/') || to.path === '/') {
        return;
    }

    // Remove trailing slash and redirect
    const pathWithoutTrailingSlash = to.path.slice(0, -1);

    return navigateTo(
        {
            path: pathWithoutTrailingSlash,
            query: to.query,
            hash: to.hash,
        },
        { redirectCode: 301 }
    );
});
