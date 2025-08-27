function ModalButton() {
  return (
    <button
      className="btn btn-warning m-1 w-40"
      onClick={() => document.getElementById("my_modal_1").showModal()}
    >
      Logga in
    </button>
  );
}

export default ModalButton;
