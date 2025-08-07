import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InitialSeed } from './seeds/seedsInitial';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 添加全局路由前缀
  app.setGlobalPrefix('api');
  
  // 运行种子数据初始化
  const seedService = app.get(InitialSeed);
  await seedService.run();
  
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();