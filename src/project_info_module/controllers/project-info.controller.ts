import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ProjectInfoService } from "../services/project-info.service";

@Controller("info")
export class ProjectInfoController {
  constructor(private projectService: ProjectInfoService) {
  }

  @Get("/")
  async getAll(): Promise<string> {
    return await this.projectService.getAllInfo();
  }

  @Get("projects")
  async getAllProjects() {
    return await this.projectService.getAllProjects();
  }

  @Get("project-users")
  async getAllProjectUsers() {
    return await this.projectService.getAllProjectUsers();
  }

  @Post("add/project-user")
  async addProjectUser(@Body() body: any) {
    let userName = body.user_name;
    let position = body.position;

    return await this.projectService.addProjectUsers(userName, position);
  }

  @Get("delete/project-users/:id")
  async deleteProjectUser(@Param("id") id: number) {
    return await this.projectService.deleteProjectUser(id);
  }

  @Post("edit/project-users")
  async editProjectUser(@Body() body: any) {
    return this.projectService.editProjectUser(body.id, body.user_name, body.position);
  }

  @Post("add/projects")
  async addProject(@Body() body: any) {
    let projectName = body.project_name;
    let programmingLanguage = body.programming_language;
    let userId = body.user_id;

    return await this.projectService.addProject(projectName, programmingLanguage, userId);
  }

  @Get("delete/projects/:id")
  async deleteProject(@Param("id") id: number) {
    return await this.projectService.deleteProject(id);
  }

  @Post("edit/projects")
  async editProject(@Body() body: any) {
    let projectId = body.project_id;
    let projectName = body.project_name;
    let programmingLanguage = body.programming_language;

    return await this.projectService.editProject(projectId, projectName, programmingLanguage);
  }
}
