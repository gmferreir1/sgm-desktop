export default {

    methods: {
        deletePrint(fileAndPath, showDialogConfirm = true) {

            if (!fileAndPath) return

            const queryParams = {
                params: {
                    file_and_path: fileAndPath
                }
            }

            if (!showDialogConfirm) {
                setTimeout(() => this.deleteFilePrint(queryParams), 5000);
                return;
            }

            setTimeout(() => {

                swal({
                    text: "Sua impressão foi feita corretamente ?",
                    closeOnClickOutside: false,
                    closeOnEsc: false,
                    buttons: {
                        cancel: {
                            text: "Não",
                            value: false,
                            visible: true,
                            className: "",
                            closeModal: true,
                        },
                        confirm: {
                            text: "Sim",
                            value: true,
                            visible: true,
                            className: "",
                            closeModal: true
                        }
                    }
                }).then(() => {
                    this.deleteFilePrint(queryParams)
                })

            }, 600);
        },
        /**
         * Chama a remoção do arquivo
         * @param {*} queryParams 
         */
        deleteFilePrint(queryParams) {
            http.get('delete-file', queryParams)
                .then(_ => { })
                .catch(_ => { })
        }
    }

}