<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="box box-danger">
          <div class="box-header with-border" style="padding-top: 3px">
            <h3 class="box-title" style="padding-bottom: 10px; padding-top: 5px;">
              <span class="fa fa-list-ul"></span>
              RESSALVAS
            </h3>
          </div>
          <!-- /.box-header -->

          <div class="box-body" style="padding-top: 0px;">
            <div class="row">
              <div class="col-md-12">
                <editor @textEditor="textEditor" :disable="disabled" :setText="text"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from "../../../../components/Editor";

export default {
  name: "EditorCaveat",
  props: ["disabled", "setText"],
  components: {
    Editor
  },
  data() {
    return {
      data_list: {
        data: []
      },
      text: ""
    };
  },
  methods: {
    textEditor(text) {
      this.$emit("caveat", text);
    }
  },
  watch: {
    setText() {
      this.text = this.setText;
    }
  },
  mounted() {
    this.$bus.$on("Termination\Contract::setCaveatEditor", caveat => {
      this.$bus.$emit("setTextEditor", caveat);
    })
  }
};
</script>



