import aboutImg from "@/assets/otto-12.jpg"
import { aboutContent } from "../../data/content";



export default function AboutField() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1">
        <div className="flex flex-col items-center justify-center gap-5">
          <h2 className="text-4xl font-semibold mb-4 font-display">
            {
              aboutContent.title
            }
          </h2>
          <p className="text-lg text-gray-500 font-display-02">
            {aboutContent.content}
          </p>
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

