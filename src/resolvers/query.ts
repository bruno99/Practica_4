import { AnyBulkWriteOperation, Collection, ObjectId } from "mongodb";
import { Recipes } from "../types";

export const Query = {
    getUser: async (parent: any, args: { id: string }, context: { usersDb: Collection }) => {
        const user = await context.usersDb.findOne({ _id: new ObjectId(args.id) });
        if (user) {
            return {
                ...user,
                id:user.id,
            }
        }
    },
    getUsers: async (parent: any, args: {}, context: { usersDb: Collection }) => {
        const usuarios = await context.usersDb.find().toArray();
        return usuarios.map(elem => ({
            id: elem._id,
            email: elem.email,
            token: elem.token,
            pwd: elem.password
        }))
    },
    getRecipe: async (parent: any, args: { id: string }, context: { recipesDb: Collection }) => {
        const recip = await context.recipesDb.findOne({ _id: new ObjectId(args.id) });
        if (recip) {
            return {
                ...recip,
                id: recip.id
            }
        }
    },
    getRecipes: async (parent: any, args: {}, context: { recipesDb: Collection }) => {
        const recetas = await context.recipesDb.find().toArray();
        const conversion = recetas.map(elem => {
            const itUser = {
                id: elem._id,
                title: elem.title,
                description: elem.description,
                ingredients: [],
            }
            return itUser;
        })
        return conversion;
    }

}
