import { cssBundleHref } from "@remix-run/css-bundle";
import {
  json,
  type DataFunctionArgs,
  type LinksFunction,
  type MetaFunction,
  type SerializeFrom
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet as RouterOutlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { useSpinDelay } from 'spin-delay';
import Navbar from "./components/navbar.tsx";
import { Progress } from "./components/ui/progress.tsx";
import globalStyles from './styles/globals.css';
import tailwindStyles from './styles/tailwind.css';
import { getSessionManager } from "./utils/kinde.server.ts";
import React from "react";

export type LoaderData = SerializeFrom<typeof loader>
export const handle: { id: string } = {
  id: 'root',
}

export async function loader({ request }: DataFunctionArgs) {
  const { getUser, isAuthenticated } = await getSessionManager(request)
  const user = await getUser()
  const data = {
    user,
    isAuthenticated
  }
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

function Splash() {
  const { isAuthenticated } = useLoaderData<typeof loader>()
  const navigation = useNavigation()
  const [stop, setStop] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const showLoader = useSpinDelay(Boolean(navigation.state !== 'idle'), {
    delay: 400,
    minDuration: 1000,
  })

  React.useEffect(() => {
    if (stop || !showLoader) return
    const interval = setInterval(() => {
      setProgress((prev) => prev + 1);
    }, 45);

    return () => clearInterval(interval);
  }, [navigation.state, showLoader, stop])

  React.useEffect(() => {
    if (progress === 100) {
      setStop(true);
    }
  }, [progress]);

  if (navigation.state === 'loading' && isAuthenticated && showLoader) return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 max-w-xs w-full">
        <Progress value={progress} />
        <p className="font-medium text-sm">{progress > 95 ? 'Redirect..' : `${progress}%`}</p>
      </div>
    </div>
  )
  return <></>
}

function Outlet() {
  const navigation = useNavigation()
  if (navigation.state === 'loading') return <></>
  return <RouterOutlet />
}

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
        <Splash />
        <Navbar />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
