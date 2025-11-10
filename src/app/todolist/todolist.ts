import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";

@Component({
  selector: 'app-todolist',
  imports: [FormsModule, CommonModule],
  templateUrl: './todolist.html',
  styleUrl: './todolist.css',
})
export class Todolist {
  // taskArray = [{taskName: 'Brush teeth', isComplete: false}]

  count = signal<number>(0);
  completedCount = signal<number>(0)

  taskArray: Array<{taskName:string; isComplete: boolean; isEditable: boolean}>= [];

  onSubmit(form: NgForm) {
    console.log(form);

    this.taskArray.push({
      taskName: form.controls['task'].value,
      isComplete:false, isEditable: false
    })

    this.updateCount();

    form.reset();
  }

  updateCount() {
    let arrayLength = this.taskArray.length;
    this.count.set(arrayLength);
    this.updateCompletedCount();
  }

  
  updateCompletedCount() {
    const completed = this.taskArray.filter(task => task.isComplete).length;
    this.completedCount.set(completed);
  }

  onDelete(index: number) {
    const wasCompleted = this.taskArray[index].isComplete;
    this.taskArray.splice(index, 1);

    this.updateCount();
    if (wasCompleted) {
      this.updateCompletedCount();
    }

  }

  onCheck(index: number) {
    console.log(this.taskArray);

    this.taskArray[index].isComplete = !this.taskArray[index].isComplete;
    this.updateCompletedCount();
  }

  onEdit(index: number) {
    this.taskArray[index].isEditable = true;
  }

  onSave(index: number, newtask: string) {
    this.taskArray[index].taskName = newtask;
    this.taskArray[index].isEditable = false;
    
  }
}



