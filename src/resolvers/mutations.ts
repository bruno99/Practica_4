import { ApolloError } from 'apollo-server-errors';
import { Collection, Db } from "mongodb";
import { User, Recipes, Ingredient } from "../types";
import { v4 as uuidv4 } from "uuid";


export const Mutation = {
    SignIn: async (parent: any, args: { email: string, pwd: string }, context: { usersDb: Collection }) => {
        const user = await context.usersDb.findOne({ email: args.email });
        if (!user) {
            const tok = uuidv4();
            const usuario = {
                email: args.email,
                password: args.pwd,
                token: null
            };
            await context.usersDb.insertOne(usuario);
            const user2 = await context.usersDb.findOne({ email: args.email });
            if (user2) {
                return {
                    id: user2._id,
                    email: user2.email as string,
                    pwd: user2.password as string,
                    token: tok,
                }
            }
        } else {
            throw new ApolloError('User already registered', 'MY_ERROR_CODE');
        }
    },
    LogIn: async (parent: any, args: { email: string, pwd: string }, context: { usersDb: Collection }) => {
        const user = (await context.usersDb.findOne({ email: (args.email) }));
        if (user) {
            if (user.token !== null) {
                throw new ApolloError('User already logged', 'MY_ERROR_CODE');
            } else {
                if (user.password.compareSync(args.pwd, user.password)) {
                    const tok = uuidv4();
                    (await context.usersDb.updateOne({ email: (args.email) }, { $set: { token: tok } }))
                    return true;
                } else {
                    throw new ApolloError('Passwords dont match', 'MY_ERROR_CODE');
                }
            }
        } else {
            throw new ApolloError('User does not exist', 'MY_ERROR_CODE');
        }
    },
    LogOut: async (parent: any, args: { token: string }, context: { usersDb: Collection }) => {
        (await context.usersDb.updateOne({ token: args.token }, {
            set: {
                token: null
            }
        }))
        const user = (await context.usersDb.findOne({ token: args.token }));
        if (!user ) {
            return "Logged out"
        } else {
            throw new ApolloError('Error', 'MY_ERROR_CODE');
        }
    },
    AddIngredient: async (parent: any, args: {id: string}, context: {ingredientsDb: Collection}) => {
        const ingredient = await context.ingredientsDb.findOne({ 
            id:args.id,
        });

        if(ingredient){
            throw new ApolloError('Ingredient aready exists', 'MY_ERROR_CODE');
        } else {
        }
    },
}
