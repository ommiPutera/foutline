import { ButtonLink } from '../ui/button.tsx'

function Hero() {
  return (
    <div className="px-5vw mx-auto flex max-w-screen-xl flex-col gap-2 py-4 md:flex-row md:gap-2 md:pb-36 md:pt-20">
      <div className="mt-20 w-full">
        <div className="flex flex-col gap-6">
          <h2 className="max-w-xl text-5xl font-normal tracking-tight md:text-[60px] 4xl:text-[45px] w-full">
            Personal <span className='text-foreground/70'>financial management</span> tool and tracker.
          </h2>
          <p className="text-lg font-light text-black/70 dark:text-white/70 md:max-w-[25rem]">
            Solusi manajamen keuangan yang berbasis{' '}
            <b className="font-bold">Note-Taking</b> yang memudahkan dalam
            mempelajari dan merekem data keuangan Anda.
          </p>
          <div className="mt-4">
            <ButtonLink className="rounded-full" to="/login">
              Masuk
            </ButtonLink>
          </div>
        </div>
      </div>
      <div className="relative w-full">
        <div className="absolute left-0 top-0 hidden w-[910px] dark:w-[720px] md:block border rounded-xl">
          <img
            src="/hero.png"
            alt=""
            className="hidden dark:block rounded-xl"
          />
          <img
            src="/hero2.png"
            alt=""
            className="block dark:hidden rounded-xl"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
