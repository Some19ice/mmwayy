const {forwardTo} = require('prisma-binding')

const Query = {
  products: forwardTo('db'),
  product: forwardTo('db')


  // async products(parent, args, ctx, info) {
  //   const products = await ctx.db.query.products();
  //   return products;
  // },
  // async users(parent, args, ctx, info) {
  //   const users = await ctx.db.query.users();
  //   return users;
  // }
};

module.exports = Query;
