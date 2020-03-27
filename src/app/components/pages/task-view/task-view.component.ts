import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import IList from 'src/app/interfaces/IList';
import ITask from 'src/app/interfaces/ITask';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  lists: IList[] = [];
  tasks: ITask[] = [];
  selectedListId: string;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.taskService.getLists()
      .subscribe((lists: IList[]) => {
        this.lists = lists;
        console.log(lists);
      });
    this.activeRoute.params.subscribe((params: Params) => {
      if(params.listId){
        this.selectedListId = params.listId;
        this.taskService.getTasks(params.listId).subscribe((tasks: ITask[]) => this.tasks = tasks);
      } else {
        this.tasks = undefined;
      }
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
    this.taskService.createList('Testing').subscribe((res: any) => {
      console.log(res);
    },
      (error: any) => {
        console.log('hi');
      });
  }

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists']);
      //NO NEED TO FILTER AS WE ARE NAVIGATING
    },
    (error: any) => {
      console.log(error);
    });
  }

  onDeleteTaskClick(taskId: string) {
    this.taskService.deleteTask(this.selectedListId, taskId).subscribe((res: any) => {
      this.tasks = this.tasks.filter(task => task._id !== taskId);
    },
    (error: any) => {
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

  onLogoutButtonClick() {
    this.authService.logout();
  }
}
