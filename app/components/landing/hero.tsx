function Hero() {
  return (
    <div className="px-5vw mx-auto flex max-w-screen-xl gap-20 py-4 md:pb-44 md:pt-16">
      <div className="w-full flex-1">
        <div className="flex flex-col gap-6">
          <h2 className="max-w-xl text-4xl font-semibold leading-loose tracking-tighter md:text-5xl">
            Personal financial management and tracker.
          </h2>
          <p className="text-base font-light text-black/70 dark:text-white/70 md:max-w-md md:font-light">
            Solusi manajamen keuangan yang berbasis{' '}
            <b className="font-bold">Note-Taking app</b> yang memudahkan dalam
            mempelajari dan merekem data keuangan Anda
          </p>
        </div>
      </div>
      <div className="w-full flex-1"></div>
    </div>
  )
}

export default Hero
