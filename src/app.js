import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import AutoLoad from '@fastify/autoload';
import cors from '@fastify/cors';

const app = async function (fastify, opts) {
	//Setup cors
	await fastify.register(cors, {
		// put your options here
	});

	//setup custon plugins (middlewares)
	fastify.register(AutoLoad, {
		dir: path.join(__dirname, 'plugins'),
		options: Object.assign({}, opts),
	});

	//setup routes
	fastify.register(AutoLoad, {
		dir: path.join(__dirname, 'routes'),
		options: Object.assign({}, opts),
	});

	
};

export default app;
export { app };
