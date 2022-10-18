import Link from 'next/link'

const Layout = ({ children }) => {
  return (
    <div className="transition-colors duration-500 flex flex-col items-center min-h-screen">
      <header className="flex justify-center items-center py-4 bg-red-400 w-full font-rubik">
        <Link href={'/'}>
          <h1 className="text-white text-4xl tracking-wide text-semibold cursor-pointer">Pokedex</h1>
        </Link>
      </header>
      <div className="w-full p-8 flex flex-col flex-1 font-rslab">
        { children }
      </div>
    </div>
  )
}

export default Layout