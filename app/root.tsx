import { cssBundleHref } from "@remix-run/css-bundle";
import { json, type DataFunctionArgs, type LinksFunction, type MetaFunction, type SerializeFrom } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import tailwindStyles from './styles/tailwind.css';
import globalStyles from './styles/globals.css';
import Navbar from "./components/navbar.tsx";
import { getSessionManager } from "./utils/kinde.server.ts";

export type LoaderData = SerializeFrom<typeof loader>
export const handle: { id: string } = {
  id: 'root',
}

export async function loader({ request }: DataFunctionArgs) {
  const { getUser } = await getSessionManager(request)
  const user = await getUser()
  const data = { user }
  const headers: HeadersInit = new Headers()
  return json(data, { headers })
}

export const meta: MetaFunction = () => {
  return [
    { viewport: 'width=device-width,initial-scale=1,viewport-fit=cover' },
    { title: 'Omition - New way of write your financial planning' },
    { description: 'Platform that provide you a simple canva to write your financial' }
  ]
}

export const links: LinksFunction = () => [
  {
    rel: 'preload',
    as: 'font',
    href: '/fonts/Matter-Medium.woff2',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    as: 'font',
    href: '/fonts/Matter-Regular.woff2',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    as: 'font',
    href: '/fonts/Matter-SemiBold.woff2',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/favicons/apple-touch-icon.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicons/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicons/favicon-16x16.png',
  },
  {
    rel: 'mask-icon',
    color: '#ffffff',
    href: '/safari-pinned-tab.svg',
  },
  { rel: 'icon', href: '/favicon.ico' },
  { rel: 'manifest', href: '/site.webmanifest' },
  { rel: 'stylesheet', href: tailwindStyles },
  { rel: 'stylesheet', href: globalStyles },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#111827" />
        <meta name="theme-color" content="#ffffff" />
        <Links />
      </head>
      <body>
        <Navbar />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
