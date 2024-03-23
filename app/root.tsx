import React from 'react'

import { cssBundleHref } from '@remix-run/css-bundle'
import {
  json,
  type LoaderFunctionArgs,
  type LinksFunction,
  type MetaFunction,
  type SerializeFrom,
} from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
} from '@remix-run/react'

import { useSpinDelay } from 'spin-delay'

import LoadingBar from 'react-top-loading-bar'

import AppShell from '~/components/app-shell.tsx'
import Navbar from '~/components/navbar.tsx'
import { TooltipProvider } from '~/components/ui/tooltip.tsx'

import prosemirrorStyles from '~/styles/prosemirror.css'
import globalStyles from '~/styles/globals.css'

import { getKindeSession, getUser } from '~/utils/session.server.ts'
import { ThemeProvider, useTheme } from '~/utils/theme-provider.tsx'
import { getThemeSession } from '~/utils/theme.server.ts'

export type LoaderData = SerializeFrom<typeof loader>
export const handle: { id: string } = {
  id: 'root',
}

export async function loader({ request }: LoaderFunctionArgs) {
  const [themeSession, kindeSession, userFromSession] = await Promise.all([
    getThemeSession(request),
    getKindeSession(request),
    getUser(request),
  ])

  const data = {
    user: userFromSession,
    isAuthenticated: kindeSession.isAuthenticated,
    profile: kindeSession.profile,
    requestInfo: {
      session: {
        theme: themeSession.getTheme(),
      },
    },
  }
  const headers: HeadersInit = new Headers()
  return json(data, { headers })
}

export const meta: MetaFunction = () => {
  return [
    { viewport: 'width=device-width,initial-scale=1,viewport-fit=cover' },
    { title: 'Foutline | Catatan keuangan Anda' },
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
  { rel: 'stylesheet', href: globalStyles },
  { rel: 'stylesheet', href: prosemirrorStyles },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
]

function PageLoadingMessage() {
  const navigation = useNavigation()
  const showLoader = useSpinDelay(Boolean(navigation.state !== 'idle'), {
    delay: 500,
    minDuration: 800,
  })

  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    if (navigation.state === 'idle' || progress >= 100) return setProgress(0)

    const interval = setInterval(() => {
      setProgress(prev => prev + 20)
    }, 200)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showLoader])

  if (!showLoader) return <></>
  // @ts-ignore
  return <LoadingBar color="#3b81f6" progress={progress} />
}

export default function AppWithProviders() {
  const { requestInfo } = useLoaderData<LoaderData>()
  return (
    <ThemeProvider specifiedTheme={requestInfo?.session.theme}>
      <TooltipProvider delayDuration={100}>
        <App />
      </TooltipProvider>
    </ThemeProvider>
  )
}

function OutletWithShell() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  )
}

function App() {
  const [theme] = useTheme()
  return (
    <html lang="en" className={`${theme}`} data-color-scheme={theme}>
      <head>
        <Meta />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000" />
        <meta name="theme-color" content={theme === 'dark' ? '#000' : '#FFF'} />
        <Links />
      </head>
      <body>
        <PageLoadingMessage />
        <Navbar />
        <OutletWithShell />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
