<template>
  <div>
    <div class="News">
      <p>{{ news }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "News",
  props: ["news", "id"],
};
</script>

<style scoped>
.News {
  padding: 1rem;
  border: 1px dotted #ccc;
  margin: 1rem 0;
}
</style>
