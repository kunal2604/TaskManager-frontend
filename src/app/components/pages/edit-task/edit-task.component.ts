import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  taskId: string;
  listId: string;

  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      this.taskId = params.taskId;
      this.listId = params.listId;
    });
  }

  updateTask(title: string) {
    this.taskService.updateTask(this.listId, this.taskId, title).subscribe(() => {
       this.router.navigate(['/lists', this.listId]);
    })
  }
}
