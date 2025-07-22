import type { CardData } from "../../types/types"
import Card from "../../ui/Card"


interface TeamProps {
  members: CardData[]
}

export default function Team({ members }: TeamProps) {
  return (
    <>
      <div className="w-full bg-gray-01 py-16 space-y-8 ">

        <h1 className='font-display text-center font-normal text-4xl'>Ekibimizle Tanışın</h1>
        <div className="flex justify-center gap-6 flex-wrap">
          {members.map(member => (
            <Card key={member.id} items={member} variant="team" />
          ))}
        </div>

      </div>
    </>
  )
}

