import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  listId: string;

  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      this.listId = params.listId;
    });
  }

  updateList(title: string) {
    this.taskService.updateList(this.listId, title).subscribe(() => {
       this.router.navigate(['/lists', this.listId]);
    })
  }
}
