import 'reflect-metadata';
import { createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';
import { AuthChecker, buildSchema } from 'type-graphql';

import { GroupResolver } from './modules/group/group.resolver';
import { PartyResolver } from './modules/party/party.resolver';
import { PersonResolver } from './modules/person/person.resolver';

async function bootstrap() {
  try {
    const schema = await buildSchema({
      resolvers: [ PartyResolver, GroupResolver, PersonResolver ],
    })

    const yoga = createYoga({ schema })
    const server = createServer(yoga)
    const port = 4200
    const playground = '/graphql'

    server.listen(port, () => {
      console.log(`Server started at port http://localhost:${port}${playground}`)
    })
  } catch(e) {
    console.error("Error: ", e);
  }
}

bootstrap()
