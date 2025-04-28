import { TestBed } from '@angular/core/testing';

import { StoryService } from './storyservice.service';
import { Story } from '../models/story';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../Environments/environment';

describe('StoryService', () => {
  let service: StoryService;
  let httpMock: HttpTestingController;

  const dummyStories: Story[] = [
    { id: 1,title: 'Story 1', url: 'http://story1.com' },
    { id:2,title: 'Story 2', url: 'http://story2.com' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StoryService]
    });

    service = TestBed.inject(StoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch stories with correct parameters', () => {
    const page = 1;
    const pageSize = 10;
    const query = 'angular';

    service.getStories(page, pageSize, query).subscribe(stories => {
      expect(stories.length).toBe(2);
      expect(stories).toEqual(dummyStories);
    });

    const req = httpMock.expectOne(request => 
      request.url === environment.apiBaseUrl &&
      request.params.get('page') === page.toString() &&
      request.params.get('pageSize') === pageSize.toString() &&
      request.params.get('query') === query
    );

    expect(req.request.method).toBe('GET');

    // Respond with mock data
    req.flush(dummyStories);
  });

  it('should handle empty query parameter', () => {
    const page = 1;
    const pageSize = 5;

    service.getStories(page, pageSize).subscribe(stories => {
      expect(stories.length).toBe(2);
    });

    const req = httpMock.expectOne(request => 
      request.url === environment.apiBaseUrl &&
      request.params.get('page') === page.toString() &&
      request.params.get('pageSize') === pageSize.toString() &&
      request.params.get('query') === ''
    );

    expect(req.request.method).toBe('GET');
    req.flush(dummyStories);
  });

});