<template>
  <div class="modal-header roundbox-header dialog-header">
    <h4 class="modal-title">
      &nbsp;
      <div class="title">
        <slot name="icon_title"></slot>
        {{title}}
      </div>

      <!-- buttons -->
      <div style="float: right; padding-top: 4px;">
        <slot></slot>

        <button type="button" class="close" aria-label="Close" @click="$emit('closeModal')">
          <span aria-hidden="true">&times;</span>
        </button>

        <!--
        <a href="#" class="close-link" @click.prevent="$emit('closeModal')">Fechar Janela</a>
        -->
        <!--
        <button class="button btn btn-sm btn-default" @click="$emit('closeModal')" style="margin-left: 5px">Fechar Janela</button>
        -->
      </div>
      <!-- / buttons -->
    </h4>
  </div>
</template>

<script>
export default {
  name: "ModalHeader",
  props: {
    title: {
      type: String,
      required: false
    }
  }
};
</script>

<style>
.title {
  font-size: 18px;
  float: left;
  margin-top: 3px;
  font-weight: bold;
}

.close-link {
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}

.modal-header {
  padding-top: 0px;
  padding-bottom: 2px;
  /*background-color:rgba(71, 144, 105, 0.84);*/
  background-color: #e98531;
  font-weight: 700;
  color: #fff;
}

.roundbox-header {
  -moz-border-radius: 6px 6px 6px 6px;
  -webkit-border-radius: 6px;
  border-radius: 6px 6px 0px 0px;
}

.modal-header .close {
  margin-top: 0px;
  float: right;
  font-size: 21px;
  font-weight: 700;
  line-height: 1;
  color: #ffffff;
  text-shadow: 0 1px 0 #fff;
  filter: alpha(opacity=20);
  opacity: 7;
}


</style>