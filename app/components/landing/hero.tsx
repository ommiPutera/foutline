import { ButtonLink } from '../ui/button.tsx'

function Hero() {
  return (
    <div className="mx-auto max-w-screen-2xl px-5vw py-10 md:py-14">
      <div className="mx-auto flex flex-col items-center gap-6 text-center md:gap-8">
        <h2 className="line-clamp-3 max-w-4xl text-2xl font-medium md:text-7xl">
          Catatan Keuangan anda dalam Satu Aplikasi
        </h2>
        <p className="text-md max-w-2xl font-light md:text-2xl">
          Solusi keuangan berbasis <b className='underline'>Note-Taking</b> yang mempermudah dalam mempelajari dan merekem keuangan anda
        </p>
        <div className="hidden place-content-center gap-3 md:flex">
          <ButtonLink to="/" prefetch="intent" variant="outline" size="lg">
            Baca tutorial
          </ButtonLink>
          <ButtonLink to="/register" prefetch="intent" size="lg">
            Daftar sekarang
          </ButtonLink>
        </div>
        <div className="flex flex-col place-content-center gap-3 md:hidden">
          <ButtonLink prefetch="intent" to="/" variant="outline">
            Baca tutorial
          </ButtonLink>
          <ButtonLink prefetch="intent" to="/register">
            Daftar sekarang
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}

export default Hero
