import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog.tsx'

function RemoveAllInTrash({
  children,
  cbAction,
}: React.HTMLAttributes<HTMLDivElement> & {cbAction: () => void}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus selamanya?</AlertDialogTitle>
          <AlertDialogDescription>
            Semua item dalam sampah akan dihapus selamanya dan Anda tidak akan
            dapat memulihkannya.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={cbAction}>
            Hapus selamanya
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default RemoveAllInTrash
