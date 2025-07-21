import type { CardData } from "../../types/CardData";
import Card from "../../ui/Card";



interface ActiviteProps {
  cards: CardData[]
}


export default function ActiviteField({ cards }: ActiviteProps) {
  return (
    <>
      {cards.map((card, idx) => (
        <div key={idx} className="w-full sm:max-w-none md:max-w-none lg:max-w-[296px] h-full min-h-[384px]"
        >
          <Card items={card} variant="activite" />
        </div>
      ))}
    </>
  );
}

