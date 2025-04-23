import { Component, OnInit, ViewChild } from "@angular/core";
import{RSystemServiceService} from '../../services/rsystem-service.service';
import { Story } from "../../models/story";
import { CommonModule } from '@angular/common'; // ✅ Import this
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';


// components/story-list/story-list.component.ts
@Component({
  selector: 'app-story-list',
  standalone: true,
  templateUrl: './story-list.component.html',
  imports: [CommonModule, FormsModule,MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule],
  providers:[RSystemServiceService],
})
export class StoryListComponent implements OnInit {
  stories: Story[] = [];
  stories1: any;
  query = '';
  page = 1;
  pageSize = 20;
  displayedColumns: string[] = ['index', 'title', 'url'];
  dataSource = new MatTableDataSource(this.stories);

  constructor(private hnService: RSystemServiceService) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.loadStories();
  }
  loadStories() {
    console.log("Before fetch: this.stories = ", this.stories);
    //alert(" page no: "+this.page+ " page size: "+ this.pageSize);
    this.hnService.getStories(this.page, this.pageSize, this.query)
      .subscribe(stories => {
        this.stories = stories;
        this.dataSource = new MatTableDataSource(this.stories);
        console.log("After fetch: this.dataSource = ", this.dataSource);
      });
  }

  search() {
    this.page = 1;
    this.loadStories();
  }

  nextPage() {
     //alert(" page no: "+this.page+ " page size: "+ this.pageSize);
    this.page++;
    this.loadStories();
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadStories();
    }
  }
}
