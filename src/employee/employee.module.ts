import { Task } from './models/task.entity';
import { Meeting } from './models/meeting.entity';
import { ContactInfo } from './models/contactInfo.entity';
import { Employee } from './models/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { EmployeeService } from './services/employee.service';
import { EmployeeController } from './controllers/employee.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, ContactInfo, Meeting, Task])],
  providers: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
