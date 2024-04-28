import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  name?: string;

  description?: string;

  started_at?: Date | null;

  forecast_at?: Date | null;

  completed_at?: Date | null;

  cancelled_at?: Date | null;
}
