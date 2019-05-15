export default {
  data() {
    return {
      toggle_sort: "asc",
      data_sort: {
        sort_by: "name",
        sort_order: "asc"
      },
      data_list: {
        data: []
      }
    };
  },
  methods: {
    sort(sortBy = null, sortOrder = "asc", useSorted = true) {

      
      this.toggle_sort = sortOrder;

      const collection = collect(this.data_list.data);

      if (useSorted) {
        this.data_sort.sort_order = !sortOrder ? this.data_sort.sort_order: sortOrder;
        this.data_sort.sort_by = !sortBy ? this.data_sort.sort_by : sortBy;
      }

      let sort;

      if (this.data_sort.sort_order === "asc") {
        sort = collection.sortBy(this.data_sort.sort_by);
      } else {
        sort = collection.sortByDesc(this.data_sort.sort_by);
      }
      this.storeSort();
      this.data_list.data = sort.all();
    },
    storeSort() {
      localStorage.setItem("sort", JSON.stringify(this.data_sort));
    }
  }
};
