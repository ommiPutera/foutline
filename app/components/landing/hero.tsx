import { ButtonLink } from "../ui/button.tsx";

function Hero() {
  return (
    <div className="max-w-screen-2xl px-5vw mx-auto py-10 md:py-14">
      <div className="max-w-2xl mx-auto text-center flex flex-col gap-6 md:gap-8">
        <div className="flex flex-col gap-4 md:gap-6">
          <h6 className="text-sm md:text-lg">Financial web based application</h6>
          <h2 className="text-4xl md:text-7xl font-bold line-clamp-2">Kelola, dan lacak keuangan Anda.</h2>
        </div>
        <h6 className="text-md md:text-xl md:font-medium">Omition adalah platform lengkap bagi mereka yang berjuang dan sering membuat kesalahan dalam pengambilan keputusan ekonomi.</h6>
        <div className="hidden md:flex place-content-center gap-3">
          <ButtonLink to="/" variant="outline" size="lg">Baca tutorial</ButtonLink>
          <ButtonLink to="/register" size="lg">Daftar sekarang</ButtonLink>
        </div>
        <div className="flex flex-col md:hidden place-content-center gap-3">
          <ButtonLink to="/" variant="outline">Baca tutorial</ButtonLink>
          <ButtonLink to="/register">Daftar sekarang</ButtonLink>
        </div>
      </div>
    </div>
  );
}

export default Hero