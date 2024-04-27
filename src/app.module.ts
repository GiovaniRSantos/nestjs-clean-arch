import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ProjectsModule],
})
export class AppModule {}
