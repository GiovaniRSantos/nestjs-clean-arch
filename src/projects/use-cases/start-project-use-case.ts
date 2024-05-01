import { Repository } from 'typeorm';
import { Project, ProjectStatus } from '../entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StartProjectDto } from '../dto/start-project.dto';

export class StartProjectUseCase {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ) {}

  async execute(id: string, input: StartProjectDto) {
    const project = await this.projectRepo.findOneOrFail({ where: { id } });

    if (project.status === ProjectStatus.Active) {
      throw new Error(
        'Não foi possível iniciar o projeto, pois ele já está ativo',
      );
    }

    if (project.status === ProjectStatus.Completed) {
      throw new Error(
        'Não foi possível iniciar o projeto, pois ele já foi finalizado',
      );
    }

    if (project.status === ProjectStatus.Cancelled) {
      throw new Error(
        'Não foi possível iniciar o projeto pois ele está cancelado',
      );
    }

    project.started_at = input.started_at;
    project.status = ProjectStatus.Active;

    return this.projectRepo.save(project);
  }
}
