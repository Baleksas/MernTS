import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";
const main = async () => {
  // connect to db
  const orm = await MikroORM.init(mikroConfig);
  //   run migrations
  await orm.getMigrator().up();
  //   run sql
  const post = orm.em.create(Post, { title: "My first post" });
  await orm.em.persistAndFlush(post);

  const posts = await orm.em.find(Post, {});
  console.log(posts);
};
main().catch((err) => {
  console.error(err);
});
console.log("hello world");
