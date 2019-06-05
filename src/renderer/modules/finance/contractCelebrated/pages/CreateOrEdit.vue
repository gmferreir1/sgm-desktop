<template>
  <div>
    <form-contract-celebrated/>
  </div>
</template>

<script>
import FormContractCelebrated from "../components/FormContractCelebrated";

export default {
  name: "CreateOrEdit",
  components: {
    FormContractCelebrated
  },
  data() {
    return {};
  },
  beforeDestroy() {
    const routeName = this.$route.name;

    if (
      routeName !== "finance_contract_celebrated" &&
      routeName !== "finance_contract_celebrated_edit"
    ) {
      localStorage.removeItem("sort");
      localStorage.removeItem("filter");
      localStorage.removeItem("paginate");
    }
  }
};
</script>
