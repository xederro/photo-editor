<template>
  <aside class="position-fixed top-0 start-0">
    <div class="d-flex flex-column flex-shrink-0 bg-dark" style="width: 4.5rem;">
      <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
        <li class="nav-item">
          <a class="nav-link active py-3 border-bottom" data-bs-toggle="collapse" href="#collapseNav" role="button" aria-expanded="false" aria-controls="collapseNav">
            <i class="bi bi-list"></i>
          </a>
        </li>
      </ul>
      <div id="collapseNav" class="collapse">
        <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
          <li class="nav-item">
            <router-link to="/" :class="classes('/')" aria-current="page" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
              <i class="bi bi-gem"></i>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/Photo" :class="classes('/Photo')" aria-current="page" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
              <i class="bi bi-card-image"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </aside>
  <main>
    <slot/>
  </main>
</template>

<script>
export default {
  name: "AppLayout",

  methods: {
    classes: function (to) {
      let classes = 'nav-link py-3 border-bottom ';

      classes += this.$route.path === to ? 'active ' : '';

      return classes
    }
  }
}
</script>

<style scoped>
</style>