import {type MetaFunction} from '@remix-run/node'

export const meta: MetaFunction = ({data}) => {
  return [{title: 'Tagihan - Go Unlimited | Foutline'}]
}

function Billing() {
  return (
    <div className="px-3.5 py-6">
      <div className="flex max-w-screen-sm flex-col gap-10">
        <h2 className="text-lg font-bold">Tagihan - Go Unlimited</h2>
        <div></div>
      </div>
    </div>
  )
}

export default Billing
