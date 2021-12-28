import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    task: Model,
  },

  seeds(server) {
    server.db.loadData({
      tasks: [
        {
          id: 1,
          title: 'Configurar aplicação',
          description: 'Configurar aplicação geral do React',
          completed: 'Sim',
          dateToFinish: new Date('2021-02-15 09:00:00'),
          createdAt: new Date('2021-02-12 09:00:00'),
        },
        {
          id: 2,
          title: 'Criar Logo',
          description: 'Criar logo para o aplicativo do cliente',
          completed: 'Não',
          dateToFinish: new Date('2021-02-18 09:00:00'),
          createdAt: new Date('2021-02-25 09:00:00'),
        }
      ],
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/tasks', () => {
      return this.schema.all('task')
    })

    this.get('/:id', (schema, request) => {
      let id = request.params.id;
      // @ts-ignore
      return schema.tasks.find(id);
    });

    this.post('/tasks', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('task', data);
    })

    this.delete('/tasks/:id', (schema, request) => {
      let id = request.params.id;
// @ts-ignore
      return schema.tasks.find(id).destroy();
    });

    this.patch('/tasks/:id', (schema, request) => {
      let data = JSON.parse(request.requestBody);

      let id = request.params.id;
// @ts-ignore
      let task = schema.tasks.find(id);

      return task.update(data);
    });
  },
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

