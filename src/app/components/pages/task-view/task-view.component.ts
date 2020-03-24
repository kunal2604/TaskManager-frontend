import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import IList from 'src/app/interfaces/IList';
import ITask from 'src/app/interfaces/ITask';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  lists: IList[] = [];
  tasks: ITask[] = [];
  //listId: string;

  constructor(
    private taskService: TaskService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.taskService.getLists()
      .subscribe((lists: IList[]) => this.lists = lists);
    this.activeRoute.params.subscribe((params: Params) => {
      const listId = params.listId;
      if (!listId) return;
      this.taskService.getTasks(listId).subscribe((tasks: ITask[]) => this.tasks = tasks);
    });
  }

  onTaskClick(task: ITask) {
    this.taskService.toggleTaskComplete(task).subscribe(() => {
      task.completed = !task.completed;
    }, (error: any) => {
      console.log(error);
    });
  }

  createNewList() {
    this.taskService.createList('Testing').subscribe((response: any) => {
      console.log(response);
    },
      (error: any) => {
        console.log('hi');
      });
  }

  deleteList(list: IList) {
    this.taskService.deleteList(list._id).subscribe(() => {
      this.lists = this.lists.filter(lst => lst._id != list._id);
    },
    (error: any) => {
      console.log(error);
    });
  }

  deleteTask(task: ITask) {
    this.taskService.deleteTask(task._listId, task._id).subscribe((task: ITask) => {
      this.tasks = this.tasks.filter(t => t._id != task._id);
    }, (error: any) => {
      console.log(error);
    });
  }

  addTaskClick() {
    this.activeRoute.params.subscribe((params: Params) => {
      const listId = params.listId;
      if (!listId) {
      console.log('hi');
        alert("PLEASE select a List");
        return;
      }
      this.router.navigate(['./new-task', {}], {relativeTo: this.activeRoute});
    }, (error: any) => {
      console.log(error);
    });
    
  }
}
