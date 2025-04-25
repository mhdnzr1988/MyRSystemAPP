import { Component, OnInit, ViewChild } from "@angular/core";
import{StoryService} from '../../services/storyservice.service';
import { Story } from "../../models/story";
import { CommonModule } from '@angular/common'; 
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
  providers:[StoryService],
})
export class StoryListComponent implements OnInit {
  stories: Story[] = [];
  stories1: any;
  query = '';
  page = 1;
  pageSize = 200;
  pageInput: number | null = null;
  totalPages: number = 0;
  displayedColumns: string[] = ['index', 'title', 'url'];
  dataSource = new MatTableDataSource(this.stories);

  constructor(private hnService: StoryService) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // Calculate total pages when data or page size changes
    this.dataSource.paginator?.page.subscribe(() => {
      this.updateTotalPages();
    });
    this.updateTotalPages();
  }
  // Calculate total pages
  updateTotalPages() {
    this.totalPages = Math.ceil(this.dataSource.data.length / (this.paginator?.pageSize || 10));
  }
  // Navigate to a specific page
  goToPage() {
    if (this.pageInput && this.paginator) {
      const page = Math.max(1, Math.min(this.pageInput, this.totalPages)) - 1; // Convert to 0-based index
      this.paginator.pageIndex = page;
      this.paginator.page.next({
        pageIndex: page,
        pageSize: this.paginator.pageSize,
        length: this.paginator.length
      });
      this.pageInput = null; // Clear input
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.loadStories();
  }
  loadStories() {
    this.hnService.getStories(this.page, this.pageSize, this.query)
      .subscribe(stories => {
        this.stories = stories;
        this.dataSource = new MatTableDataSource(this.stories);
      });
  }

  search() {
    this.page = 1;
    this.loadStories();
  }

  nextPage() {
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
