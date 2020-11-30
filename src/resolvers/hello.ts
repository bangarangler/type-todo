import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Hello, HelloModel } from "../entities/Hello";

@Resolver()
export class HelloResolver {
  @Query(() => string)
  async hello() {
    return await HelloModel.find();
  }

  @Mutation(() => Hello)
  async hello(@Arg("text") text: string) {
    const hi = await HelloModel.create({
      hello: text,
    }).save();
    return hi;
  }
}
