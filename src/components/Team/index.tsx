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
        <div className=" mx-auto w-full " style={{maxWidth:"1320px"}}>
          <div className="flex items-center justify-center w-full mb-8">
            <Card items={members[0]} variant="team" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {members.slice(1).map(member => (
              <div key={member.id} className="flex items-center justify-center">
                <Card items={member} variant="team" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}

