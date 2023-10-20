import fp from 'fastify-plugin';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

const swagger = fp(async function (fastify, opts) {
	await fastify.register(fastifySwagger, {
		swagger: {
			info: {
				title: 'Test swagger',
				description: 'Testing the Fastify swagger API',
				version: '0.1.0',
			},
			externalDocs: {
				url: 'https://swagger.io',
				description: 'Find more info here',
			},
			host: 'localhost',
			schemes: ['http'],
			consumes: ['application/json'],
			produces: ['application/json'],
			tags: [
				//{ name: 'user', description: 'User related end-points' },
				//{ name: 'code', description: 'Code related end-points' },
			],
			securityDefinitions: {
				apiKey: {
					type: 'apiKey',
					name: 'apiKey',
					in: 'header',
				},
			},
		},
	});

	await fastify.register(fastifySwaggerUi, {
		routePrefix: '/api-docs',
		uiConfig: {
			docExpansion: 'full',
			deepLinking: false,
		},
	});
});

export default swagger;
