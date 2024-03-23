import { ButtonLink } from '../ui/button.tsx'

function Hero() {
  return (
    <div className="px-5vw mx-auto max-w-screen-xl gap-8 py-4 md:gap-12 md:pb-36 flex flex-col">
      <div className="py-4 mt-12 w-full flex text-center items-center justify-center">
        <div className="flex flex-col gap-6 items-center justify-center">
          <h2 className="max-w-2xl text-4xl leading-9 md:leading-[62px] font-bold tracking-tighter md:text-[66px] 4xl:leading-[52px] 4xl:text-[56px] w-full">
            Aplikasi manajemen keuangan berbasis pencatatan.
          </h2>
          <p className="text-xl font-light leading-6 text-black/70 dark:text-white/70 md:max-w-[32rem]">
            Tulis keuangan pribadi Anda sehingga memudahkan dalam
            mempelajari dan merekam, untuk mencapai tujuan keuangan.
          </p>
          <div className="mt-8">
            <ButtonLink variant="primary" to="/login" size="lg">
              Mulai coba gratis
            </ButtonLink>
          </div>
        </div>
      </div>
      <div className='py-4 h-[48rem]'>
        <div className='h-[56rem] bg-gradient-to-t from-blue-100/30 dark:from-note-background to-background w-full absolute left-0'></div>
        <div className='md:w-full hidden md:block absolute max-w-screen-lg mx-auto inset-x-0'>
          <div className='border rounded-xl shadow-2xl shadow-note-background'>
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
          <div className='mt-12 flex'>
            <div className='w-full flex-1 h-full px-6 py-4 flex flex-col gap-4 text-center'>
              <h4 className='text-lg font-bold'>Scale and performance</h4>
              <p className='text-sm max-w-[14rem] mx-auto text-black/70 dark:text-white/70'>Our technology, built on Vitess, offers proven performance and scale at every size.</p>
            </div>
            <div className='w-full flex-1 border-x border-foreground/20 h-full px-6 py-4 flex flex-col gap-4 text-center'>
              <h4 className='text-lg font-bold'>Scale and performance</h4>
              <p className='text-sm max-w-[14rem] mx-auto text-black/70 dark:text-white/70'>Our technology, built on Vitess, offers proven performance and scale at every size.</p>
            </div>
            <div className='w-full flex-1 h-full px-6 py-4 flex flex-col gap-4 text-center'>
              <h4 className='text-lg font-bold'>Scale and performance</h4>
              <p className='text-sm max-w-[14rem] mx-auto text-black/70 dark:text-white/70'>Our technology, built on Vitess, offers proven performance and scale at every size.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
