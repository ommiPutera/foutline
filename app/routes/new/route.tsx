import {type DataFunctionArgs} from '@remix-run/node'
import {useLocation} from '@remix-run/react'
import Editor from '~/components/editor/index.tsx'
import {GeneralErrorBoundary} from '~/components/error-boundry.tsx'
import {ErrorPage} from '~/components/errors.tsx'
import {Header} from '~/components/new-page/header.tsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select.tsx'
import {getKindeSession} from '~/utils/session.server.ts'

export async function loader({request}: DataFunctionArgs) {
  const {isAuthenticated} = await getKindeSession(request)
  if (!isAuthenticated) throw new Response('Not found', {status: 404})
  return null
}

function Index() {
  return (
    <div>
      <Header />
      <div className="flex min-h-screen py-6 md:gap-4">
        <div className="flex w-full flex-col gap-4 md:gap-3 md:border-r md:pr-4">
          <Editor />
        </div>
        <div className="hidden md:block md:min-w-[140px] md:max-w-[140px] lg:min-w-[240px] lg:max-w-[240px]">
          <div className="flex flex-col items-center justify-between gap-2">
            <div className="flex w-full items-center justify-between gap-1 p-2">
              <span className="text-xs">Status</span>
              <Select>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Pilih halaman" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic-notes">Catatan biasa</SelectItem>
                  <SelectItem value="monthly">Keuangan bulanan</SelectItem>
                  <SelectItem value="saving">Tabungan</SelectItem>
                  <SelectItem value="debt">Hutang</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-full items-center justify-between gap-1 p-2">
              <span className="text-xs">Status</span>
              <Select>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Pilih halaman" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic-notes">Catatan biasa</SelectItem>
                  <SelectItem value="monthly">Keuangan bulanan</SelectItem>
                  <SelectItem value="saving">Tabungan</SelectItem>
                  <SelectItem value="debt">Hutang</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ErrorBoundary() {
  const location = useLocation()
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => (
          <ErrorPage
            title="404 - Oh no, you found a page that's missing stuff."
            subtitle={`"${location.pathname}" is not a page on omition.com. So sorry.`}
          />
        ),
      }}
    />
  )
}

export default Index
