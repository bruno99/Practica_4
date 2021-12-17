import { ApolloServer} from "apollo-server";
import { connectDB } from "./mongo";
import { typeDefs } from "./schema";
import { Query} from "./resolvers/query";
import { Mutation} from "./resolvers/mutations";
import { Db } from "mongodb";

const resolvers = {
    Query,
    Mutation
}
const run = async () => {
    console.log("Connecting to DB...");
    const db:Db = await connectDB();
    console.log("Connected to database");
    const users =await db.collection("Users");
    const recipes =await db.collection("Recipes");
    const ingredients =await db.collection("Ingredients");

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req, res }) => {
            return{
            usersDb:users,
            recipesDb:recipes,
            ingredientsDb:ingredients,  
           } 
        }
    });
    server.listen(3000).then(() => {
        console.log("Listening to port 3000")
    })
}
try {
    run();
} catch (e) {
    console.log(e);
}
