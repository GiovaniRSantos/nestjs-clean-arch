export class CreateProjectDto {
  name: string;

  description: string;

  started_at: Date | null;

  forecast_at: Date | null;
}
