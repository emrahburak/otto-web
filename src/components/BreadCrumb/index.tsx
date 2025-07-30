type Crumb = {
  label: string
  href?: string
}

type BreadCrumbProps = {
  items: Crumb[]
}

export default function BreadCrumb({ items }: BreadCrumbProps) {
  return (
    <>
      <nav aria-label="breadcrumb" className="w-full min-h-[288px] bg-[url(@/assets/ui/bg-heading.png)] bg-cover bg-center bg-no-repeat mt-5 flex items-center justify-center">

        <div >
          <div>
            <h1 className="text-3xl text-white font-bold font-display text-center ">
              {items[items.length - 1]?.label.toUpperCase().replace("I", "İ")}
            </h1>

          </div>

          <ol className="flex space-x-2 justify-center">

            {items.map((item, index) => {
              const isLast = index === items.length - 1
              return (
                <li key={index} className="flex items-center text-white font-display ">
                  {!isLast && item.href ? (
                    <a href={item.href} className="hover:text-black transition-all duration-300 ease-in-out">
                      {item.label.toUpperCase()}
                    </a>
                  ) : (
                    <span className="">{item.label.toUpperCase()}</span>
                  )}
                  {!isLast && <span className="mx-2">~</span>}
                </li>
              )
            })}
          </ol>


        </div>

      </nav>

    </>
  )
}

