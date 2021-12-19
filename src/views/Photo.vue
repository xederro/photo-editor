<template>
  <div>
    <Button @click="test" color="success"><i class="bi bi-upload"></i></Button>
  </div>
</template>


<script>
import Button from "@/components/Button.vue";
export default {
  components: {
    Button,
  },

  created() {
    window.api.receive("getPaths", (data) => {
      this.$router.push({ name: 'Edit', params: {file: data }})
    });
  },
  methods: {
    test: function (){
      window.api.send("selectPhoto");
    }
  },
}

</script>