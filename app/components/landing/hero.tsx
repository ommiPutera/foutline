import { Button, ButtonLink } from '../ui/button.tsx'

function Hero() {
  return (
    <div className="px-5vw mx-auto flex max-w-screen-xl flex-col gap-2 py-4 md:flex-row md:gap-2 md:py-36">
      <div className="mt-16 w-full">
        <div className="flex flex-col gap-6">
          <div className="cursor-none">
            <Button variant="outline" size="sm" className="rounded-full">
              Ready to be more productive? 👀
            </Button>
          </div>
          <h2 className="max-w-xl text-5xl font-normal tracking-tight md:text-6xl w-full">
            Personal <span className='text-foreground/70'>financial management</span> tool and tracker.
          </h2>
          <p className="text-xl font-light text-black/70 dark:text-white/70 md:max-w-[25rem] md:font-light">
            Solusi manajamen keuangan yang berbasis{' '}
            <b className="font-bold">Note-Taking</b> yang memudahkan dalam
            mempelajari dan merekem data keuangan Anda.
          </p>
          <div className="mt-4">
            <ButtonLink className="rounded-full font-normal" to="/login">
              Mulai coba gratis
            </ButtonLink>
          </div>
        </div>
      </div>
      <div className="relative w-full">
        <div className="absolute left-0 top-0 hidden w-[910px] rounded-xl border px-1 shadow-2xl shadow-monthly-background md:block">
          <img
            src="/hero.png"
            alt=""
            className="hidden rounded-xl dark:block"
          />
          <img
            src="/hero2.png"
            alt=""
            className="block rounded-xl dark:hidden"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
