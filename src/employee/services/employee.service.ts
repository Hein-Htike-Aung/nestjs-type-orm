import { from, Observable, of, switchMap } from 'rxjs';
import { Task } from './../models/task.entity';
import { Meeting } from './../models/meeting.entity';
import { ContactInfo } from './../models/contactInfo.entity';
import { Employee } from './../models/employee.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
    @InjectRepository(ContactInfo)
    private contactInfoRepo: Repository<ContactInfo>,
    @InjectRepository(Meeting) private meetingRepo: Repository<Meeting>,
    @InjectRepository(Task) private taskRepo: Repository<Task>,
  ) {}

  async seed() {
    // Create Employee
    const ceo = this.employeeRepo.create({ name: 'Mr. CEO' });

    // Save Employee
    await this.employeeRepo.save(ceo);

    // Create Contact Info with employee
    const ceoContactInfo = this.contactInfoRepo.create({
      email: 'email@gmail.com',
      employee: ceo,
    });

    // Save Contact Info
    await this.contactInfoRepo.save(ceoContactInfo);

    // Create New Employee with Manager
    const manager = this.employeeRepo.create({
      name: 'Marius',
      manager: ceo,
    });

    // Create New Tasks and Save
    const task1 = this.taskRepo.create({ name: 'Hire People' });
    await this.taskRepo.save(task1);
    const task2 = this.taskRepo.create({ name: 'Present to CEO' });
    await this.taskRepo.save(task2);

    // Set Task with employee
    manager.tasks = [task1, task2];

    // Create new Meeting
    const meeting1 = this.meetingRepo.create({ zoomUrl: 'meeting.com' });

    // Set Meeting with employees
    meeting1.attendees = [ceo];

    // Save meeting
    await this.meetingRepo.save(meeting1);

    // Set Employee with meetings
    manager.meetings = [meeting1];

    // Save Employee
    await this.employeeRepo.save(manager);

    // Save Manager
    await this.employeeRepo.save(manager);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return from(
      this.employeeRepo.findOne({
        where: { id },
        relations: [
          'manager',
          'directReports',
          'tasks',
          'contactInfo',
          'meetings',
        ],
      }),
    );

    // return from(
    //   this.employeeRepo
    //     .createQueryBuilder('employee')
    //     .leftJoinAndSelect('employee.directReports', 'directReports')
    //     .leftJoinAndSelect('employee.meetings', 'meetings')
    //     .leftJoinAndSelect('employee.tasks', 'tasks')
    //     .where('employee.id = :employeeId', { employeeId: id })
    //     .getOne(),
    // );
  }

  deleteEmployee(id: number): Observable<{deleted: boolean}> {
    return from(this.employeeRepo.delete(id)).pipe(
      switchMap((resp: DeleteResult) => {
        if(resp.affected == 1) {
          return of({deleted: true})
        }
      })
    )
  }
}
