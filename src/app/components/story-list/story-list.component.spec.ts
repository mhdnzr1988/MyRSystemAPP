import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryListComponent } from './story-list.component';
import { of } from 'rxjs';
import { StoryService } from '../../services/storyservice.service';

describe('StoryListComponent', () => {
  let component: StoryListComponent;
  let fixture: ComponentFixture<StoryListComponent>;
  let newsServiceSpy: jasmine.SpyObj<StoryService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoryListComponent]
    })
    .compileComponents();
    fixture = TestBed.createComponent(StoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    newsServiceSpy = TestBed.inject(StoryService) as jasmine.SpyObj<StoryService>; 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load stories on init', () => {
    const story = { id: 1, title: 'Hello', url: 'http://localhost:7184/api/Stories' };
    newsServiceSpy.getStories.and.returnValue(of([story]));  
    component.ngOnInit();  
    expect(component.stories.length).toBe(1);
  });
});
