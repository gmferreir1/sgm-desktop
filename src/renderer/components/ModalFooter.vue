<template>

  <div class="modal-footer">
    <div class="row">
      <div class="col-sm-12">
        &nbsp;
        <slot></slot>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'ModalFooter'
}
</script>

<style>
  .modal-footer {
    padding-top: 4px;
    padding-bottom: 4px;
    
  }
</style>