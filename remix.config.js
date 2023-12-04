import {flatRoutes} from 'remix-flat-routes'

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/.*'],
  cacheDirectory: './node_modules/.cache/remix',
  appDirectory: 'app',
  routes: async defineRoutes => {
    return flatRoutes('routes', defineRoutes, {
      ignoredRouteFiles: [
        '.*',
        '**/*.css',
        '**/*.test.{js,jsx,ts,tsx}',
        '**/__*.*',
      ],
    })
  },
}
