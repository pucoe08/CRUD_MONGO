import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// this space is to seperate above in build imports and below present local imports
import {EmployeeService} from '../shared/employee.service'

declare var M:any;

@Component({
  selector: 'app-employee',           // selector is used in app.component.html as a tag to render that component
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers :[EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { } //I have made public variable as error was there with private
                                                          //b

  ngOnInit(): void {
    //this.resetForm();
  }

  resetForm(form: NgForm){
    if(form)
    form.reset();
    this.employeeService.selectedEmployee={
      _id: "",
      name: "",
      position: "",
      office: "",
      salary: null
    }
  }
onSubmit(form: NgForm){
  console.log("I am in emp component");
 this.employeeService.postEmployee(form.value).subscribe((res)=>{
   this.resetForm(form);
   M.toast({html: 'Saved Successfully', classes:'rounded'})
  });
}
}
