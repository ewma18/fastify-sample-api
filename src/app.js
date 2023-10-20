import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import AutoLoad from "@fastify/autoload";
import rootRoutes from "./routes/root.js";

const app = async function (fastify, opts) {
	fastify.register(AutoLoad, {
		dir: path.join(__dirname, 'plugins'),
		options: Object.assign({}, opts)
	});

	fastify.register(rootRoutes, Object.assign({}, opts));
};

export default app;
export { app };