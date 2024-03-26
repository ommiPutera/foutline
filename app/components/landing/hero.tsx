import {ButtonLink} from '../ui/button.tsx'

function Hero() {
  return (
    <div className="px-5vw mx-auto flex max-w-screen-xl flex-col gap-8 py-4 md:gap-12 md:pb-36">
      <div className="mt-12 flex w-full items-center justify-center py-4 text-center">
        <div className="flex flex-col items-center justify-center gap-6">
          <h2 className="4xl:leading-[52px] 4xl:text-[56px] w-full max-w-2xl text-4xl font-bold leading-9 tracking-tighter md:text-[66px] md:leading-[62px]">
            Aplikasi manajemen keuangan berbasis pencatatan.
          </h2>
          <p className="text-xl font-light leading-6 text-black/70 dark:text-white/70 md:max-w-[32rem]">
            Tulis keuangan pribadi Anda sehingga memudahkan dalam mempelajari
            dan merekam, untuk mencapai tujuan keuangan.
          </p>
          <div className="mt-8">
            <ButtonLink variant="primary" to="/login" size="lg">
              Mulai coba gratis
            </ButtonLink>
          </div>
        </div>
      </div>
      <div className="h-[48rem] py-4">
        <div className="dark:from-note-background to-background absolute left-0 h-[56rem] w-full bg-gradient-to-t from-blue-100/30"></div>
        <div className="absolute inset-x-0 mx-auto hidden max-w-screen-lg md:block md:w-full">
          <div className="shadow-note-background rounded-xl border shadow-2xl">
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
          <div className="mt-12 flex">
            <div className="flex h-full w-full flex-1 flex-col gap-4 px-6 py-4 text-center">
              <h4 className="text-lg font-bold">Scale and performance</h4>
              <p className="mx-auto max-w-[14rem] text-sm text-black/70 dark:text-white/70">
                Our technology, built on Vitess, offers proven performance and
                scale at every size.
              </p>
            </div>
            <div className="border-foreground/20 flex h-full w-full flex-1 flex-col gap-4 border-x px-6 py-4 text-center">
              <h4 className="text-lg font-bold">Scale and performance</h4>
              <p className="mx-auto max-w-[14rem] text-sm text-black/70 dark:text-white/70">
                Our technology, built on Vitess, offers proven performance and
                scale at every size.
              </p>
            </div>
            <div className="flex h-full w-full flex-1 flex-col gap-4 px-6 py-4 text-center">
              <h4 className="text-lg font-bold">Scale and performance</h4>
              <p className="mx-auto max-w-[14rem] text-sm text-black/70 dark:text-white/70">
                Our technology, built on Vitess, offers proven performance and
                scale at every size.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
