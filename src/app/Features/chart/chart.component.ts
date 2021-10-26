import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, ChartDataSets } from 'chart.js';
import { SocketService } from '../../Core/_providers/socket-service/socket.service';


import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  title = 'sales';
  chart;
  
  
  TrendDetails: any;
  public chartData: Array<number>;
  myArray:any;

  constructor( public dialogRef: MatDialogRef<ChartComponent>, private route: ActivatedRoute, private srv: SocketService ) { }

  ngOnInit(): void {
    this.srv.listen('dataupdate').subscribe((res: any) => {
      console.log('data', res);
      this.chart.data.datasets[0].data = res;
      this.chart.update();
    });
    this.TrendDetails = localStorage.getItem('TrendInfo');
    this.myArray = this.TrendDetails.split(',');
   
    this.chart = new Chart('canvas', {
      type: 'line',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Trends Chart',
        },
      },
      data: {
        labels: [
          'Mar 20',
          'Apr 20',
          'May 20',
          'Jun 20',
          'Jul 20',
          'Aug 20',
          'Sep 20',
          'Oct 20',
          'Nov 20',
          'Dec 20',
          'Jan 21',
          'Feb 21',
        ],
        datasets: [
          {
            type: 'line',
            label: 'Trends',
            data: this.myArray,
            // backgroundColor: '#3F3FBF',
            fill: false,
            // backgroundColor: 'rgb(255, 99, 132)',
            // borderColor: 'rgb(0, 99, 132)',
            borderColor: '#00a453',
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            // borderColor: 'rgb(255, 99, 132)',
           
            // backgroundColor: 'rgba(255, 99, 132, 0.2)',
            // borderColor: 'rgba(0,128,0,.678)',
            borderDash: [2],
            // borderDash: [10, 5, 3],
            borderWidth: 2,
            // fill: "end",
            // fill: "start",
            pointRadius: 10,
            pointStyle: 'star',
            // lineTension: 0.4,
            // pointBackgroundColor: 'red',
             //pointBackgroundColor: ['red', 'blue', 'black', 'yellow', 'green', 'purple', 'orange'],
          },
        ],
      },
    });
  }
 
  closeDialog(): void {
    this.dialogRef.close();
  }
}
