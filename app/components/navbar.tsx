import { useRootLoader } from "~/utils/use-root-loader.tsx"
import { getLogo } from "./omition-logo.tsx"
import { Button } from "./ui/button.tsx"
import { useNavigate } from "@remix-run/react"

function Navbar() {
  const { user } = useRootLoader()
  const navigate = useNavigate()
  const OmitionLogo = getLogo()

  if (user) return <></>
  return (
    <div className="max-w-7xl mx-auto h-20 flex items-center">
      <nav className="flex items-center justify-between w-full px-5vw">
        <OmitionLogo />
        <div>
          {/* <ButtonLink></ButtonLink> */}
          <Button onClick={() => navigate('/login')}>Log In</Button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar