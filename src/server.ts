import { ApolloServer, gql, } from "apollo-server";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";

import { User } from "./entity/User";
import { HelloWorldResolver } from "./resolvers/HelloWorldResolver";

export async function server()  {
	const connection = await createConnection();

	// console.log("Inserting a new user into the database...");
	// const user = new User();
	// user.firstName = "Timber";
	// user.lastName = "Saw";
	// user.age = 25;
	// await connection.manager.save(user);
	// console.log("Saved a new user with id: " + user.id);
	// console.log("Loading users from the database...");
	// const users = await connection.manager.find(User);
	// console.log("Loaded users: ", users);
	// console.log("Here you can setup and run express/koa/any other framework.");

	const server = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloWorldResolver],
		}),
		context: ({req,res})=>({req,res}),
	});

	server.listen().then(({ url }) => {
		console.log(`🚀 Server ready at ${url}`);
	});

}
