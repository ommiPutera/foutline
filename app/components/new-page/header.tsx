import { PageIcon } from "../board/card-item.tsx";

function Header() {
  return (
    <div className="ml-6 flex h-9 items-center">
      <div className="flex items-center gap-2">
        <PageIcon />
        <h4 className="text-sm font-medium">Keuangan bulanan</h4>
      </div>
    </div>
  )
}

export { Header }