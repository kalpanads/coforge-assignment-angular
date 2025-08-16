import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService, RemoteUser } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users from the GitHub API', () => {
    const dummyUsers: RemoteUser[] = [
      { id: 1, login: 'testuser1', avatar_url: '', html_url: '' },
      { id: 2, login: 'testuser2', avatar_url: '', html_url: '' },
    ];

    service.list().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne('https://api.github.com/users?per_page=20');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });
});
