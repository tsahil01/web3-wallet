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
} from "@/components/ui/alert-dialog";

export default function SeedPhaseComponent({
  seedPhase,
}: Readonly<{ seedPhase: string[] }>) {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-100 md:px-4 px-2 md:py-2 py-1 rounded-md my-auto md:text-sm text-xs">
          My Seed Phase
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Seed Phase</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="grid md:grid-cols-4 grid-cols-3 gap-2 mx-auto">
                {seedPhase.map((word, index) => (
                  <div
                    key={index}
                    className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-100 md:px-4 px-2 md:py-2 py-2 rounded-md my-auto md:text-sm text-sm"
                  >
                    {word}
                  </div>
                ))}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="mx-auto">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
