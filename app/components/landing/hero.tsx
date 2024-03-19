function Hero() {
  return (
    <div className="px-5vw mx-auto flex flex-col md:flex-row max-w-screen-xl gap-2 md:gap-8 py-4 md:pb-32">
      <div className="w-full max-w-[450px] mt-24">
        <div className="flex flex-col gap-6">
          <h2 className="max-w-xl text-5xl font-normal tracking-tight md:max-w-lg md:text-5xl">
            Personal financial management and tracker.
          </h2>
          <p className="text-base font-light text-black/70 dark:text-white/70 md:max-w-xs md:font-light">
            Solusi manajamen keuangan yang berbasis{' '}
            <b className="font-bold">Note-Taking</b> yang memudahkan dalam
            mempelajari dan merekem data keuangan Anda.
          </p>
        </div>
      </div>
      <div className="w-full relative">
        <div className="absolute left-0 top-0 w-[1000px] md:block hidden">
          <img src="/hero.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Hero
