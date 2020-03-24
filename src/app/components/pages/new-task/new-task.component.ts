import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import ITask from 'src/app/interfaces/ITask';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(
    private taskService: TaskService, 
    private router: Router,
    private activeRoute: ActivatedRoute
    ) { }

    private listId: string;

  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      this.listId = params['listId'];
      console.log(this.listId);
    });
  }

  createTask(title: string){
    this.taskService.createTask(title, this.listId).subscribe((task: ITask) => {
      this.router.navigate(['../', {}], {relativeTo: this.activeRoute});
    });
  }

}
