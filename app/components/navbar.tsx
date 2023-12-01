import { useRootLoader } from "~/utils/use-root-loader.tsx"
import { getLogo } from "./omition-logo.tsx"

function Navbar() {
  const { user } = useRootLoader()
  const OmitionLogo = getLogo()

  if (user) return <></>
  return (
    <div className="px-5vw max-w-7xl mx-auto h-20 flex items-center">
      <nav className="flex justify-between w-full">
        <OmitionLogo />
        <div>right</div>
      </nav>
    </div>
  )
}

export default Navbar