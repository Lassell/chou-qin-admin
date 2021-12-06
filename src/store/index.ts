import { createStore, Store, StoreOptions } from "vuex";

interface RootState {}

const store: Store<RootState> = createStore({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {},
});

export default store;
