import dotenv from 'dotenv';
dotenv.config();

import Fastify from 'fastify';
import closeWithGrace from 'close-with-grace';
import appService from './src/app.js';

const serverOptions = {
	ignoreTrailingSlash: true,
	logger: true,
	connectionTimeout: 3000,
	requestTimeout: 3000,
};
const app = Fastify(serverOptions);
app.register(appService);

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace(
	{ delay: process.env.FASTIFY_CLOSE_GRACE_DELAY || 500 },
	async function ({ signal, err, manual }) {
		if (err) {
			app.log.error(err);
		}
		await app.close();
	},
);

app.addHook('onClose', (instance, done) => {
	closeListeners.uninstall();
	done();
});

// Start listening.
app.listen({ port: process.env.PORT || 3000 }, (err) => {
	if (err) {
		app.log.error(err);
		process.exit(1);
	}
});
