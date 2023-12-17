import {ButtonLink} from '../ui/button.tsx'

function Hero() {
  return (
    <div className="px-5vw mx-auto max-w-screen-2xl py-10 md:py-14">
      <div className="mx-auto flex max-w-2xl flex-col gap-6 text-center md:gap-8">
        <div className="flex flex-col gap-4 md:gap-6">
          <h6 className="text-muted-foreground text-sm md:text-lg">
            Financial web based application
          </h6>
          <h2 className="line-clamp-2 text-4xl font-bold md:text-7xl">
            Kelola, dan lacak keuangan Anda.
          </h2>
        </div>
        <h6 className="text-md md:text-xl">
          Omition adalah platform lengkap bagi mereka yang berjuang dan sering
          membuat kesalahan dalam pengambilan keputusan ekonomi.
        </h6>
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
