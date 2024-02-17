const sql = require("mssql");
import { Injectable } from "@nestjs/common";

const sqlConfig = {
  user: "_sa_",
  password: "123@123",
  server: "localhost",
  database: "test",
  options: { encrypt: false },
  port: 1576,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

sql.connect(sqlConfig).then(() => {
});

@Injectable()
export class ProjectInfoService {
  async getAllInfo(): Promise<string> {
    let result = await sql
      .query("select p.id as pId, p.project_name, p.pl as project_language, ps.id as psId, ps.user_name, ps.position from projects p inner join project_users as ps on ps.id = p.user_id");
    return JSON.stringify(result.recordset);
  }

  async getAllProjects(): Promise<string> {
    let result = await sql.query("select * from projects");
    return JSON.stringify(result.recordset);
  }

  async getAllProjectUsers() {
    let result = await sql.query("select * from project_users");
    return JSON.stringify(result.recordset);
  }

  async addProjectUsers(userName: string, position: string) {
    let result = await sql.query(`insert into project_users (user_name, position) values ('${userName}', '${position}')`);
    if (result.rowsAffected > 0) {
      return JSON.stringify({ "insert-result": "ok" });
    }
    return JSON.stringify({ "insert-result": "failed!" });
  }

  async deleteProjectUser(projectUserId: number) {
    let pResult = await sql.query(`delete from projects where user_id = ${projectUserId}`);
    if (pResult.rowsAffected > 0) {
      let psResult = await sql.query(`delete from project_users where id = ${projectUserId}`);
      if (psResult.rowsAffected > 0) {
        return JSON.stringify({ "insert-result": "ok" });
      }
    }
    return JSON.stringify({ "insert-result": "failed!" });
  }

  async editProjectUser(projectUserId: number, userName: string, position: string) {
    let result = await sql.query(`update project_users set user_name='${userName}', position='${position}' where id=${projectUserId}`);
    console.log(result);
    if (result.rowsAffected > 0) {
      return JSON.stringify({ "insert-result": "ok" });
    }
    return JSON.stringify({ "insert-result": "failed!" });
  }

  async addProject(projectName: string, pl: string, projectUserId: number) {
    let result = await sql.query(`insert into projects (project_name, pl, user_id) values ('${projectName}', '${pl}', ${projectUserId})`);
    if (result.rowsAffected > 0) {
      return JSON.stringify({ "insert-result": "ok" });
    }
    return JSON.stringify({ "insert-result": "failed!" });
  }

  async deleteProject(projectId: number) {
    let pResult = await sql.query(`delete from projects where id = ${projectId}`);
    if (pResult.rowsAffected > 0) {
      return JSON.stringify({ "insert-result": "ok" });
    }
    return JSON.stringify({ "insert-result": "failed!" });
  }

  async editProject(projectId: number, projectName: string, pl: string) {
    let result = await sql.query(`update projects set project_name='${projectName}', pl='${pl}' where id=${projectId}`);
    console.log(result);
    if (result.rowsAffected > 0) {
      return JSON.stringify({ "insert-result": "ok" });
    }
    return JSON.stringify({ "insert-result": "failed!" });
  }
}
