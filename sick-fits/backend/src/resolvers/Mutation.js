const mutations = {
  async createProduct(parent, args, ctx, info) {
    const product = await ctx.db.mutation.createProduct(
      {
        data: {
          ...args
        }
      },
      info
    );
    // console.log(product);
    return product;
  },

  async createUser(parent, args, ctx, info) {
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args
        }
      },
      info
    );

    // console.log(user);
    return user;
  },
  updateProduct(parent, args, ctx, info) {
    // first take copy of the updates
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.id;
    //run the update method
    return ctx.db.mutation.updateProduct(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  }
};

module.exports = mutations;
