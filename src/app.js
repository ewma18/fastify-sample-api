import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import FastifyPluginAsync from "fastify";
import AutoloadPluginOptions from "@fastify/autoload";
import AutoLoad from "@fastify/autoload";


const app = async function (fastify, opts) {
	// Place here your custom code!

	// Do not touch the following lines

	// This loads all plugins defined in plugins
	// those should be support plugins that are reused
	// through your application
	fastify.register(AutoLoad, {
		dir: path.join(__dirname, 'plugins'),
		options: Object.assign({}, opts)
	})

	// This loads all plugins defined in routes
	// define your routes in one of these
	fastify.register(AutoLoad, {
		dir: path.join(__dirname, 'routes'),
		options: Object.assign({}, opts)
	})
}

export default app;
export { app };