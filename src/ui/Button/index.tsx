

export const Button = (props: any) => {
  const { className = "",  style, } = props

  return (
    <button
      className={`transition-all
        ${className}
      `}
      style={style}
    >

      {props.children}

    </button>
  )
}

