import { Authorized, Resolver, Query, Mutation, Arg } from "type-graphql";
import { Group } from "./group.model";
import { GroupCreateInput } from "./group.utils";

import { initDataSource } from "../../data-source";

@Resolver(of => Group)
export class GroupResolver {
  @Query(type => [Group])
  async groups() {
    const ds = await initDataSource()
    const groupRepo = ds.getRepository(Group)
    return groupRepo.find()
  }

  @Mutation(type => Group)
  async createGroup(
    @Arg('data') data: GroupCreateInput
  ) {
    const ds = await initDataSource()
    const groupRepo = ds.getRepository(Group)
    return await groupRepo.save(data)
  }
}
