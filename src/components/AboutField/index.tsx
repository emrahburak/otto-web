import type { IAboutContent } from "../../types/types";


interface AboutFiledProps {
  content: IAboutContent,
  aboutImg: string
}


export default function AboutField({ content,aboutImg }: AboutFiledProps) {
  return (
    <section className="py-10">
      <h2 className="text-4xl font-semibold mb-4 font-display text-center">
        {content.title}
      </h2>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 max-w-6xl mx-auto">
        {/* Sol metin alanı */}
        <div className="flex flex-col items-center justify-center gap-5 w-full">
          <div
            className="prose prose-lg text-gray-700 font-display-02 space-y-3"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        </div>

        {/* Sağ görsel */}
        <div className="mt-14">
          <img
            src={aboutImg}
            alt="Doğa Okulu"
            className="w-full h-auto rounded-sm shadow-md object-cover"
          />
        </div>
      </div>


    </section>
  );
}

