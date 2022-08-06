import {Component, Output, EventEmitter, Input} from '@angular/core';
import { Performance } from 'src/app/models/performance.model';
import {PerformanceService} from "../../../services/performance.service";
import {AuthGuard} from "../../../guards/auth.guard"
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent {

  errorMessage: string = "";

  a: any ;

  router_deneme : any;

  @Input() performance: Performance = new Performance();
  @Output() save = new EventEmitter<any>();
  constructor(private performanceService: PerformanceService,public authGuard: AuthGuard,public router: Router) { 
  this.a = this.authGuard.currentUser.id?.toString()

  this.router_deneme = this.router.url

  console.log("12111111111111111111",this.a)

  }


  savePerformance() {
    console.log(this.performance)
    this.performanceService.savePerformance(this.performance).subscribe(
      (data) => 
      this.save.emit((data))
    )
    $('#performanceModal').modal('hide');
  }

  updatePerformance() {
    this.performanceService.updatePerformance(this.performance).subscribe(
      (data) => 
      this.save.emit((data))
    )
    $('#updatePerformanceModal').modal('hide');
  }

  showPerformanceModal() {
    $('#performanceModal').modal('show');
  }
  hidePerformanceModal() {
    $('#performanceModal').modal('hide');
  }

  showUpdatePerformanceModal() {
    $('#updatePerformanceModal').modal('show');
  }
  hideUpdatePerformanceModal() {
    $('#updatePerformanceModal').modal('hide');
  }
}
