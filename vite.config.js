import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import webhookHandler from './api/line-webhook.js';
import chatHandler from './api/chat.js';

function apiPlugin() {
  return {
    name: 'api-server-middleware',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url.split('?')[0];

        if (url === '/api/line-webhook' || url === '/api' || url === '/api/index') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              req.body = body ? JSON.parse(body) : {};
            } catch (e) {
              req.body = {};
            }
            res.status = (code) => {
              res.statusCode = code;
              return res;
            };
            res.json = (data) => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return res;
            };
            res.send = (data) => {
              res.end(data);
              return res;
            };
            await webhookHandler(req, res);
          });
          return;
        }

        if (url === '/api/chat') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              req.body = body ? JSON.parse(body) : {};
            } catch (e) {
              req.body = {};
            }
            res.status = (code) => {
              res.statusCode = code;
              return res;
            };
            res.json = (data) => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return res;
            };
            res.send = (data) => {
              res.end(data);
              return res;
            };
            await chatHandler(req, res);
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), apiPlugin()],
  server: {
    port: 3000,
    open: false
  }
});
