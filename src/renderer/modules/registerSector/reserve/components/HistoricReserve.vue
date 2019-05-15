<template>
<div>
  <div class="row">
    <div class="col-md-12">
      <div class="box box-danger">

        <div class="box-header with-border" style="padding-top: 3px">
          <h3 class="box-title" style="padding-bottom: 10px; padding-top: 5px;">
            <span class="fa fa-list-ul"></span>
            HISTÓRICO
          </h3>
        </div>
        <!-- /.box-header -->

        <div class="box-body" style="padding-top: 0px;">

          <div class="row">
            <div class="col-md-12">
              <editor @textEditor="textEditor" :disable="disabled" />
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="table-responsive tableFixHead" v-if="data_list.data.length">

                <table class="table table-condensed table-hover historic" style="margin-top: 5px;">
                  <thead>
                    <tr>
                      <th style="width: 70%">Histórico</th>
                      <th>Responsável</th>
                      <th>Data</th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr v-for="(list, index) in data_list.data" :key="index">

                      <td style="width: 80%" v-html="list.text" class="historic_list"></td>
                      <td :title="`${list.responsibleData.name.toUpperCase()} ${list.responsibleData.last_name.toUpperCase()}`"
                        style="width: 10%; text-transform: uppercase">
                        {{ list.responsibleData.name }}
                      </td>
                      <td style="width: 20%">{{ dateFormat(list.created_at, "DD/MM/YYYY HH:mm:ss") }}</td>

                    </tr>

                  </tbody>
                </table>
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
import Editor from "../../../../components/Editor";
import { dateFormat } from "../../../../util/dateTime";

export default {
  name: "HistoricReserve",
  props: ["disabled"],
  components: {
    Editor
  },
  data() {
    return {
      data_list: {
        data: []
      }
    }
  },
  methods: {
    dateFormat,
    textEditor(text) {
      this.$emit("historic", text);
    }
  },
  mounted() {
    this.$bus.$on("RegisterSector\Reserve::historicData", historicData => {
      this.data_list.data = historicData;
    });
    
    this.$bus.$on("RegisterSector\Reserve::cleanHistoricData", historicData => {
      this.data_list.data = [];
    });
  },
}
</script>



