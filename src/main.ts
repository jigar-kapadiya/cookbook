import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { GraphQLError } from 'graphql';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,          // strip unknown fields
      forbidNonWhitelisted: true,
      transform: true,          // auto-transform args to DTO classes
      validationError: { target: false, value: false }, // keep payload clean
      exceptionFactory: (errs: ValidationError[]) => {
        const errors = errs.map(e => ({
          field: e.property,
          messages: Object.values(e.constraints ?? {}),
        }));
        return new GraphQLError('Validation failed', {
          extensions: { code: 'BAD_USER_INPUT', errors },
        });
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
