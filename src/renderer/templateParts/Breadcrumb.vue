<template>
  <div>
    <div class="breadcrumb" style="width: 99.5%; margin-left: 4px;">
      <section class="content-header">
        <span
          class="text-breadcrumb"
          v-if="this.array_links.length"
        >{{ this.array_links[this.array_links.length - 1].name }}</span>

        <ol v-if="array_links" class="ol-breadcrumb">
          <li
            class="links"
            v-for="(list, index) in this.array_links"
            :key="index"
            :class="{active: index === (array_links.length - 1)}"
          >
            <router-link
              class="active"
              v-if="index !== (array_links.length - 1)"
              :to="{name: list.link}"
            >
              <i class="fa fa-list-alt"></i>
              {{list.name}}
            </router-link>
            <span v-if="index === (array_links.length - 1)">{{list.name}}</span>
          </li>
        </ol>
      </section>
    </div>
  </div>
</template>

<script>
import breadgrumb from "@/util/breadcrumb";
export default {
  name: "Breadcrumb",
  data() {
    return {
      array_links: []
    };
  },
  methods: {
    mountBreadcrumb() {
      const routeName = this.$route.name;
      this.array_links = !breadgrumb(routeName) ? [] : breadgrumb(routeName);
    }
  },
  watch: {
    "$route.name"() {
      this.mountBreadcrumb();
    }
  },
  mounted() {
    this.mountBreadcrumb();
  }
};
</script>

<style scoped>
.text-breadcrumb {
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
}

.breadcrumb {
  margin-bottom: 8px;
  height: 35px !important;
  padding-top: 6px;
  -webkit-box-shadow: 0px 0px 0px rgba(50, 50, 50, 0.77);
  -moz-box-shadow: 0px 0px 0px rgba(50, 50, 50, 0.77);
  box-shadow: 0px 0px 1px rgba(50, 50, 50, 0.77);
  border-radius: 0px;
}

.content-header {
  position: relative;
  padding: 0px;
}

.ol-breadcrumb {
  position: absolute;
  right: 10px;
  top: 5px;
  height: 25px !important;
  border: none !important;
  font-weight: bold;
}

.ol-breadcrumb > li + li:before {
  content: ">\00a0";
}

.links {
  float: left;
  list-style: none;
  padding-left: 10px;
  font-size: 11px;
}
</style>
