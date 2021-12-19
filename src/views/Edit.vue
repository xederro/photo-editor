<template>
  <nav class="m-auto">
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-clouds-fill"></i>
      </button>
      <div class="dropdown-menu p-3" aria-labelledby="dropdownMenuButton1">
        <input value="0" @input="filter('blur', $event)" orient="vertical" type="range" min="0" max="100">
        <br>
        <span>
          0
        </span>
      </div>
    </div>
  </nav>

  <div class="overflow-scroll">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: "Edit",
  props: {
    file: String
  },
  methods: {
    filter: function (type, e){
      let canvas=document.getElementById("canvas");
      let context=canvas.getContext('2d');
      context.filter = "sepia(100%)";
      let filers = context.filter;
      console.log(filers, type, e.target.value);
    }
  },
  mounted() {
    let canvas=document.getElementById("canvas");
    let context=canvas.getContext('2d');
    let image = new Image();
    image.onload = function(){
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image,0,0);
    };
    image.src = 'local-resource://' + this.file;
  }
}
</script>

<style scoped>
  .overflow-scroll{
    height: 100vh;
    width: 100vw;
  }
  input[type=range][orient=vertical]
  {
    writing-mode: bt-lr; /* IE */
    -webkit-appearance: slider-vertical; /* WebKit */
    width: 8px;
    height: 175px;
    padding: 0 5px;
  }
  .dropdown-toggle::after {
    display: none;
  }
  .dropdown-menu {
    width: 25px !important;
    min-width: 42px;
  }
</style>