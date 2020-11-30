import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass } from "typegoose";

@ObjectType({ description: `The Hello Model` })
export class Hello {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  @Property()
  hello: string;
}

export const HelloModel = getModelForClass(Hello);
