<template>
<div>
  <panel-select-document @selectDocument="data => type_document = { data }" @searchDocument="data => type_document_selected = { data }" />

  <document-editor :dataComponent="type_document" :searchDocument="type_document_selected" />
</div>
</template>

<script>
import PanelSelectDocument from "../components/PanelSelectDocument";
import DocumentEditor from "../components/DocumentEditor";

export default {
  name: "IndexDocuments",
  components: { PanelSelectDocument, DocumentEditor },
  data() {
    return {
      type_document: {},
      type_document_selected: {}
    }
  },
}
</script>
