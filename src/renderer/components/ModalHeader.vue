<template>

  <div class="modal-header">

    <h4 class="modal-title">
      &nbsp;

      <div class="title">
        <slot name="icon_title"></slot>
        {{title}}
      </div>

      <!-- buttons -->
      <div style="float: right; padding-top: 4px;">
        <slot></slot>

        <a href="#" class="close-link" @click.prevent="$emit('closeModal')">
          Fechar Janela
        </a>
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
  name: 'ModalHeader',
  props: {
    title: {
      type: String,
      required: false
    }
  }
}
</script>

<style>

  .title {
    font-size: 20px;
    float: left;
    margin-top: 5px;
    font-weight: normal;
  }

  .close-link {
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  }

  .modal-header {
    padding-top: 1px;
    padding-bottom: 5px;
    /*background-color:rgba(71, 144, 105, 0.84);*/
    background-color: #E98531;
    font-weight: 700;
    color: #fff;
  }


</style>