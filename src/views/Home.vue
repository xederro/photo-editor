<template>
  <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
    <li class="nav-item">
      <router-link to="/" :class="classes('/')" aria-current="page" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
        <i class="bi bi-gem"></i>
      </router-link>
    </li>
    <li class="nav-item">
      <Button @click="select" color="success" add-class="nav-link py-3 border-bottom"><i class="bi bi-upload"></i></Button>
    </li>
  </ul>
</template>

<script>
import Button from "@/components/Button";
export default {
  name: 'Home',
  components: {
    Button
  },
  methods: {
    classes: function (to) {
      let classes = 'nav-link py-3 border-bottom ';

      classes += this.$route.path === to ? 'active ' : '';

      return classes
    },
    select: function (){
      window.api.send("selectPhoto");
    }
  },
  created() {
    window.api.receive("getPaths", (data) => {
      this.$router.push({ name: 'Edit', params: {file: data }})
    });
  }
}
</script>
