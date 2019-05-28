import swal from "sweetalert";
window.swal = swal;

export default {
  methods: {
    async showAlert(msn) {

      let message = document.createElement("div");
      message.innerHTML = msn;

      return swal({
        content: message,
        closeOnClickOutside: false,
        closeOnEsc: false,
        buttons: {
          cancel: {
            text: "Não",
            value: false,
            visible: true,
            className: "",
            closeModal: true
          },
          confirm: {
            text: "Sim",
            value: true,
            visible: true,
            className: "",
            closeModal: true
          }
        }
      });
    }
  }
};
