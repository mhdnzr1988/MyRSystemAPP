import { Component } from '@angular/core';
import { StoryListComponent } from "./components/story-list/story-list.component";

import { HttpClientTestingModule } from '@angular/common/http/testing';
@Component({
  selector: 'app-root',
  standalone:true,
  imports: [ StoryListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MyRsystemAPP';
}
