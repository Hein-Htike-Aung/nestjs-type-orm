import { Observable } from 'rxjs';
import { EmployeeService } from './../services/employee.service';
import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Employee } from '../models/employee.entity';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Post()
  async seed(): Promise<any> {
    await this.employeeService.seed();
    return 'seed complete';
  }

  @Get(':id')
  getEmployeeById(@Param('id') id: number): Observable<Employee> {
    return this.employeeService.getEmployeeById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<{ deleted: boolean }> {
    return this.employeeService.deleteEmployee(id);
  }
}
