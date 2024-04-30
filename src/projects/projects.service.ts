import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Repository } from 'typeorm';
import { Project, ProjectStatus } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
  
  }

  findAll() {
    return this.projectRepo.find();
  }

  findOne(id: string) {
    return this.projectRepo.findOneOrFail({ where: { id } });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepo.findOneOrFail({ where: { id } });

    updateProjectDto.name && (project.name = updateProjectDto.name);
    updateProjectDto.description &&
      (project.description = updateProjectDto.description);

    if (updateProjectDto.started_at) {
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

      project.started_at = updateProjectDto.started_at;
      project.status = ProjectStatus.Active;
    }

    if (updateProjectDto.cancelled_at) {
      if (project.status === ProjectStatus.Completed) {
        throw new Error(
          'Não foi possível cancelar o projeto pois ele já está finalizado',
        );
      }

      if (updateProjectDto.cancelled_at < project.started_at) {
        throw new Error(
          'Não foi possível cancelar o projeto, pois ele ainda não foi iniciado',
        );
      }

      if (project.status === ProjectStatus.Cancelled) {
        throw new Error(
          'Não foi possível cancelar o projeto, pois ele já está cancelado',
        );
      }

      project.started_at = updateProjectDto.started_at;
      project.status = ProjectStatus.Completed;
    }

    if (updateProjectDto.completed_at) {
      if (project.status === ProjectStatus.Completed) {
        throw new Error(
          'Não foi possível cancelar o projeto pois ele já está finalizado',
        );
      }

      if (updateProjectDto.completed_at < project.started_at) {
        throw new Error(
          'Não foi possível finalizar o projeto, pois ele ainda não foi iniciado',
        );
      }

      if (updateProjectDto.completed_at === project.cancelled_at) {
        throw new Error(
          'Não foi possível finalizar o projeto, pois ele está cancelado',
        );
      }

      project.started_at = updateProjectDto.started_at;
      project.status = ProjectStatus.Active;
    }

    return this.projectRepo.save(project);
  }

  remove(id: string) {
    return `This action removes a #${id} project`;
  }
}
