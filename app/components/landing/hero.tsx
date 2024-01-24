import {ButtonLink} from '../ui/button.tsx'

function Hero() {
  return (
    <div className="px-5vw mx-auto max-w-screen-2xl py-4 md:pb-44 md:pt-28">
      <div className="mx-auto flex flex-col items-center gap-8 text-center md:gap-12">
        <div className="flex flex-col items-center gap-6">
          <h2 className="max-w-xl text-4xl font-medium md:max-w-4xl md:text-6xl md:leading-none">
            Catatan untuk keuangan
          </h2>
          <p className="text-lg font-normal text-black/70 dark:text-white/70 md:max-w-3xl md:text-xl md:font-light">
            Solusi keuangan yang berbasis pada{' '}
            <b className="font-semibold text-black underline dark:text-white">
              Note-Taking
            </b>{' '}
            yang memudahkan dalam mempelajari dan merekem data keuangan anda
          </p>
        </div>
        <div className="flex place-content-center gap-3">
          <ButtonLink to="/register" prefetch="intent" size="lg">
            Daftar sekarang
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}

export default Hero
