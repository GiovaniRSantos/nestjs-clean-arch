import { Entity, PrimaryColumn, Column } from 'typeorm';

export enum ProjectStatus {
  Pending = 'pending',
  Active = 'active',
  Cancelled = 'cancelled',
  Completed = 'completed',
}

@Entity()
export class Project {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'datetime', nullable: true })
  started_at: Date | null;

  @Column({ type: 'datetime', nullable: true })
  cancelled_at: Date | null;

  @Column({ type: 'datetime', nullable: true })
  forecast_at: Date | null;

  @Column({ type: 'datetime', nullable: true })
  completed_at: Date | null;

  @Column({ type: 'simple-enum' })
  status: ProjectStatus = ProjectStatus.Pending;

  constructor(
    props: {
      name: string;
      description: string;
      started_at?: Date | null;
      cancelled_at?: Date | null;
      forecast_at?: Date | null;
      completed_at?: Date | null;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();

    if (props.started_at) {
      this.start(this.started_at);
    }
  }

  start(started_at: Date) {
    if (this.status === ProjectStatus.Active) {
      throw new Error(
        'Não foi possível iniciar o projeto, pois ele já está ativo',
      );
    }

    if (this.status === ProjectStatus.Completed) {
      throw new Error(
        'Não foi possível iniciar o projeto, pois ele já foi finalizado',
      );
    }

    if (this.status === ProjectStatus.Cancelled) {
      throw new Error(
        'Não foi possível iniciar o projeto pois ele está cancelado',
      );
    }

    this.started_at = started_at;
    this.status = ProjectStatus.Active;
  }
}
