export default {
  name: "systemConfirm",
  methods: {
    confirm(message) {
      return swal({
        text: message,
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
      })
    }
  }
};
