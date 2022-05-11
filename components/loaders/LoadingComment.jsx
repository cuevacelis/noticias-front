import { Loading } from "@nextui-org/react";

function LoadingComment() {
  return (
    <section className="h-auto grid place-content-center  ">
      <Loading color="error" textColor="error" type="default" size="xl">
        Cargando Comentarios...
      </Loading>
    </section>
  );
}

export default LoadingComment;
