import aboutImg from "@/assets/otto-12.jpg"
import { Link } from "react-router-dom"





export default function AboutField() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1">
        <div className="flex flex-col items-center justify-center gap-5">
          <h2 className="text-4xl font-semibold mb-4 font-display">
            Lacus pellentesque libero imperdiet nullam nullam, porttitor consectetur neque finibus.
          </h2>
          <p className="text-lg text-gray-500 font-display-02">
            Nec, diam suscipit, consectetur luctus eget aenean ut risus tristique nascetur amet. Dui ipsum pharetra convallis, magna, vitae dolor urna urna erat suscipit nascetur. Lectus amet, metus pulvinar magna ut, dolor consectetur morbi turpis lectus nibh. Vel, justo consectetur, sit sed dictum nunc id rutrum consequat ante ultrices. Suscipit lorem.
          </p>
        </div>
        <div className="grid grid-flow-col">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Link key={idx} to="/about">
              <span className="inline-flex items-center justify-center bg-orange-500 text-white rounded-full aspect-square p-3 text-sm">
                Link {idx + 1}
              </span>
            </Link>
          ))}
        </div>


      </div>
      <div>
        <img
          src={aboutImg}
          alt="Doğa Okulu"
          className="w-full h-auto rounded-sm shadow-md object-cover"
        />
      </div>
    </div>
  );
}

