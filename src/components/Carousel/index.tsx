import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Autoplay } from 'swiper/modules';
import type { CardData } from '../../types/CardData';
import Card from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Link } from 'react-router-dom';


interface CarouselProps {
  cards: CardData[]
}


export default function Carousel({ cards }: CarouselProps) {
  return (
    <>
      <div className='bg-gray-01 w-full space-y-14 py-16 grid grid-cols-1'>
        <h1 className='font-display text-center font-normal text-4xl'>ETKİNLİKLER</h1>

        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          modules={[Autoplay]}
          className="max-w-6xl mx-auto  "
        >
          {cards.map((card, idx) => (
            <SwiperSlide key={idx}>
              <Card items={card} />
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



