<template>
  <nav class="m-auto position-fixed top-0 start-0">
    <div class="dropdown dropend d-flex flex-column">

      <router-link to="/" :class="'btn btn-secondary dropdown-toggle'" aria-current="page" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
        <i class="bi bi-gem"></i>
      </router-link>
      <FilterButton :min=0 :max=4 name="Blur" :val=0 @changeFilter="filter" bi="bi-clouds-fill" @history="saveHistory"/>
      <FilterButton :min=-255 :max=255 name="Brightness" :val=0 @changeFilter="filter" bi="bi-sun" @history="saveHistory"/>
      <FilterButton name="Desaturate" @changeFilter="filter" bi="bi-image-alt" @history="saveHistory"/>
      <FilterButton :min=2 :max=255 name="Dither" :val=2 @changeFilter="filter" bi="bi-stop" @history="saveHistory"/>
      <FilterButton name="Edge" @changeFilter="filter" bi="bi-magic" @history="saveHistory"/>
      <FilterButton name="Emboss" @changeFilter="filter" bi="bi-slash-square" @history="saveHistory"/>
      <FilterButton name="Enrich" @changeFilter="filter" bi="bi-flower3" @history="saveHistory"/>
      <FilterButton name="Flip X" @changeFilter="filter" bi="bi-arrow-left-right" @history="saveHistory"/>
      <FilterButton name="Flip Y" @changeFilter="filter" bi="bi-arrow-down-up" @history="saveHistory"/>
      <FilterButton :min=0 :max=255 name="Gamma" :val=0 @changeFilter="filter" bi="bi-lightning-charge" @history="saveHistory"/>
      <FilterButton name="Grayscale" @changeFilter="filter" bi="bi-image" @history="saveHistory"/>
      <FilterButton name="Invert" @changeFilter="filter" bi="bi-star-half" @history="saveHistory"/>
      <FilterButton :min=1 :max=100 name="Mosaic" :val=0 @changeFilter="filter" idr="mosaicInput" bi="bi-bricks" @history="saveHistory"/>
      <FilterButton :min=2 :max=255 name="Posterize" :val=2 @changeFilter="filter" bi="bi-stars" @history="saveHistory"/>
      <FilterButton name="Sepia" @changeFilter="filter" bi="bi-palette" @history="saveHistory"/>
      <FilterButton :min=1 :max=100 name="Sharpen" :val=0 @changeFilter="filter" bi="bi-mask" @history="saveHistory"/>
      <FilterButton name="Solarize" @changeFilter="filter" bi="bi-lightbulb" @history="saveHistory"/>

      <button class="btn btn-secondary" type="button" @mousedown="woFilter" @mouseup="wiFilter" id="old">
        <i class="bi bi-hr"></i>
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
    getFilters: function () {
      let filters = document.getElementsByTagName('input');

      let filter = {}

      filter.GaussianBlur = [filters[0].checked, Number(filters[1].value)];
      filter.Brightness = [filters[2].checked, Number(filters[3].value)];
      filter.Desaturate = filters[4].checked;
      filter.Dither = [filters[5].checked, Number(filters[6].value)];
      filter.Edge = filters[7].checked;
      filter.Emboss = filters[8].checked;
      filter.Enrich = filters[9].checked;
      filter.Flipx = filters[10].checked;
      filter.Flipy = filters[11].checked;
      filter.Gamma = [filters[12].checked, Number(filters[13].value)];
      filter.GrayScale = filters[14].checked;
      filter.Invert = filters[15].checked;
      filter.Mosaic = [filters[16].checked, Number(filters[17].value)];
      filter.Posterize = [filters[18].checked, Number(filters[19].value)];
      filter.Sepia = filters[20].checked;
      filter.Sharpen = [filters[21].checked, Number(filters[22].value)];
      filter.Solarize = filters[23].checked;

      return filter
    },

    filter: function (){
      let filters = this.getFilters()
      let historyImg = this.checkHistory(filters).img;
      let historyFilters = this.checkHistory(filters).filters;


      if (filters.GaussianBlur[0] && (historyFilters.GaussianBlur[0] != filters.GaussianBlur[0] || historyFilters.GaussianBlur[1] != filters.GaussianBlur[1])) {
        historyImg = ImageFilters.GaussianBlur(historyImg, Number(filters.GaussianBlur[1]))
      }
      if (filters.Brightness[0] && (historyFilters.Brightness[0] != filters.Brightness[0] || historyFilters.Brightness[1] != filters.Brightness[1])) {
          historyImg = ImageFilters.Brightness(historyImg, Number(filters.Brightness[1]))
      }
      if (historyFilters.Desaturate != filters.Desaturate) {
        historyImg = ImageFilters.Desaturate(historyImg)
      }
      if (filters.Dither[0] && (historyFilters.Dither[0] != filters.Dither[0] || historyFilters.Dither[1] != filters.Dither[1])) {
        historyImg = ImageFilters.Dither(historyImg, Number(filters.Dither[1]))
      }
      if (historyFilters.Edge != filters.Edge) {
        historyImg = ImageFilters.Edge(historyImg)
      }
      if (historyFilters.Emboss != filters.Emboss) {
        historyImg = ImageFilters.Emboss(historyImg)
      }
      if (historyFilters.Enrich != filters.Enrich) {
        historyImg = ImageFilters.Enrich(historyImg)
      }
      if (historyFilters.Flipx != filters.Flipx) {
        historyImg = ImageFilters.Flip(historyImg, false)
      }
      if (historyFilters.Flipy != filters.Flipy) {
        historyImg = ImageFilters.Flip(historyImg, true)
      }
      if (filters.Gamma[0] && (historyFilters.Gamma[0] != filters.Gamma[0] || historyFilters.Gamma[1] != filters.Gamma[1])) {
        historyImg = ImageFilters.Gamma(historyImg, Number(filters.Gamma[1]))
      }
      if (historyFilters.GrayScale != filters.GrayScale) {
        historyImg = ImageFilters.GrayScale(historyImg)
      }
      if (historyFilters.Invert != filters.Invert) {
        historyImg = ImageFilters.Invert(historyImg)
      }
      if (filters.Mosaic[0] && (historyFilters.Mosaic[0] != filters.Mosaic[0] || historyFilters.Mosaic[1] != filters.Mosaic[1])) {
          historyImg = ImageFilters.Mosaic(historyImg, Number(filters.Mosaic[1]))
      }
      if (filters.Posterize[0] && (historyFilters.Posterize[0] != filters.Posterize[0] || historyFilters.Posterize[1] != filters.Posterize[1])) {

        historyImg = ImageFilters.Posterize(historyImg, Number(filters.Posterize[1]))
      }
      if (historyFilters.Sepia != filters.Sepia) {
        historyImg = ImageFilters.Sepia(historyImg)
      }
      if (filters.Sharpen[0] && (historyFilters.Sharpen[0] != filters.Sharpen[0] || historyFilters.Sharpen[1] != filters.Sharpen[1])) {

        historyImg = ImageFilters.Sharpen(historyImg, Number(filters.Sharpen[1]))
      }
      if (historyFilters.Solarize != filters.Solarize) {
        historyImg = ImageFilters.Solarize(historyImg)
      }

      this.$data.ctx.putImageData(historyImg, 0, 0);
    },

    woFilter:function () {
      this.$data.ctx.putImageData(this.$data.image.img, 0, 0);
    },

    wiFilter:function () {
      this.$data.ctx.putImageData(this.$data.current===-1 ? this.$data.image.img : this.$data.history[this.$data.current].img, 0, 0);
    },

    setImage: function () {
      this.$data.canvas = document.getElementById("canvas");
      this.$data.ctx = this.$data.canvas.getContext('2d');
      let filters = this.getFilters()
      this.$data.image = {
        img: this.$data.ctx.getImageData(0, 0, this.$data.canvas.width, this.$data.canvas.height),
        filters: filters
      };
    },

    saveImage: function () {
      window.api.send("saveFile", this.$data.canvas.toDataURL('image/png'));
    },

    saveHistory: function () {
      let filters = this.getFilters()
      let entry = {
        img: this.$data.ctx.getImageData(0, 0, this.$data.canvas.width, this.$data.canvas.height),
        filters: filters
      }

      if (this.$data.current+1 < this.$data.history.length){
        while (this.$data.current+1 < this.$data.history.length) this.$data.history.pop();
      }

      this.$data.history.push(entry);
      if (this.$data.history.length > 50){
        this.$data.history.shift();
      }
      else {
        this.$data.current++;
      }
    },

    checkHistory: function (filters) {
      let history = this.$data.history
      let bestIndex = -1;
      let bestMatches = 0;
      for (let i = this.$data.current; i !== -1; i--){
        let matches = 0

        if(history[i].filters.GaussianBlur[0] && filters.GaussianBlur[0] && history[i].filters.GaussianBlur[0] == filters.GaussianBlur[0]) matches++
        else if ((filters.GaussianBlur[0] == 0 && history[i].filters.GaussianBlur[0]) || history[i].filters.GaussianBlur[0] != filters.GaussianBlur[0]) continue

        if(history[i].filters.Brightness[0] && filters.Brightness[0] && history[i].filters.Brightness[0] == filters.Brightness[0]) matches++
        else if ((filters.Brightness[0] == 0 && history[i].filters.Brightness[0]) || history[i].filters.Brightness[0] != filters.Brightness[0]) continue

        if(history[i].filters.Desaturate[0] && filters.Desaturate[0]) matches++
        else if (filters.Desaturate[0] == 0 && history[i].filters.Desaturate[0]) continue

        if(history[i].filters.Dither[0] && filters.Dither[0] && history[i].filters.Dither[0] == filters.Dither[0]) matches++
        else if ((filters.Dither[0] == 0 && history[i].filters.Dither[0]) || history[i].filters.Dither[0] != filters.Dither[0]) continue

        if(history[i].filters.Edge[0] && filters.Edge[0]) matches++
        else if (filters.Edge[0] == 0 && history[i].filters.Edge[0]) continue

        if(history[i].filters.Emboss[0] && filters.Emboss[0]) matches++
        else if (filters.Emboss[0] == 0 && history[i].filters.Emboss[0]) continue

        if(history[i].filters.Enrich[0] && filters.Enrich[0]) matches++
        else if (filters.Enrich[0] == 0 && history[i].filters.Enrich[0]) continue

        if(history[i].filters.Flipx[0] && filters.Flipx[0]) matches++
        else if (filters.Flipx[0] == 0 && history[i].filters.Flipx[0]) continue

        if(history[i].filters.Flipy[0] && filters.Flipy[0]) matches++
        else if (filters.Flipy[0] == 0 && history[i].filters.Flipy[0]) continue

        if(history[i].filters.Gamma[0] && filters.Gamma[0] && history[i].filters.Gamma[0] == filters.Gamma[0]) matches++
        else if ((filters.Gamma[0] == 0 && history[i].filters.Gamma[0]) || history[i].filters.Gamma[0] != filters.Gamma[0]) continue

        if(history[i].filters.GrayScale[0] && filters.GrayScale[0]) matches++
        else if (filters.GrayScale[0] == 0 && history[i].filters.GrayScale[0]) continue

        if(history[i].filters.Invert[0] && filters.Invert[0]) matches++
        else if (filters.Invert[0] == 0 && history[i].filters.Invert[0]) continue

        if(history[i].filters.Mosaic[0] && filters.Mosaic[0] && history[i].filters.Mosaic[0] == filters.Mosaic[0]) matches++
        else if ((filters.Mosaic[0] == 0 && history[i].filters.Mosaic[0]) || history[i].filters.Mosaic[0] != filters.Mosaic[0]) continue

        if(history[i].filters.Posterize[0] && filters.Posterize[0] && history[i].filters.Posterize[0] == filters.Posterize[0]) matches++
        else if ((filters.Posterize[0] == 0 && history[i].filters.Posterize[0]) || history[i].filters.Posterize[0] != filters.Posterize[0]) continue

        if(history[i].filters.Sepia[0] && filters.Sepia[0]) matches++
        else if (filters.Sepia[0] == 0 && history[i].filters.Sepia[0]) matches = -30

        if(history[i].filters.Sharpen[0] && filters.Sharpen[0] && history[i].filters.Sharpen[0] == filters.Sharpen[0]) matches++
        else if ((filters.Sharpen[0] == 0 && history[i].filters.Sharpen[0]) || history[i].filters.Sharpen[0] != filters.Sharpen[0]) continue

        if(history[i].filters.Solarize[0] && filters.Solarize[0]) matches++
        else if (filters.Solarize[0] == 0 && history[i].filters.Solarize[0]) matches = -30


        if (matches == 17){
          bestIndex = i
          break
        }
        else if (matches > bestMatches){
          bestMatches = matches
          bestIndex = i
        }
      }

      if (bestIndex >= 0) return this.$data.history[bestIndex];
      else return this.$data.image;
    },

    keydownHandler: function (event) {
      if (event.ctrlKey && event.code === 'KeyZ') {
        this.undoHandler()
      }
      else if (event.ctrlKey && event.code === 'KeyY') {
        this.redoHandler()
      }
    },

    undoHandler: function () {
      if (this.$data.current != 0){
        this.$data.ctx.putImageData(this.$data.history[--this.$data.current].img, 0, 0);
      }
      else this.$data.ctx.putImageData(this.$data.image.img, 0, 0);
    },

    redoHandler: function () {
      if (this.$data.current != this.history.length-1){
        this.$data.ctx.putImageData(this.$data.history[++this.$data.current].img, 0, 0);
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

    document.addEventListener('keydown', this.keydownHandler)
  },
  unmounted () {
    document.removeEventListener('keydown', this.keydownHandler)
  },
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
  .dropdown-toggle::after {
    display: none;
  }
</style>
