import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Params, Router } from '@angular/router';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskService: TaskService, private route: Router) { }

  ngOnInit() {
  }

  createList(title: string) {
    this.taskService.createList(title).subscribe((response: any) => {
      console.log(response);
      this.route.navigate(['/lists', response._id]);
    });
  }

}
