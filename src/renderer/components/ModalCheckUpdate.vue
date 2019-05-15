<template>
  <div>
    <div class="modal" id="modalCheckUpdate" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            
            <div style="float: left">
              <img :src="images.cloud" width="100" />
            </div>

            <div class="row">
              <div class="col-md-8">
                <div style="float: left">
                  <div class="loader" style="position: absolute;left: 180px; top: 65px;"></div>
                  <p>Atualização em adamento, por favor aguarde ...</p>
                  <p>O sistema irá reiniciar automaticamente quando concluir a instalação.</p>
                  <p>{{ progress }}</p>
                </div>
              </div>
            </div>
            
      
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalCheckUpdate",
  data() {
    return {
      images: {
        cloud: require("../assets/images/cloud.png")
      },
      progress: ""
    };
  },
  methods: {
    openModal() {
      $("#modalCheckUpdate").modal({
        keyboard: false,
        backdrop: "static"
      });
    },
    closeModal() {
      $("#modalCheckUpdate").modal("hide");
    }
  },
  mounted() {
    this.$bus.$on("openModalCheckUpdate", () => {
      this.openModal();
    })
    
    this.$bus.$on("modalCheckUpdateSetProgress", (progress) => {
      this.progress = progress;
    })
  }
};
</script>
