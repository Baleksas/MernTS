import { MiddlewareFn } from "type-graphql";
import { MyContext } from "src/types";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  console.log("authenticated");
  if (!context.req.session.userId) {
    console.log("not authenticated");
    throw new Error("not authenticated");
  }
  return next();
};
