import * as bcrypt from "bcryptjs";
import { ResolverMap } from "./types/graphql-utils";
import { User } from "./entity/User";

export const resolvers: ResolverMap = {
    Query: {
        hello: (_: any, { name }: any) =>
            `Well done dear ${name || "Follower"}, follow me for more : https://medium.com/@sa.nitawaki`
    },
    Mutation: {
        register: async(_: any, { email, password }: any) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = User.create({
                email,
                password: hashedPassword
            });

            await user.save();

            return true;
        }
    }
};

export default resolvers;
