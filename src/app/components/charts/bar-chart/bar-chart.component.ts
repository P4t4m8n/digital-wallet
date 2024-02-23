
import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js'
import { BaseChartDirective } from 'ng2-charts'

import DataLabelsPlugin from 'chartjs-plugin-datalabels'


@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined
  @Input() chartData: any

  currentPageData: any
  currentPage: number = 1
  itemsPerPage: number = 10
  totalPages!: number

  ngOnInit(): void {
    this.totalPages = Math.ceil(this.chartData.datasets[0].data.length / this.itemsPerPage) -1
    this.currentPage = this.totalPages 
    this.updateCurrentPageData()
  }


  updateCurrentPageData(): void {

    const startIndex = (this.currentPage - 1) * this.itemsPerPage + 1
    const endIndex = startIndex + this.itemsPerPage

    this.currentPageData = { ...this.chartData }
    this.currentPageData.datasets = this.chartData.datasets.map((dataset: { data: string | Array<string> }) => ({
      ...dataset,
      data: dataset.data.slice(startIndex, endIndex)
    }))
    this.currentPageData.labels = this.chartData.labels.slice(startIndex, endIndex)


    this.chart?.update()
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      console.log("this.totalPages:", this.totalPages)
      console.log("   this.currentPage:", this.currentPage)
      this.currentPage++
      this.updateCurrentPageData()
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--
      this.updateCurrentPageData()
    }
  }

  public barChartOptions: ChartConfiguration['options'] = {
    scales: {
      x: {},
      y: {
        min: 0,
        max: 100000
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {

        anchor: 'end',
        align: 'end',
      },
    },
  }

  public barChartType: ChartType = 'bar'
  public barChartPlugins = [DataLabelsPlugin]


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


}
