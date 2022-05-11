import React from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import Router from "next/router";

export default function ButtonLogin(props) {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const {
    control: controlLogin,
    handleSubmit: handleSubmitLogin,
    watch: watchLogin,
  } = useForm();

  const onSubmitLogin = async (data) => {
    const dataPOST = {
      email: data.email,
      password: data.pass,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACK}/api/auth/local/login`,
      {
        method: "POST",
        body: JSON.stringify(dataPOST),
        headers: { "Content-Type": "application/json" },
      }
    );
    const resp = await response.json();
    if (resp.status === "success") {
      console.log("Se logro un login exitoso", resp);
      Cookies.set("token", resp.envio);

      window.localStorage.setItem("username", resp.username);
      setVisible(false);
      Router.reload();
    } else {
      alert(resp.message);
    }
  };

  return (
    <div>
      <Button bordered auto onClick={handler} color="error">
        <p className="text-white text-lg">Login</p>
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Login
          </Text>
        </Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-2">
            <Controller
              name="email"
              control={controlLogin}
              rules={{
                required: { value: true, message: "Email requerido." },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email no válido",
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    clearable
                    bordered
                    labelLeft="Email:"
                    fullWidth
                    color={fieldState?.error?.message ? "error" : "primary"}
                    status={fieldState?.error?.message ? "error" : "default"}
                    size="md"
                    placeholder="Ingresa tú email"
                    className="bg-white"
                  />
                  {fieldState?.error?.message && (
                    <span className="text-red-500 text-sm" role="alert">
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
            <Controller
              name="pass"
              control={controlLogin}
              rules={{
                required: { value: true, message: "Contraseña requerida." },
                minLength: {
                  value: 5,
                  message:
                    "La longuitud de la contraseña, debe ser mayor a 4 caracteres.",
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  <Input.Password
                    {...field}
                    bordered
                    labelLeft="Pass:"
                    fullWidth
                    color={fieldState?.error?.message ? "error" : "primary"}
                    status={fieldState?.error?.message ? "error" : "default"}
                    size="md"
                    placeholder="Ingresa tú contraseña"
                    className="bg-white"
                  />
                  {fieldState?.error?.message && (
                    <span className="text-red-500 text-sm" role="alert">
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Cerrar
          </Button>
          <Button auto onClick={handleSubmitLogin(onSubmitLogin)}>
            Iniciar Sesion
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
