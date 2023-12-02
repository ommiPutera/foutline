import { useRootLoader } from "~/utils/use-root-loader.tsx"
import { getLogo } from "./omition-logo.tsx"
import { Link } from "@remix-run/react"

function Footer() {
  const { user } = useRootLoader()
  const OmitionLogo = getLogo()

  if (user) return <></>
  return (
    <footer className="bg-background border-t border-accent pb-16 pt-12 dark:border-gray-600 mt-auto">
      <div className="max-w-screen-2xl mx-auto h-16 md:h-24 flex items-center use-matter">
        <div className="flex items-center w-full px-5vw">
          <Link to="/" className="flex-1 place-content-start">
            <OmitionLogo />
          </Link>
          <ul className="flex place-content-end flex-1 gap-8 text-sm font-medium">
            <li>Blog</li>
            <li>Fitur</li>
            <li>Tutorial</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer