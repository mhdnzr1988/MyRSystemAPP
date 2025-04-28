import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryListComponent } from './story-list.component';
import { of } from 'rxjs';
import { StoryService } from '../../services/storyservice.service';
import { MatTableModule } from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing'; // if you use router

// Mock StoryService
class MockStoryService {
  getStories(page: number, pageSize: number, query: string) {
    return of([
      { title: 'Story 1', url: 'http://story1.com' },
      { title: 'Story 2', url: 'http://story2.com' }
    ]);
  }
}


describe('StoryListComponent', () => {
  let component: StoryListComponent;
  let fixture: ComponentFixture<StoryListComponent>;
  let storyService: StoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoryListComponent, // Add your standalone component here
        HttpClientTestingModule, // Add HttpClientTestingModule for HTTP mocks
      ],
    }).compileComponents();
  });

  
  it('should load stories and set dataSource', () => {
    const fixture = TestBed.createComponent(StoryListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
    // Add more assertions as needed
  });
});
