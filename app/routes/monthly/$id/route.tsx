import { type DataFunctionArgs } from '@remix-run/node'
import { useLoaderData, useLocation } from '@remix-run/react'
import { Info } from 'lucide-react'
import { GeneralErrorBoundary } from '~/components/error-boundry.tsx'
import { ErrorPage } from '~/components/errors.tsx'
import PageData from '~/components/page-data.tsx'
import { Button, ButtonLink } from '~/components/ui/button.tsx'
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
    <div className="mt-[1px] hidden md:block md:border-r md:pr-4 lg:min-w-[210px] lg:max-w-[210px]">
      <div className="flex flex-col gap-12">
        <div className='flex flex-col gap-6'>
          <div>
            <div className='flex items-center text-xs font-semibold'>
              Data halaman anda
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
            <div className='text-[11px] text-muted-foreground'>
              Selalu pastikan pengeluaran anda tidak melebihi pemasukan anda
            </div>
          </div>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-1'>
              <h5 className='text-xs text-muted-foreground'>Pemasukan</h5>
              <p className='text-xs font-medium'>Rp. 5,480,000</p>
            </div>
            <div className='flex flex-col gap-1'>
              <h5 className='text-xs text-muted-foreground'>Pengeluaran</h5>
              <p className='text-xs font-medium'>Rp. 1,790,000</p>
            </div>
            <div className='flex flex-col gap-1'>
              <h5 className='text-xs text-muted-foreground'>Belum dialokasikan</h5>
              <p className='text-xs font-medium'>Rp. 3,690,000</p>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <div className='flex items-center text-xs font-semibold'>
            Kantong
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
          <div className='flex flex-col gap-2'>
            <ButtonLink
              asChild
              variant="transparent"
              to='/'
              className='overflow-hidden border border-input bg-muted px-3.5 py-7'
            >
              <div className='flex w-full items-center gap-4'>
                <div className='flex w-full flex-col gap-1'>
                  <h5 className='text-[11px] text-muted-foreground'>Bank Mandiri</h5>
                  <p className='text-xs font-medium'>Rp. 3,690,000</p>
                </div>
                <img src="/logos/bank_mandiri.png" alt="" width="34px" height="auto" />
              </div>
            </ButtonLink>
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
