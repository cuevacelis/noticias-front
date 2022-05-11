import Link from "next/link";
import { useRouter } from "next/router";
import HeaderSectionLogin from "./HeaderSectionLogin";
import { User, Spacer } from "@nextui-org/react";

function NavBar() {
  const router = useRouter();

  const handleClickBookmarks = (e) => {
    e.preventDefault();
    if (router.pathname === "/bookmarks") {
      router.back();
    } else {
      router.push("/bookmarks", "/bookmarks", { scroll: false });
    }
  };

  return (
    <>
      <nav className="bg-red-800 grid grid-cols-2 justify-center py-5 px-3 w-full z-10">
        <div className="sm:flex sm:justify-center">
          <Link href={"/"}>
            <a>
              <h1 className="text-white text-4xl font-bold">THE DAILY</h1>
            </a>
          </Link>
        </div>

        <section className="flex sm:justify-center items-center justify-end">
          <div
            onClick={handleClickBookmarks}
            className="sm:hidden cursor-pointer "
            aria-label="Mas Opciones"
          >
            <User
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              name=""
              size="lg"
            />
          </div>
          <div className="hidden sm:block">
            <HeaderSectionLogin />
          </div>
        </section>
      </nav>
    </>
  );
}

export default NavBar;
