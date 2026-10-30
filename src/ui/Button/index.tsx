




import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
}

export const Button = ({
  className = "",
  style,
  type = "button",
  onClick,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button type={type}
      className={`transition-all duration-300 ease-in-out
        ${className}
      `}
      style={style}
      onClick={onClick}
      {...rest}
    >

      {children}

    </button>
  )
}

