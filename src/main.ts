import { createApp } from 'vue'
import './style.css'
import App from '@/App.vue'
import router from './router';
import { ApolloClients } from '@vue/apollo-composable';
import apolloClient from './apollo/apollo';

const app = createApp(App);
app.provide(ApolloClients, {
  default: apolloClient,
})
app.use(router)
app.mount('#app')
