import type { CardData } from "../../types/CardData";
import Card from "../../ui/Card";



interface ActiviteProps {
  cards: CardData[]
}


export default function ActiviteField({ cards }: ActiviteProps) {
  return (
    <div className="p-8 max-w-6xl mx-auto">

      <div className="grid grid-cols-4 gap-5 ">

        {cards.map((card, idx) => (
          <div key={idx} className='w-full max-w-[296px] h-full min-h-[384px]'>
            <Card items={card} variant="activite" />
          </div>
        ))}


      </div>
    </div>
  );
}

