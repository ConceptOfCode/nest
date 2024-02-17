import { Module } from '@nestjs/common';
import { ProjectInfoService } from './services/project-info.service';
import { ProjectInfoController } from './controllers/project-info.controller';

@Module({
  providers: [ProjectInfoService],
  controllers: [ProjectInfoController],
})
export class ProjectInfoModule {}
