import { useRootLoader } from "~/utils/use-root-loader.tsx"

function Navbar() {
  const { user } = useRootLoader()

  if (user) return <></>
  return (
    <div className="px-5vw py-9 lg:py-12">
      <nav>
        Navbar
        <br />
      </nav>
    </div>
  )
}

export default Navbar