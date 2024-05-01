import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectUseCase } from './use-cases/create-project-use-case';
import { ProjectsWithUseCaseController } from './projects.with-use-case.controller';
import { FindAllProjectsUseCase } from './use-cases/find-all-project-use-case';
import { StartProjectUseCase } from './use-cases/start-project-use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],

  controllers: [ProjectsWithUseCaseController],
  providers: [
    ProjectsService,
    CreateProjectUseCase,
    FindAllProjectsUseCase,
    StartProjectUseCase,
  ],
})
export class ProjectsModule {}
