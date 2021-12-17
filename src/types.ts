export type Recipes = {
    _id:string,
    title:string,
    description:string,
    ingredients:[Ingredient],
    author:[string]
  };

  export type User={
    _id:string,
    email:string,
    pwd:string,
    token?:any,
    recipes?:[string]
  }

  export type Ingredient={
    _id:string,
    name:string,
    recipes?:[string]
  }