<template>
  <nav class="m-auto position-fixed top-0 start-0">
    <div class="dropdown dropend d-flex flex-column">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="blur" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-clouds-fill"></i>
      </button>
      <div class="dropdown-menu p-0 m-0" aria-labelledby="blur">
        <div class="input-group m-0 p-0">
          <div class="input-group-text">
            <input @input="filter" type="checkbox" class="form-control form-check-input mt-0">
          </div>
          <span class="input-group-text">Blur</span>
          <div class="input-group-text">
            <input value="0" @input="filter" type="range" class="form-range" min="1" max="4" oninput="this.parentElement.nextElementSibling.children[0].value = this.value">
          </div>
          <div class="input-group-text">
            <output>0</output>
          </div>
        </div>
      </div>

      <button class="btn btn-secondary dropdown-toggle" type="button" id="brightness" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-sun"></i>
      </button>

      <div class="dropdown-menu p-0 m-0" aria-labelledby="brightness">
        <div class="input-group m-0 p-0">
          <div class="input-group-text">
            <input @input="filter" type="checkbox" class="form-control form-check-input mt-0">
          </div>
          <span class="input-group-text">Brightness</span>
          <div class="input-group-text">
            <input value="0" @input="filter" type="range" class="form-range" min="-255" max="255" oninput="this.parentElement.nextElementSibling.children[0].value = this.value">
          </div>
          <div class="input-group-text">
            <output>0</output>
          </div>
        </div>
      </div>

      <button class="btn btn-secondary dropdown-toggle" type="button" id="desaturate" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-sun"></i>
      </button>
      <div class="dropdown-menu p-0 m-0" aria-labelledby="desaturate">
        <div class="input-group m-0 p-0">
          <div class="input-group-text">
            <input @input="filter" type="checkbox" class="form-control form-check-input mt-0">
          </div>
          <span class="input-group-text">Desaturate</span>
        </div>
      </div>

      <button class="btn btn-secondary dropdown-toggle" type="button" id="dither" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-sun"></i>
      </button>
      <div class="dropdown-menu p-0 m-0" aria-labelledby="dither">
        <div class="input-group m-0 p-0">
          <div class="input-group-text">
            <input @input="filter" type="checkbox" class="form-control form-check-input mt-0">
          </div>
          <span class="input-group-text">Dither</span>
          <div class="input-group-text">
            <input value="0" @input="filter" type="range" class="form-range" min="2" max="255" oninput="this.parentElement.nextElementSibling.children[0].value = this.value">
          </div>
          <div class="input-group-text">
            <output>0</output>
          </div>
        </div>
      </div>

      <button class="btn btn-secondary dropdown-toggle" type="button" id="edge" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-sun"></i>
      </button>
      <div class="dropdown-menu p-0 m-0" aria-labelledby="edge">
        <div class="input-group m-0 p-0">
          <div class="input-group-text">
            <input @input="filter" type="checkbox" class="form-control form-check-input mt-0">
          </div>
          <span class="input-group-text">Edge</span>
        </div>
      </div>

      <button class="btn btn-secondary dropdown-toggle" type="button" id="emboss" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-sun"></i>
      </button>
      <div class="dropdown-menu p-0 m-0" aria-labelledby="emboss">
        <div class="input-group m-0 p-0">
          <div class="input-group-text">
            <input @input="filter" type="checkbox" class="form-control form-check-input mt-0">
          </div>
          <span class="input-group-text">Emboss</span>
        </div>
      </div>

      <button class="btn btn-secondary dropdown-toggle" type="button" id="enrich" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-sun"></i>
      </button>
      <div class="dropdown-menu p-0 m-0" aria-labelledby="enrich">
        <div class="input-group m-0 p-0">
          <div class="input-group-text">
            <input @input="filter" type="checkbox" class="form-control form-check-input mt-0">
          </div>
          <span class="input-group-text">Enrich</span>
        </div>
      </div>

      <button class="btn btn-secondary dropdown-toggle" type="button" id="flipx" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-sun"></i>
      </button>
      <div class="dropdown-menu p-0 m-0" aria-labelledby="flipx">
        <div class="input-group m-0 p-0">
          <div class="input-group-text">
            <input @input="filter" type="checkbox" class="form-control form-check-input mt-0">
          </div>
          <span class="input-group-text">Flip X</span>
        </div>
      </div>

      <button class="btn btn-secondary dropdown-toggle" type="button" id="flipy" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-sun"></i>
      </button>
      <div class="dropdown-menu p-0 m-0" aria-labelledby="flipy">
        <div class="input-group m-0 p-0">
          <div class="input-group-text">
            <input @input="filter" type="checkbox" class="form-control form-check-input mt-0">
          </div>
          <span class="input-group-text">Flip Y</span>
        </div>
      </div>

      <button class="btn btn-secondary dropdown-toggle" type="button" id="gamma" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-sun"></i>
      </button>
      <div class="dropdown-menu p-0 m-0" aria-labelledby="gamma">
        <div class="input-group m-0 p-0">
          <div class="input-group-text">
            <input @input="filter" type="checkbox" class="form-control form-check-input mt-0">
          </div>
          <span class="input-group-text">Gamma</span>
          <div class="input-group-text">
            <input value="0" @input="filter" type="range" class="form-range" min="0" max="255" oninput="this.parentElement.nextElementSibling.children[0].value = this.value">
          </div>
          <div class="input-group-text">
            <output>0</output>
          </div>
        </div>
      </div>

      <button class="btn btn-secondary dropdown-toggle" type="button" id="grayscale" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-sun"></i>
      </button>
      <div class="dropdown-menu p-0 m-0" aria-labelledby="grayscale">
        <div class="input-group m-0 p-0">
          <div class="input-group-text">
            <input @input="filter" type="checkbox" class="form-control form-check-input mt-0">
          </div>
          <span class="input-group-text">Gray Scale</span>
        </div>
      </div>

      <button class="btn btn-secondary dropdown-toggle" type="button" id="invert" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-sun"></i>
      </button>
      <div class="dropdown-menu p-0 m-0" aria-labelledby="invert">
        <div class="input-group m-0 p-0">
          <div class="input-group-text">
            <input @input="filter" type="checkbox" class="form-control form-check-input mt-0">
          </div>
          <span class="input-group-text">Invert</span>
        </div>
      </div>

      <button class="btn btn-secondary dropdown-toggle" type="button" id="mosaic" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-sun"></i>
      </button>
      <div class="dropdown-menu p-0 m-0" aria-labelledby="mosaic">
        <div class="input-group m-0 p-0">
          <div class="input-group-text">
            <input @input="filter" type="checkbox" class="form-control form-check-input mt-0">
          </div>
          <span class="input-group-text">Mosaic</span>
          <div class="input-group-text">
            <input value="1" @input="filter" type="range" class="form-range" min="1" max="100" id="mosaicInput" oninput="this.parentElement.nextElementSibling.children[0].value = this.value">
          </div>
          <div class="input-group-text">
            <output>1</output>
          </div>
        </div>
      </div>

      <button class="btn btn-secondary dropdown-toggle" type="button" id="posterize" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-sun"></i>
      </button>
      <div class="dropdown-menu p-0 m-0" aria-labelledby="posterize">
        <div class="input-group m-0 p-0">
          <div class="input-group-text">
            <input @input="filter" type="checkbox" class="form-control form-check-input mt-0">
          </div>
          <span class="input-group-text">Posterize</span>
          <div class="input-group-text">
            <input value="0" @input="filter" type="range" class="form-range" min="2" max="255" oninput="this.parentElement.nextElementSibling.children[0].value = this.value">
          </div>
          <div class="input-group-text">
            <output>0</output>
          </div>
        </div>
      </div>

      <button class="btn btn-secondary dropdown-toggle" type="button" id="sepia" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-sun"></i>
      </button>
      <div class="dropdown-menu p-0 m-0" aria-labelledby="sepia">
        <div class="input-group m-0 p-0">
          <div class="input-group-text">
            <input @input="filter" type="checkbox" class="form-control form-check-input mt-0">
          </div>
          <span class="input-group-text">Sepia</span>
        </div>
      </div>

      <button class="btn btn-secondary dropdown-toggle" type="button" id="sharpen" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-sun"></i>
      </button>
      <div class="dropdown-menu p-0 m-0" aria-labelledby="sharpen">
        <div class="input-group m-0 p-0">
          <div class="input-group-text">
            <input @input="filter" type="checkbox" class="form-control form-check-input mt-0">
          </div>
          <span class="input-group-text">Sharpen</span>
          <div class="input-group-text">
            <input value="0" @input="filter" type="range" class="form-range" min="1" max="100" oninput="this.parentElement.nextElementSibling.children[0].value = this.value">
          </div>
          <div class="input-group-text">
            <output>0</output>
          </div>
        </div>
      </div>

      <button class="btn btn-secondary dropdown-toggle" type="button" id="solarize" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-sun"></i>
      </button>
      <div class="dropdown-menu p-0 m-0" aria-labelledby="solarize">
        <div class="input-group m-0 p-0">
          <div class="input-group-text">
            <input @input="filter" type="checkbox" class="form-control form-check-input mt-0">
          </div>
          <span class="input-group-text">Solarize</span>
        </div>
      </div>

      <button class="btn btn-secondary" type="button" @click="saveImage">
        <i class="bi bi-download"></i>
      </button>
    </div>
  </nav>

  <div class="overflow-scroll">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
import ImageFilters from "canvas-filters";

export default {
  name: "Edit",
  props: {
    file: String,
  },
  data: function() {
      return {
        image: 23
      };
  },
  methods: {
    filter: function (){
      let canvas=document.getElementById("canvas");
      let ctx=canvas.getContext('2d');
      let filtered = this.$data.image;
      let filters = document.getElementsByTagName("input");

      if (filters[0].checked) filtered = ImageFilters.GaussianBlur(filtered, Number(filters[1].value));
      if (filters[2].checked) filtered = ImageFilters.Brightness(filtered, Number(filters[3].value));
      if (filters[4].checked) filtered = ImageFilters.Desaturate(filtered);
      if (filters[5].checked) filtered = ImageFilters.Dither(filtered, Number(filters[6].value));
      if (filters[7].checked) filtered = ImageFilters.Edge(filtered);
      if (filters[8].checked) filtered = ImageFilters.Emboss(filtered);
      if (filters[9].checked) filtered = ImageFilters.Enrich(filtered);
      if (filters[10].checked) filtered = ImageFilters.Flip(filtered, false);
      if (filters[11].checked) filtered = ImageFilters.Flip(filtered, true);
      if (filters[12].checked) filtered = ImageFilters.Gamma(filtered, Number(filters[13].value));
      if (filters[14].checked) filtered = ImageFilters.GrayScale(filtered);
      if (filters[15].checked) filtered = ImageFilters.Invert(filtered);
      if (filters[16].checked) filtered = ImageFilters.Mosaic(filtered, Number(filters[17].value));
      if (filters[18].checked) filtered = ImageFilters.Posterize(filtered, Number(filters[19].value));
      if (filters[20].checked) filtered = ImageFilters.Sepia(filtered);
      if (filters[21].checked) filtered = ImageFilters.Sharpen(filtered, Number(filters[22].value));
      if (filters[23].checked) filtered = ImageFilters.Solarize(filtered);

      ctx.putImageData(filtered, 0, 0);
    },
    woFilter:function () {
      let context = document.getElementById("canvas").getContext('2d');
      let image = this.$data.image;
      context.putImageData(image, 0, 0);
    },
    setImage: function () {
      let canvas = document.getElementById("canvas");
      let context = canvas.getContext('2d');
      this.$data.image = context.getImageData(0, 0, canvas.width, canvas.height);
    },
    saveImage: function () {
      let canvas = document.getElementById("canvas");
      const url = canvas.toDataURL('image/png');
      window.api.send("saveFile", url);
    }
  },
  mounted() {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext('2d');
    let image = new Image();
    image.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;
      document.getElementById('mosaicInput').max = (canvas.width > canvas.height) ? canvas.width : canvas.height;
      context.drawImage(image, 0, 0);
    }
    image.src = 'local-resource://' + this.file;
    setTimeout(this.setImage, 100)
  }
}
</script>

<style scoped>
  canvas{
    background-color: #ffffff;
    opacity: 1;
    background-image:  repeating-linear-gradient(45deg, #000000 25%, transparent 25%, transparent 75%, #000000 75%, #000000), repeating-linear-gradient(45deg, #000000 25%, #ffffff 25%, #ffffff 75%, #000000 75%, #000000);
    background-position: 0 0, 6px 6px;
    background-size: 12px 12px;
  }
  .overflow-scroll{
    height: 100vh;
    width: 100vw;
  }
  .dropdown-toggle::after {
    display: none;
  }
  .dropdown-menu {
    width: max-content !important;
    min-width: 0 !important;
  }
  input[type=range]{
    width: 200px;
  }
</style>