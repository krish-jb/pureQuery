export const Footer = () => {
  const currentYear: number = new Date().getFullYear();
  return (
    <div className="text-center p-10 mt-10 border-t dark:border-zinc-700 border-zinc-200">
        <h1>🛸 © {currentYear} PureQuery, Inc.</h1>
    </div>
  )
}
