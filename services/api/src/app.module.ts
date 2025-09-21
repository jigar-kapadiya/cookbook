import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { GraphQLError } from 'graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true, // in Apollo Server v4 this enables the embedded Sandbox in dev
      csrfPrevention: true, // uncomment for prod
      formatError: (err: GraphQLError) => {
        const { message, extensions } = err as any;
        const { code, errors } = extensions || {};
        return { message, extensions: { code, errors } };
      },
    }),
    UsersModule,
    PrismaModule,
    HealthModule,
  ],
})
export class AppModule { }
