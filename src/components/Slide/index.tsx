import { Swiper, SwiperSlide } from "swiper/react"


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
//

// import required modules
import { Autoplay } from 'swiper/modules';
import type { SlideContent } from "../../types/types";


interface SlideProps {
  slides: SlideContent[]
}

export default function Slide({ slides }: SlideProps) {
  return (
    <Swiper autoplay={{ delay: 3500, disableOnInteraction: false }}
      loop={true}
      modules={[Autoplay]} className="mySwiper w-full h-[600px] ">
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="relative w-full h-full cursor-grab">
            <picture className="w-full h-full block">
              <source srcSet={slide.img.replace(/\.(jpg|jpeg|png)$/i, ".webp")} type="image/webp" />
              <img
                src={slide.img}
                alt={slide.banner}
                className="w-full h-full object-cover"
              />
            </picture>
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white p-4 gap-8">
              <h1 className="text-6xl font-semibold font-display text-center">{slide.banner}</h1>
              {slide.description && (
                <p className="text-xl text-center max-w-md font-display-02">{slide.description}</p>
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

