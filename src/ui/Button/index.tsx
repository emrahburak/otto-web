




export const Button = (props: any) => {
  const { className = "",  style, type="button" } = props

  return (
    <button type={type}
      className={`transition-all duration-300 ease-in-out
        ${className}
      `}
      style={style}
    >

      {props.children}

    </button>
  )
}

