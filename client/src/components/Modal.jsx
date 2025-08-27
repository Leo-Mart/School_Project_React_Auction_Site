import { useContext, useState } from "react";
import UserContext from "../context/UserContext.jsx";

function Modal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(UserContext);

  return (
    <>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg flex justify-center">Logga in</h3>
          <p className="py-4 flex justify-center">
            Logga in med din e-postadress
          </p>
          <div className="flex space-x-10 justify-center">
            <form className="grid grid-col-2  ">
              <input
                type="email"
                placeholder="Ange e-postadress"
                className="input input-bordered w-full max-w-xs my-4"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Lösenord"
                className="input input-bordered w-full max-w-xs"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>
          </div>
          <div className="modal-action flex justify-center space-x-28">
            <form method="dialog">
              <button
                className="btn btn-warning"
                onClick={() => {
                  login(email, password);
                }}
              >
                Logga in
              </button>
            </form>
            <form method="dialog">
              <button className="btn btn-error">Avbryt</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Modal;
