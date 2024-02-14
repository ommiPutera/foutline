import {Button} from '../ui/button.tsx'

function Header({children}: {children: React.ReactNode}) {
  return (
    <div className="mx-5 my-3 flex max-h-9 items-center justify-between">
      <Button size="sm" variant="secondary">
        Cancel
      </Button>
      <div>{children}</div>
    </div>
  )
}

export {Header}
