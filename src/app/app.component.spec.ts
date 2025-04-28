import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent, // standalone component goes here
        HttpClientTestingModule, // HTTP mocks
      ],
    }).compileComponents();
  });

  it('should have the "MyRsystemAPP" title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('MyRsystemAPP');
  });
});
