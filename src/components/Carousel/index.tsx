import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Autoplay } from 'swiper/modules';
import Card from '../../ui/Card';
import { Link } from 'react-router-dom';
import type { CardData } from '../../types/types';


interface CarouselProps {
  cards: CardData[]
}


export default function Carousel({ cards }: CarouselProps) {
  return (
    <>
      <div className='bg-gray-01 w-full space-y-14 py-16 grid grid-cols-1'>
        <h1 className='font-display text-center font-normal text-4xl'>ETKİNLİKLER</h1>

        <Swiper
          loop={true}
          pagination={{ clickable: true }}
          breakpoints={{
            375: {
              slidesPerView: 1,
              spaceBetween: 20,
            },

            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }} autoplay={{ delay: 3500, disableOnInteraction: false }}
          modules={[Autoplay]}
          className="w-full overflow-hidden mx-auto max-w-full sm:max-w-xl md:max-w-4xl lg:max-w-6xl"
        >

          {cards.map((card, idx) => (
            <SwiperSlide key={idx} className='flex justify-center ' style={{ overflow: "visible" }} >
              <div className='w-full max-w-[296px]  h-full min-h-[384px] mx-auto'>
                <Card items={card} variant='default' />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <Link to={"/activites"} className="font-display font-semibold text-white py-2 px-6 bg-green-01 w-fit mx-auto rounded-full leading-normal hover:bg-orange-01">
          AKTİVİTELER
        </Link>


      </div>
    </>
  );
}



