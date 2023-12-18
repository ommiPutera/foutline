import Landing from '~/components/landing/index.tsx'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '~/components/ui/tabs.tsx'
import Board from './board.tsx'
import { useRootLoader } from '~/utils/use-root-loader.tsx'

export type LoaderData = {
  isAuthenticated: boolean
}

function Index() {
  const { isAuthenticated } = useRootLoader()

  if (!isAuthenticated) return <Landing />
  return (
    <Tabs defaultValue="board" className='md:mt-[-2rem]'>
      <TabsList>
        <TabsTrigger value="board">Semua</TabsTrigger>
      </TabsList>
      <TabsContent value="board" asChild>
        <Board />
      </TabsContent>
    </Tabs>
  )
}

export default Index
