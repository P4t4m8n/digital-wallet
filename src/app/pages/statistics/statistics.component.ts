import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core'
import { BitcoinService } from '../../services/bitcoinService'
import { MarketPrice } from '../../models/bitcoin.model'
import { LineChartComponent } from '../../components/charts/line-chart/line-chart.component'
import { BarChartComponent } from '../../components/charts/bar-chart/bar-chart.component'

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})

export class StatisticsComponent implements OnInit {

  constructor(private bitcoinService: BitcoinService) { }

  @ViewChild('chartContainer', { read: ViewContainerRef }) chartContainerRef!: ViewContainerRef
  chartData: MarketPrice | null = null
  type: string = 'market-price'
  currChart: string = 'line-chart'

  ngOnInit() {
    this.loadData(this.type)
  }

  loadData(type: string) {
    this.bitcoinService.getData(type).subscribe(data => {
      this.chartData = data
      this.loadComponent()
    })
  }

  loadComponent() {
    console.log("this.currChart :", this.currChart )
    this.chartContainerRef.clear()
    const componentRef = this.currChart === 'line-chart' ?
      this.chartContainerRef.createComponent(LineChartComponent) :
      this.chartContainerRef.createComponent(BarChartComponent)

    componentRef.instance.chartData = this.chartData
  }

  onTypeChange(newType: string) {
    this.loadData(newType)
  }
}