import {
  Arg,
  Args,
  Mutation,
  Resolver,
  Query
} from 'type-graphql'

import { Person } from './person.model'
import { PersonCreateInput } from './person.utils'

import { initDataSource } from '../../data-source'

@Resolver(of => Person)
export class PersonResolver {
  @Query(returns => [Person])
  async people() {
    const ds = await initDataSource()
    const personRepo = ds.getRepository(Person)
    return await personRepo.find()
  }

  @Mutation(returns => Person)
  async createPerson(
    @Arg('data') data: PersonCreateInput
  ) {
    const ds = await initDataSource()
    const personRepo = ds.getRepository(Person)
    return await personRepo.save(data)
  }
}
