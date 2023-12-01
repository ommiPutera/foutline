import { useRootLoader } from "~/utils/use-root-loader.tsx"
import { getLogo } from "./omition-logo.tsx"
import { ButtonLink } from "./ui/button.tsx"
import { Link } from "@remix-run/react"

function Navbar() {
  const { user } = useRootLoader()
  const OmitionLogo = getLogo()

  if (user) return <></>
  return (
    <div className="border-b border-[#F0F0F0] bg-background shadow-navbar backdrop-blur-[12px] sticky top-0">
      <div className="max-w-7xl mx-auto h-16 flex items-center use-matter">
        <nav className="flex items-center justify-between w-full px-5vw">
          <Link to="/">
            <OmitionLogo />
          </Link>
          <div className="flex items-center gap-2">
            <ButtonLink to="/login" variant="ghost" className="text-lg md:text-sm">Masuk</ButtonLink>
            <ButtonLink to="/register" className="hidden md:flex">Daftar Sekarang</ButtonLink>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar