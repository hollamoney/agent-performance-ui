import { Component, OnInit, ViewChild } from '@angular/core';
import { Performance } from 'src/app/models/performance.model';
import { PerformanceComponent } from '../performance/performance.component';
import {PerformanceService} from "../../../services/performance.service";
import { environment } from 'src/environments/environment';

import {AuthGuard} from "../../../guards/auth.guard"

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  performanceList: Array<Performance> = [];
  selectedPerformance: Performance = new Performance();
  errorMessage: string = "";

  startDate: any ;

  endDate: any ;

  start: string = "31622400000";

  end: string = "3060892800000";

  filterTerm!: string;

  fileName= 'Performans';

  toggleButton : boolean = true;

  exportToExcel() : void{
    let date = new Date();
    
    let element = document.getElementById('excel-table');
    
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName + date.toString() + '.xlsx' );
  }

  printDate() {
    this.start = new Date(this.startDate).getTime().toString()
    this.end = new Date(this.endDate).getTime().toString()
    console.log("starttttttttttttttt",this.startDate)
    console.log("end",this.endDate)

    console.log(this.start)
    console.log(this.end)
    
  }
  
  
  setDate(date: any, e: any) {

    if(this.toggleButton==true)    {
    date === "start" ? (this.startDate = e) : (this.endDate = e);
    this.printDate();
    }
  }

  @ViewChild(PerformanceComponent) child: PerformanceComponent | undefined;
   
  constructor(private performanceService: PerformanceService,private authGuard: AuthGuard) { }

  ngOnInit(): void {

      
    
      this.performanceService.getAllPerformances().subscribe(data => {
      this.performanceList = data;
      console.log("data");
    });
  }

  filter(){
    {
      this.toggleButton = false;
      console.log(this.toggleButton);
      const API_URL = `${environment.BASE_URL}/performance`;
      const FILTER_API_URL = API_URL + "/date";
      let url = new URL(FILTER_API_URL)
        console.log("eeeeeeeeeeeeeeeeheeeeeeeeeeeeeey", this.startDate);
        let params = new URLSearchParams(url.search);
        let strId = this.authGuard.currentUser.id?.toString();
        params.append("first", this.start);
        params.append("second",this.end);
        console.log("GARIBIBIBIBIBIB",params.toString());
        this.performanceService.getUserPerformanceWithFilter(params.toString()).subscribe(data => {
        this.performanceList = data;
        console.log("data");
      });
    }
    

  }

  cleanFilter() {

    this.start = "31622400000";

    this.end = "3060892800000";

    this.filter();

    this.toggleButton = true;

  }

  
  
  createPerformanceRequest() {
    this.selectedPerformance = new Performance();
    this.child?.showPerformanceModal();
  }

  editPerformanceRequest(item: Performance) {
    console.log(this.start);
    console.log(this.end);
    this.selectedPerformance = Object.assign({}, item);
    console.log("seçilmiş kişi ",this.selectedPerformance);
    this.child?.showUpdatePerformanceModal();
  }

  savePerformanceWatcher(performance: Performance) {

    this.performanceService.getAllPerformances().subscribe(data => {
      this.performanceList = data;
      console.log("performanceList",this.performanceList);
    });

    console.log("her türlü gönderiliyor.")

    

    let itemIndex = this.performanceList.findIndex(item => item.id === this.selectedPerformance.id);
    if (itemIndex !== -1) {
      console.log(itemIndex);
      this.performanceList[itemIndex] = this.selectedPerformance;
    } else {
      this.performanceList.push(this.selectedPerformance);
    }
  }

  deletePerformance(item: Performance, ind: number) {
    this.performanceService.deletePerformance(item).subscribe({
      next: (data) => this.performanceList.splice(ind,1),
      error: (err) => this.errorMessage = err 
    })
  }
  

}

