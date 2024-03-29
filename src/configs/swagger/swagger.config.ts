import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = (app: any) => {
  const config = new DocumentBuilder()
    .setTitle('Shop Manager')
    .setDescription('The Shop Manager APIs')
    .setVersion('1.0')
    .addTag('shop')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'Authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
};
