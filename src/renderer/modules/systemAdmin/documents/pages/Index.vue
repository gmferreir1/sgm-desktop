<template>
  <div>
    <document-editor :dataComponent="type_document" :searchDocument="type_document_selected"/>
  </div>
</template>

<script>
import DocumentEditor from "../components/DocumentEditor";

export default {
  name: "IndexDocuments",
  components: { DocumentEditor },
  data() {
    return {
      type_document: {},
      type_document_selected: {}
    };
  }
};
</script>
