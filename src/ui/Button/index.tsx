

export const Button = (props: any) => {
  const { className = "", icon , style, link} = props

  return (
    <button
      className={`transition-all
        ${className}
      `}
      style={style}
    >
    <a href={link} className="w-full h-full" target="_blank">
      <span id="icon">
        {icon}
      </span>

      {props.children}

    </a>
    </button>
  )
}

