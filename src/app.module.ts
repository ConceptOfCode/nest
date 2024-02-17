import { Module } from '@nestjs/common';
import { ProjectInfoModule } from './project_info_module/project-info.module';

@Module({
  imports: [ProjectInfoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
