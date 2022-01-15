<template>
  <button class="btn btn-secondary dropdown-toggle" type="button" :id=name data-bs-toggle="dropdown" aria-expanded="false">
    <i :class=classes></i>
  </button>
  <div class="dropdown-menu p-0 m-0" :aria-labelledby=name>
    <div class="input-group m-0 p-0">
      <div class="input-group-text">
        <input type="checkbox" class="form-control form-check-input mt-0" @input="filterSend" @change="setHistory" :id = idb>
      </div>
      <span class="input-group-text">{{name}}</span>
      <div v-if="max >= min" class="input-group-text">
        <input :value=val type="range" class="form-range" :min=min :max=max oninput="this.parentElement.nextElementSibling.children[0].value = this.value" @input="filterSend" @change="setHistory" :id = idr>
      </div>
      <div v-if="max >= min" class="input-group-text">
        <output>{{val}}</output>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "changeFilter",
  props: {
    name: String,
    min: Number,
    max: Number,
    val: Number,
    idb: String,
    idr: String,
    bi: String,
  },
  emits:['changeFilter', 'history'],
  methods:{
    filterSend: function () {
      let inputs = document.getElementsByTagName('input')
      this.$emit('changeFilter', this.name, inputs[0].checked, (this.max >= this.min)? inputs[1].value : null);
    },
    setHistory: function () {
      let inputs = document.getElementsByTagName('input')
      this.$emit('history', this.name, inputs[0].checked, (this.max >= this.min)? inputs[1].value : null);
    }
  },
  computed:{
    classes: function () {
      return 'bi ' + this.bi ?? 'bi-clouds-fill';
    }
  }
}
</script>

<style scoped>
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
