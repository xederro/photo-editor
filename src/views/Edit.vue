<template>
  <nav class="m-auto position-fixed top-0 start-0">
    <div class="dropdown dropend d-flex flex-column">

      <FilterButton :min=1 :max=4 name="Blur" :val=0 @changeFilter="filter" bi="bi-clouds-fill" @history="saveHistory"/>
      <FilterButton :min=-255 :max=255 name="Brightness" :val=0 @changeFilter="filter" bi="bi-sun" @history="saveHistory"/>
      <FilterButton name="Desaturate" @changeFilter="filter"  @history="saveHistory"/>
      <FilterButton :min=2 :max=255 name="Dither" :val=2 @changeFilter="filter"  @history="saveHistory"/>
      <FilterButton name="Edge" @changeFilter="filter"  @history="saveHistory"/>
      <FilterButton name="Emboss" @changeFilter="filter"  @history="saveHistory"/>
      <FilterButton name="Enrich" @changeFilter="filter"  @history="saveHistory"/>
      <FilterButton name="Flip X" @changeFilter="filter"  @history="saveHistory"/>
      <FilterButton name="Flip Y" @changeFilter="filter"  @history="saveHistory"/>
      <FilterButton :min=0 :max=255 name="Gamma" :val=0 @changeFilter="filter"  @history="saveHistory"/>
      <FilterButton name="Grayscale" @changeFilter="filter"  @history="saveHistory"/>
      <FilterButton name="Invert" @changeFilter="filter"  @history="saveHistory"/>
      <FilterButton :min=1 :max=100 name="Mosaic" :val=0 @changeFilter="filter" idr="mosaicInput"  @history="saveHistory"/>
      <FilterButton :min=2 :max=255 name="Posterize" :val=2 @changeFilter="filter"  @history="saveHistory"/>
      <FilterButton name="Sepia" @changeFilter="filter"  @history="saveHistory"/>
      <FilterButton :min=1 :max=100 name="Sharpen" :val=0 @changeFilter="filter"  @history="saveHistory"/>
      <FilterButton name="Solarize" @changeFilter="filter"  @history="saveHistory"/>

      <button class="btn btn-secondary" type="button" @mousedown="woFilter" @mouseup="wiFilter" id="old">
        <i class="bi bi-download"></i>
      </button>

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
import FilterButton from "@/components/FilterButton";

export default {
  name: "Edit",
  components:{
    FilterButton
  },
  props: {
    file: String,
  },
  data: function() {
      return {
        image: '',
        history: [],
        current: -1,
        canvas: '',
        ctx: '',
      };
  },
  methods: {
    filter: function (){
      let filtered = this.$data.current===-1 ? this.$data.image : this.$data.history[this.$data.current].img;
      let filters = document.getElementsByTagName('input');

      if (filters[0].checked) {
        filtered = ImageFilters.GaussianBlur(filtered, Number(filters[1].value))
      }
      if (filters[2].checked) {
        filtered = ImageFilters.Brightness(filtered, Number(filters[3].value))
      }
      if (filters[4].checked) {
        filtered = ImageFilters.Desaturate(filtered)
      }
      if (filters[5].checked) {
        filtered = ImageFilters.Dither(filtered, Number(filters[6].value))
      }
      if (filters[7].checked) {
        filtered = ImageFilters.Edge(filtered)
      }
      if (filters[8].checked) {
        filtered = ImageFilters.Emboss(filtered)
      }
      if (filters[9].checked) {
        filtered = ImageFilters.Enrich(filtered)
      }
      if (filters[10].checked) {
        filtered = ImageFilters.Flip(filtered, false)
      }
      if (filters[11].checked) {
        filtered = ImageFilters.Flip(filtered, true)
      }
      if (filters[12].checked) {
        filtered = ImageFilters.Gamma(filtered, Number(filters[13].value))
      }
      if (filters[14].checked) {
        filtered = ImageFilters.GrayScale(filtered)
      }
      if (filters[15].checked) {
        filtered = ImageFilters.Invert(filtered)
      }
      if (filters[16].checked) {
        filtered = ImageFilters.Mosaic(filtered, Number(filters[17].value))
      }
      if (filters[18].checked) {
        filtered = ImageFilters.Posterize(filtered, Number(filters[19].value))
      }
      if (filters[20].checked) {
        filtered = ImageFilters.Sepia(filtered)
      }
      if (filters[21].checked) {
        filtered = ImageFilters.Sharpen(filtered, Number(filters[22].value))
      }
      if (filters[23].checked) {
        filtered = ImageFilters.Solarize(filtered)
      }

      this.$data.ctx.putImageData(filtered, 0, 0);
    },

    woFilter:function () {
      this.$data.ctx.putImageData(this.$data.image, 0, 0);
    },

    wiFilter:function () {
      this.$data.ctx.putImageData(this.$data.current===-1 ? this.$data.image : this.$data.history[this.$data.current]['img'], 0, 0);
    },

    setImage: function () {
      this.$data.canvas = document.getElementById("canvas");
      this.$data.ctx = this.$data.canvas.getContext('2d');
      this.$data.image = this.$data.ctx.getImageData(0, 0, this.$data.canvas.width, this.$data.canvas.height);
    },

    saveImage: function () {
      window.api.send("saveFile", this.$data.canvas.toDataURL('image/png'));
    },

    saveHistory: function () {
      let entry = {
        'img': this.$data.ctx.getImageData(0, 0, this.$data.canvas.width, this.$data.canvas.height),
        'filters': {}
      }

      let filters = document.getElementsByTagName('input');

      entry.filters.GaussianBlur = [filters[0].checked, Number(filters[1].value)];
      entry.filters.Brightness = [filters[2].checked, Number(filters[3].value)];
      entry.filters.Desaturate = filters[4].checked;
      entry.filters.Dither = [filters[5].checked, Number(filters[6].value)];
      entry.filters.Edge = filters[7].checked;
      entry.filters.Emboss = filters[8].checked;
      entry.filters.Enrich = filters[9].checked;
      entry.filters.Flipx = filters[10].checked;
      entry.filters.Flipy = filters[11].checked;
      entry.filters.Gamma = [filters[12].checked, Number(filters[13].value)];
      entry.filters.GrayScale = filters[14].checked;
      entry.filters.Invert = filters[15].checked;
      entry.filters.Mosaic = [filters[16].checked, Number(filters[17].value)];
      entry.filters.Posterize = [filters[18].checked, Number(filters[19].value)];
      entry.filters.Sepia = filters[20].checked;
      entry.filters.Sharpen = [filters[21].checked, Number(filters[22].value)];
      entry.filters.Solarize = filters[23].checked;

      this.$data.history.push(entry);
      if (this.$data.history.length > 50){
        this.$data.history.shift();
      }
      else {
        this.$data.current++;
      }
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
    background-color: gray;
    opacity: 1;
    background-image:  repeating-linear-gradient(45deg, #000000 25%, transparent 25%, transparent 75%, #000000 75%, #000000), repeating-linear-gradient(45deg, #000000 25%, #ffffff 25%, #ffffff 75%, #000000 75%, #000000);
    background-position: 0 0, 6px 6px;
    background-size: 12px 12px;
  }
  .overflow-scroll{
    height: 100vh;
    width: 100vw;
  }
</style>
