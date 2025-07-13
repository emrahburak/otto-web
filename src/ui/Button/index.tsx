import type React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "social" | "icon"
  size?: "sm" | "md" | "lg" | "xs"
  icon?: React.ReactNode
  children?: React.ReactNode
  className?: string
  type?: "button" | "submit" | "reset"
  onClick?: () => void
  disabled?: boolean
}

const variantStyles = {
  primary: "bg-pink-500 text-white hover:bg-pink-600",
  secondary: "bg-gray-700 text-white hover:bg-gray-800",
  ghost: "bg-transparent text-white hover:bg-gray-700",
  social: "bg-white text-black hover:bg-gray-100 border rounded-full",
  icon: "bg-transparent text-white hover:bg-pink-500 rounded-full",
}

const sizeStyles = {
  xs: "w-6 h-6 text-xs",
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
}




export const Button = ({
  variant = "primary",
  size = "md",
  icon,
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) => {
  const isIconOnly = !!icon && !children

  return (
    <button
      type={type}
      className={`
        inline-flex items-center justify-center gap-2 
        font-medium transition-all disabled:opacity-50 disabled:pointer-events-none
        ${variantStyles[variant]}
        ${isIconOnly ? sizeStyles["xs"] : sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}

