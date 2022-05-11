import ButtonLogin from "@/components/layout/nav/ButtonLogin";
import ButtonRegister from "@/components/layout/nav/ButtonRegister";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";

function HeaderSectionLogin() {
  const [cookieObtenida, setCookieObtenida] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    const jwtTokenObtenido = Cookies.get("token");
    if (jwtTokenObtenido) {
      setCookieObtenida(jwtTokenObtenido);
    }
  }, []);

  const logOut = () => {
    Cookies.remove("token");
    window.localStorage.removeItem("username");
    Router.reload();
  };

  return cookieObtenida !== undefined ? (
    <div className="bg-red-800 grid gap-3 p-4 sm:flex sm:p-0">
      <section className="flex items-center justify-items-center gap-2">
        <p className="text-white text-xl">
          {`${window.localStorage.getItem("username")}`}
        </p>
      </section>
      <div className="flex justify-center p-4 sm:p-0">
        <Button bordered auto shadow onClick={logOut} color="error">
          <p className=" text-white text-lg">Cerrar Sesion</p>
        </Button>
      </div>
    </div>
  ) : (
    <div className="grid bg-red-800  gap-3 p-4 sm:flex sm:p-0">
      <ButtonLogin />
      <ButtonRegister />
    </div>
  );
}

export default HeaderSectionLogin;
