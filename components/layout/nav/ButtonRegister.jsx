import React, { useState } from "react";
import { Modal, Button, Text, Input } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";

export default function ButtonRegister(props) {
  const [visible, setVisible] = useState(false);

  const {
    control: controlCreateAccount,
    handleSubmit: handleSubmitCreateAccount,
    watch: watchCreateAccount,
    formState: { errors },
  } = useForm();

  const passValue = watchCreateAccount(["pass"]);

  const onSubmitCreateAccount = async (data) => {
    const dataPOST = {
      userName: data.user,
      email: data.email,
      password: data.pass,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACK}/api/auth/local/register`,
      {
        method: "POST",
        body: JSON.stringify(dataPOST),
        headers: { "Content-Type": "application/json" },
      }
    );
    const resp = await response.json();
    if (resp.status === "success") {
      setVisible(false);
      alert("Se creo la cuenta correctamente.");
    } else {
      setVisible(false);
      alert(resp.msg);
    }
  };

  return (
    <div>
      <Button bordered auto onClick={() => setVisible(true)} color="error">
        <p className="text-white text-lg">Register</p>
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Register in
            <Text b size={18}>
              THE DAILY
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-2">
            <Controller
              name="user"
              control={controlCreateAccount}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    bordered
                    fullWidth
                    color="primary"
                    size="md"
                    placeholder="Usuario"
                  />
                  {fieldState?.error?.message && (
                    <span
                      style={{ color: "red", fontSize: "small" }}
                      role="alert"
                    >
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
            <Controller
              name="email"
              control={controlCreateAccount}
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
                    bordered
                    fullWidth
                    color="primary"
                    size="md"
                    placeholder="Email"
                  />
                  {fieldState?.error?.message && (
                    <span
                      style={{ color: "red", fontSize: "small" }}
                      role="alert"
                    >
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
            <Controller
              name="pass"
              control={controlCreateAccount}
              rules={{
                required: { value: true, message: "Contraseña requerido." },
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
                    fullWidth
                    color="primary"
                    size="md"
                    placeholder="Contraseña"
                  />
                  {fieldState?.error?.message && (
                    <span
                      style={{ color: "red", fontSize: "small" }}
                      role="alert"
                    >
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
            <Controller
              name="repeatPass"
              control={controlCreateAccount}
              rules={{
                required: {
                  value: true,
                  message: "Ingresa de nuevo la contraseña.",
                },
                minLength: {
                  value: 8,
                  message:
                    "La longuitud de la contraseña debe ser al menos 8 caracteres.",
                },
                validate: {
                  comparePass: (value) =>
                    value === passValue.toString() ||
                    "La contraseña ingresada no es la misma.",
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  <Input.Password
                    {...field}
                    bordered
                    fullWidth
                    color="primary"
                    size="md"
                    placeholder="Repetir contraseña"
                  />
                  {fieldState?.error?.message && (
                    <span
                      style={{ color: "red", fontSize: "small" }}
                      role="alert"
                    >
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={() => setVisible(false)}>
            Cerrar
          </Button>
          <Button
            auto
            onClick={handleSubmitCreateAccount(onSubmitCreateAccount)}
          >
            Registrarse
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
