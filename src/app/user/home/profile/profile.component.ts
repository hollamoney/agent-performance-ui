import { Component, OnInit, ViewChild , Input} from '@angular/core';
import { Performance } from 'src/app/models/performance.model';
import { PerformanceComponent } from '../performance/performance.component';
import {PerformanceService} from "../../../services/performance.service";
import {AuthGuard} from "../../../guards/auth.guard"
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  performanceList: Array<Performance> = [];
  selectedPerformance: Performance = new Performance();
  errorMessage: string = "";
   a: any ; 

  @ViewChild(PerformanceComponent) child: PerformanceComponent | undefined;
   
  constructor(private performanceService: PerformanceService,public authGuard: AuthGuard,public router: Router) { 
    this.a = this.authGuard.currentUser.id?.toString()
  
    console.log("12111111111111111111",this.a)
  
    }

  ngOnInit(): void {
    console.log(this.router.url)
    this.performanceService.getUserPerformances().subscribe(data => {
      this.performanceList = data;
      console.log("data");
    });
  }

  createPerformanceRequest() {
    this.selectedPerformance = new Performance();
    this.selectedPerformance.userId = this.a
    this.child?.showPerformanceModal();
  }

  editPerformanceRequest(item: Performance) {
    this.selectedPerformance = Object.assign({}, item);
    console.log("seçilmiş kişi ",this.selectedPerformance);
    this.child?.showUpdatePerformanceModal();
  }

  savePerformanceWatcher(performance: Performance) {
  
    console.log("aaaaaaaaaaaaaaa",this.a)
    this.selectedPerformance.userId = this.a

    console.log("performanceeee",this.selectedPerformance)

    this.performanceService.getUserPerformances().subscribe(data => {
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

  
