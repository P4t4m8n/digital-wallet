import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js'
import Annotation from 'chartjs-plugin-annotation'
import { BaseChartDirective } from 'ng2-charts'


@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent {
  @Input() chartData: any

  constructor() {
    Chart.register(Annotation)
  }

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },

    scales: {
      y: {
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgb(235, 244, 251)'

        },
        ticks: {
          color: 'black',
        },
      },
    },

    plugins: {
      legend: { display: true },

      annotation: {

      },
    },
  }

  public lineChartType: ChartType = 'line'

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent
    active?: object[]
  }): void {
    // console.log(event, active)
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent
    active?: object[]
  }): void {
    // console.log(event, active)
  }

  public hideOne(): void {
    const isHidden = this.chart?.isDatasetHidden(1)
    this.chart?.hideDataset(1, !isHidden)
  }

  public changeBorderColor(target: any): void {
    this.chartData.datasets[0].borderColor = target.value

    this.chart?.update()
  }
  
  public changeBackgroundColor(target: any): void {

    this.chartData.datasets[0].backgroundColor = target.value

    this.chart?.update()
  }

}
