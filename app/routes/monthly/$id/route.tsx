import { type DataFunctionArgs } from '@remix-run/node'
import { useLoaderData, useLocation } from '@remix-run/react'
import { Info } from 'lucide-react'
import { GeneralErrorBoundary } from '~/components/error-boundry.tsx'
import { ErrorPage } from '~/components/errors.tsx'
import PageData from '~/components/page-data.tsx'
import { Button } from '~/components/ui/button.tsx'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip.tsx'
import { getKindeSession } from '~/utils/session.server.ts'
import MonthlyEditor from './editor.tsx'

type LoaderData = {
  postId?: string
}

export async function loader({ request, params }: DataFunctionArgs) {
  const { isAuthenticated } = await getKindeSession(request)
  if (!isAuthenticated) throw new Response('Not found', { status: 404 })

  const { id } = params
  const data: LoaderData = { postId: id }
  return data
}

function Index() {
  const { postId } = useLoaderData<LoaderData>()
  return (
    <div className="flex max-h-[90vh] p-4 md:mt-[0.5em] md:gap-6" stat-data={postId}>
      <Summary />
      <MonthlyEditor />
      <PageData />
    </div>
  )
}



function Summary() {
  return (
    <div className="mt-[1px] hidden md:block md:min-w-[140px] md:max-w-[140px] md:border-r md:pr-4 lg:min-w-[210px] lg:max-w-[210px]">
      <div className="flex flex-col gap-4">
        <div className='flex items-center gap-1 text-xs font-semibold'>
          Ringkasan bulan ini
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="transparent" size="icon">
                <Info className='h-4 w-4 fill-blue-500 text-white' />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Buat halaman baru</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className='flex flex-col gap-5'>
          <div>
            <h5 className='text-xs text-muted-foreground'>Pemasukan</h5>
            <p className='text-sm font-semibold'>Rp. 5,000,000</p>
          </div>
          <div>
            <h5 className='text-xs text-muted-foreground'>Pengeluaran</h5>
            <p className='text-sm font-semibold'>Rp. 5,000,000</p>
          </div>
          <div>
            <h5 className='text-xs text-muted-foreground'>Belum dialokasikan</h5>
            <p className='text-sm font-semibold'>Rp. 5,000,000</p>
          </div>
        </div>
        {/* <div className='text-xs text-muted-foreground'>
              Untuk menjaga keuangan anda tetap dalam kondisi yang sehat, selalu pastikan pengeluaran anda tidak lebih dari pemasukan anda.
            </div> */}
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
