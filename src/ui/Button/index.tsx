




export const Button = (props: any) => {
  const {
    className = "",
    style,
    type = "button",
    onClick, // ← Eksikti, ekliyoruz
    children,
    ...rest // opsiyonel: diğer prop’ları alabilsin diye
  } = props;

  return (
    <button type={type}
      className={`transition-all duration-300 ease-in-out
        ${className}
      `}
      style={style}
      onClick={onClick}
      {...rest}
    >

      {props.children}

    </button>
  )
}

