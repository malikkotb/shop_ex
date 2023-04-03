import { createStore } from "vuex";

const store = createStore({
  modules: {},
  state() {
    return {
      isLoggedIn: false,
      products: [
        {
          id: "p1",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Books_HD_%288314929977%29.jpg/640px-Books_HD_%288314929977%29.jpg",
          title: "Book Collection",
          description:
            "A collection of must-read books. All-time classics included!",
          price: 99.99,
        },
        {
          id: "p2",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Campement_-_20150802_15h44_%2810723%29.jpg/230px-Campement_-_20150802_15h44_%2810723%29.jpg",
          title: "Mountain Tent",
          description: "A tent for the ambitious outdoor tourist.",
          price: 129.99,
        },
        {
          id: "p3",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/640px-Good_Food_Display_-_NCI_Visuals_Online.jpg",
          title: "Food Box",
          description:
            "May be partially expired when it arrives but at least it is cheap!",
          price: 6.99,
        },
      ],
      cart: { items: [], total: 0, qty: 0 },
    };
  },
  mutations: {
    addProductToCart(state, payload) {
      const productData = payload;
      const productInCartIndex = state.cart.items.findIndex(
        (ci) => ci.productId === productData.id
      );

      if (productInCartIndex >= 0) {
        state.cart.items[productInCartIndex].qty++;
      } else {
        const newItem = {
          productId: productData.id,
          title: productData.title,
          image: productData.image,
          price: productData.price,
          qty: 1,
        };
        state.cart.items.push(newItem);
      }
      state.cart.qty++;
      state.cart.total += productData.price;
    },

    removeProductFromCart(state, payload) {
      const prodId = payload.productId;
      const productInCartIndex = state.cart.items.findIndex(
        (cartItem) => cartItem.productId === prodId
      );
      const prodData = state.cart.items[productInCartIndex];
      state.cart.items.splice(productInCartIndex, 1);
      state.cart.qty -= prodData.qty;
      state.cart.total -= prodData.price * prodData.qty;
    },

    login(state) {
      // TODO: have to be added to mutations in vuex store
      state.isLoggedIn = true;
    },
    logout(state) {
      // TODO: have to be added to mutations in vuex store
      state.isLoggedIn = false;
    },
  },

  actions: {
    login(context) {
      context.commit("login");
    },
    logout(context) {
      context.commit("logout");
    },
    addProduct(context, payload) {
      context.commit('addProductToCart', payload);
    },
    removeProduct(context, payload) {
      context.commit("removeProductFromCart", payload);
    }
  },

  getters: {
    currentProducts(state) {
      return state.products;
    },
    loginStatus(state) {
      return state.isLoggedIn;
    },
    currentCart(state) {
      return state.cart;
    },
    productsInCart(state) {
      return state.cart.items;
    },
    totalSumInCart(state) {
      return state.cart.total.toFixed(2);
    },
    quantityInCart(state) {
      return state.cart.qty;
    }  
  },
});

export default store;
