import { fastify } from "fastify";

const app = fastify();

app.get('/', () => {
  return 'Hello World!'
});

app.listen({
  port: 3333
})
.then(() => console.log('🔥 Server running @ http://localhost:3333'))
.catch(() => console.log('❌ Cannot run server'))