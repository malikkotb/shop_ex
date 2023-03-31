<template>
  <section>
    <ul>
      <product-item
        v-for="prod in products"
        :key="prod.id"
        :id="prod.id"
        :title="prod.title"
        :image="prod.image"
        :description="prod.description"
        :price="prod.price"
      ></product-item>
    </ul>
  </section>
</template>

<script>
import ProductItem from "../components/products/ProductItem.vue";
import { mapGetters } from "vuex";
export default {
  computed: {
    // can also be done with:
    // products() {
    //   return this.$store.getters.currentProducts;
    // },
    ...mapGetters({products: "currentProducts"}),
  },

  components: {
    ProductItem,
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 40rem;
}
</style>
