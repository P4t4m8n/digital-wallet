import { Component, OnInit } from '@angular/core'
import { BitcoinService } from '../../services/bitcoinService'
import { MarketPrice } from '../../models/bitcoin.model'

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})

export class StatisticsComponent implements OnInit {

  constructor(private bitcoinService: BitcoinService) { }

  chartData: MarketPrice | null = null
  type: string = 'market-price'
  currChart: string = 'line-chart'

  ngOnInit() {
    this.loadData(this.type)
  }

  loadData(type: string) {
    this.bitcoinService.getData(type).subscribe(data => {
      this.chartData = data;
    })
  }

  onTypeChange(newType: string) {
    console.log("newType:", newType)
    this.loadData(newType);
  }
}