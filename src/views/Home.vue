<template>
  <div class="py-5">
    <h1 class="display-5 fw-bold text-white">Photo Editor</h1>
    <div class="col-lg-6 mx-auto text-light">
      <p class="fs-5 mb-4">Simple photo editor build with Vue, Electron and Bootstrap by Dawid Jabłoński</p>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Button @click="select" color="success" add-class="btn btn-outline-light btn-lg px-4"><i class="bi bi-upload"></i></Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
export default {
  name: 'Home',
  components: {
    Button
  },
  methods: {
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
