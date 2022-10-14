const Layout = ({ children }) => {
  return (
    <div className="transition-colors duration-500">
      <header className="flex justify-center items-center h-16 bg-red-500">
        <h1 className="text-white text-4xl tracking-wide text-semibold">Pokedex</h1>
      </header>
      <div className="m-4">
        { children }
      </div>
    </div>
  )
}

export default Layout