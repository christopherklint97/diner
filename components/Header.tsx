// Header for the app
export default function Header() {
  return (
    <header className="h-10 pt-2 text-white bg-red-400 ">
      <nav className="flex flex-row justify-center w-1/2 mx-auto">
        <a className="mx-4" href="#">
          Home
        </a>
        <a className="mx-4" href="#">
          Github
        </a>
      </nav>
    </header>
  );
}
