import React from 'react'

// eslint-disable-next-line react/display-name
export const Input = React.forwardRef<
  HTMLInputElement,
  {
    [k: string]: unknown
  }
>(({ ...props }, ref) => {
  return (
    <input
      ref={ref}
      className="mb-2 focus:outline-none dark:bg-gray-500 bg-white dark:text-gray-200 shadow-lg rounded-md focus:ring-4 px-4 py-3 font-sans"
      {...props}
    />
  )
})
