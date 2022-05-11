import { Avatar } from "@nextui-org/react";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import LoadingComment from "@/components/loaders/LoadingComment";

export default function Comments(props) {
  const idTextArea = useRef(null);
  const [viewComments, setViewComments] = useState("hide");
  const [loadingComments, setLoadingComments] = useState(false);
  const [getComments, setComments] = useState(null);
  const [getTokenUser, setTokenUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [selectedFileEdit, setselectedFileEdit] = useState(false);
  const [urlImgCloudinary, seturlImgCloudinary] = useState("");
  const [editState, seteditState] = useState(false);
  const [idtoEditComment, setidtoEditComment] = useState(null);

  const cancelEdit = async () => {
    seteditState(false);
    seturlImgCloudinary("");
    setselectedFileEdit(false);
    idTextArea.current.value = null;
  };

  const editCommment = (commentSelected) => {
    console.log(commentSelected);
    seteditState(true);
    setselectedFileEdit(false);
    setidtoEditComment(Number(commentSelected.id_Comment));
    idTextArea.current.value = commentSelected.Comment;
    if (commentSelected.UrlImg != null) {
      setselectedFileEdit(true);
      seturlImgCloudinary(commentSelected.UrlImg);
    }
  };

  const deleteCommment = async (commentSelected) => {
    setLoadingComments(true);
    const dataPOST = {
      id_num: props.id,
      id_Comment: Number(commentSelected.id_Comment),
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACK}/api/dataNotices/delete-notice-comment`,
      {
        method: "POST",
        body: JSON.stringify(dataPOST),
        headers: {
          "Content-Type": "application/json",
          Authorization: getTokenUser,
        },
      }
    );
    getDataComments();
    setLoadingComments(false);
  };

  const getDataComments = async () => {
    const dataPOST = {
      id_num: props.id,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACK}/api/dataNotices/notice-comments`,
      {
        method: "POST",
        body: JSON.stringify(dataPOST),
        headers: { "Content-Type": "application/json" },
      }
    );
    const resp = await response.json();

    setComments(resp.data[0]?.Comments);
  };

  const enviarData = async () => {
    if (window.localStorage.getItem("username")) {
      setLoadingComments(true);
      if (selectedFile === null) {
        new_url = null;
      } else {
        //Subida de Imagenes a Cloudinary
        const data = new FormData();
        data.append("file", selectedFile);
        data.append("upload_preset", "wbq7vocx");
        data.append("cloud_name", "ddfcsjqtg");
        const respuesta_cloudinary = await fetch(
          "  https://api.cloudinary.com/v1_1/ddfcsjqtg/image/upload/",
          {
            method: "post",
            body: data,
          }
        ).then((resp) => resp.json());
        var link_respuesta = respuesta_cloudinary.url;
        let add_inUrl = "b_black,c_pad,h_600,w_600";
        var base_url = "http://res.cloudinary.com/ddfcsjqtg/image/upload/";
        var last_Add = link_respuesta.replace(base_url, "");
        var new_url = base_url + add_inUrl + "/" + last_Add;
      }

      const dataPOST = {
        id_num: props.id,
        Comment: [
          {
            UserName: window.localStorage.getItem("username"),
            Comment: idTextArea.current.value,
            UrlImg: new_url,
          },
        ],
      };

      const dataPost_edit = {
        id_num: props.id,
        id_Comment: idtoEditComment,
        comment_edit: idTextArea.current.value,
      };

      if (editState == true) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_BACK}/api/dataNotices/edit-notice-comment`,
          {
            method: "POST",
            body: JSON.stringify(dataPost_edit),
            headers: {
              "Content-Type": "application/json",
              Authorization: getTokenUser,
            },
          }
        );
        const resp = await response.json();
      } else {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_BACK}/api/dataNotices/insert-notice-comments`,
          {
            method: "POST",
            body: JSON.stringify(dataPOST),
            headers: {
              "Content-Type": "application/json",
              Authorization: getTokenUser,
            },
          }
        );
        const resp = await response.json();
      }

      idTextArea.current.value = null;
      cancelEdit();
      getDataComments();
      setSelectedFile(null);
      setLoadingComments(false);
    } else {
      alert("Tienes que iniciar sesión, para poder comentar.");
    }
  };

  const onSelectFile = (e) => {
    cancelEdit();
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const deleteImgPreview = async () => {
    setSelectedFile(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    setTokenUser(Cookies.get("token"));
    getDataComments();
  }, []);

  if (viewComments === "hide") {
    return (
      <section
        onClick={() => setViewComments("show")}
        className="cursor-pointer py-1 my-2 border border-solid border-slate-400 border-y border-x-0"
      >
        <h2 className="m-0 text-lg">💬 Ver Comentarios</h2>
      </section>
    );
  } else {
    return (
      <>
        <section
          onClick={() => setViewComments("hide")}
          className="cursor-pointer py-1 my-2 border border-solid border-slate-400 border-y border-x-0"
        >
          <h2 className="m-0 text-lg">🔙 Comentarios</h2>
        </section>

        {loadingComments ? (
          <LoadingComment />
        ) : (
          <ul className="m-0 flex flex-col gap-2">
            {getComments?.length ? (
              getComments.map((comment, index) => (
                <li
                  key={index}
                  className="grid grid-cols-[50px,1fr] gap-2 my-2"
                >
                  <Avatar
                    size="md"
                    src="https://www.weact.org/wp-content/uploads/2016/10/Blank-profile.png"
                    color="gradient"
                    bordered
                  />
                  <section className="flex flex-col">
                    <div className="grid grid-cols-2">
                      <p className="m-0 font-medium">{comment.UserName}</p>
                      <div className="justify-self-end">
                        {comment.UserName ===
                          window.localStorage.getItem("username") && (
                          <>
                            <button
                              className="mx-1 text-blue-400"
                              onClick={() => editCommment(comment)}
                            >
                              Editar
                            </button>

                            <button
                              className="mx-1 text-red-500"
                              onClick={() => deleteCommment(comment)}
                            >
                              Eliminar
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <p className="m-0">{comment.Comment}</p>
                    {comment.UrlImg && (
                      <img width="600" height="600" src={comment.UrlImg} />
                    )}
                  </section>
                </li>
              ))
            ) : (
              <h4 className=" bg-slate-200 my-4 rounded px-2 py-1">
                Aún no hay comentarios. 💨
              </h4>
            )}
          </ul>
        )}

        <section className="my-2 bottom-0 sticky w-auto flex  z-[200] py-2">
          <div className="w-10/12 bg-slate-200 rounded p-2">
            <textarea
              className="resize-none rounded-md w-full p-2 border-2 border-slate-200"
              ref={idTextArea}
              rows={1}
              placeholder={
                window.localStorage.getItem("username")
                  ? `Comentar como ${window.localStorage.getItem("username")}`
                  : "¡Tienes que iniciar sesión!"
              }
            ></textarea>
            {selectedFile && (
              <section className="relative">
                <button
                  onClick={deleteImgPreview}
                  className="absolute cursor-pointer ml-4 bg-red-300 rounded-full border-0 text-2xl m-2 p-1 top-0 right-0"
                >
                  ❌
                </button>

                <img width="150" height="150" src={preview} />
              </section>
            )}
            {selectedFileEdit && (
              <div className="relative">
                <img width="150" height="150" src={urlImgCloudinary} />
              </div>
            )}
          </div>

          <div className="flex items-center w-auto">
            <div className="grid grid-cols-2">
              <input
                type="file"
                id="imgInp"
                className="absolute invisible"
                onChange={onSelectFile}
              ></input>
              <label
                htmlFor="imgInp"
                className="flex items-center justify-center cursor-pointer ml-3 text-white bg-red-700 px-1 py-1 rounded-lg border-0 text-2xl"
              >
                📷
              </label>
              <button
                onClick={enviarData}
                className="cursor-pointer ml-2 text-white bg-red-700 px-1 py-1 rounded-lg border-0 text-2xl"
              >
                ➢
              </button>
            </div>

            {editState && (
              <button
                onClick={cancelEdit}
                className="my-2 cursor-pointer ml-4 text-white bg-red-700 px-1 py-1 rounded-lg border-0 text-xl"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </section>
      </>
    );
  }
}
