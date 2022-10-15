const Layout = ({ children }) => {
  return (
    <div className="transition-colors duration-500 flex flex-col items-center min-h-screen">
      <header className="flex justify-center items-center py-4 bg-red-400 w-full">
        <h1 className="text-white text-4xl tracking-wide text-semibold">Pokedex</h1>
      </header>
      <div className="w-full p-4 flex flex-col flex-1">
        { children }
      </div>
    </div>
  )
}

export default Layout