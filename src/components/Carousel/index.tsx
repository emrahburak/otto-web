import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Autoplay } from 'swiper/modules';
import type { CardData } from '../../types/CardData';
import Card from '../../ui/Card';


interface CarouselProps {
  cards: CardData[]
}


export default function Carousel({ cards }: CarouselProps) {
  return (
    <>
      <div className='bg-gray-01 w-full space-y-14 py-16'>
      <h1 className='font-display text-center font-normal text-4xl'>ETKİNLİKLER</h1>

        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          modules={[ Autoplay]}
          className="max-w-6xl mx-auto"
        >
          {cards.map((card, idx) => (
            <SwiperSlide key={idx}>
              <Card items={card} />
            </SwiperSlide>
          ))}
        </Swiper>


      </div>
    </>
  );
}



