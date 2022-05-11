import { Loading } from "@nextui-org/react";

function LoadingPage() {
  return (
    <section className="w-screen h-screen grid place-content-center  ">
      <Loading color="error" textColor="error" type="default" size="xl">
        The Daily News...
      </Loading>
    </section>
  );
}

export default LoadingPage;
