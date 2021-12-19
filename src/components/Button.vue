<template>
  <a :class="classes" v-on:click="goto" role="button">
    <slot/>
  </a>
</template>

<script>
export default {
  name: "Button",

  props: {
    link: String,
    color: String,
    outline: String,
    disabled: Boolean,
    addClass: Boolean,
  },

  methods: {
    goto: function (){
      if(this.link){
        this.$router.push(this.link)
      }
    }
  },

  computed: {
    classes () {
      let classes = 'btn ';
      switch (this.color){
        case 'secondary':
          classes += 'btn-secondary ';
          break;
        case 'success':
          classes += 'btn-success ';
          break;
        case 'danger':
          classes += 'btn-danger ';
          break;
        case 'warning':
          classes += 'btn-warning ';
          break;
        case 'info':
          classes += 'btn-info ';
          break;
        case 'light':
          classes += 'btn-light ';
          break;
        case 'dark':
          classes += 'btn-dark ';
          break;
        default:
          classes += 'btn-primary ';
          break;
      }

      switch (this.outline){
        case 'secondary':
          classes += 'btn-outline-secondary ';
          break;
        case 'success':
          classes += 'btn-outline-success ';
          break;
        case 'danger':
          classes += 'btn-outline-danger ';
          break;
        case 'warning':
          classes += 'btn-outline-warning ';
          break;
        case 'info':
          classes += 'btn-outline-info ';
          break;
        case 'light':
          classes += 'btn-outline-light ';
          break;
        case 'dark':
          classes += 'btn-outline-dark ';
          break;
        case 'primary':
          classes += 'btn-outline-primary ';
          break;
      }

      classes += this.disabled ? 'disabled ' : '';

      classes += this.$route.path === this.link ? 'active ' : '';

      classes += this.addClass;

      return classes
    }
  }
}
</script>

<style scoped>

</style>