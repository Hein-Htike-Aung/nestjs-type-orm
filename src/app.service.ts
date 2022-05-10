import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  catchError,
  from,
  Observable,
  of,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getAll(): Observable<User[]> {
    return from(this.userRepository.find({ relations: ['pets'] }));
  }

  getOneById(id: number): Observable<User> {
    return from(
      this.userRepository.findOneOrFail({ where: { id }, relations: ['pets'] }),
    ).pipe(
      take(1),
      catchError((err) => throwError(() => err)),
    );
  }

  createUser(name: string): Observable<User> {
    return of(this.userRepository.create({ name })).pipe(
      switchMap((user: User) => {
        return this.userRepository.save(user);
      }),
    );
  }

  updateUser(id: number, name: string): Observable<User> {
    return from(this.userRepository.update(id, { name })).pipe(
      switchMap((resp: UpdateResult) => {
        if (resp.affected === 1) {
          return this.getOneById(id);
        }
      }),
    );
  }

  deleteUser(id: number): Observable<User> {
    return this.getOneById(id).pipe(
      take(1),
      switchMap((user: User) => {
        if (user) {
          return this.userRepository.remove(user);
        }
      }),
    );
  }
}
