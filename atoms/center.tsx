interface ICenter {
  children: React.ReactNode
  classes?: string
}

export const Center = ({ children, classes }: ICenter): JSX.Element => (
  <div className={`flex items-center justify-center ${classes}`}>
    {children}
  </div>
)
