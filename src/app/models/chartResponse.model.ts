export interface ChartResponse {
    status: string;
    name: string;
    unit: string;
    period: string;
    description: string;
    values: Array<{ x: number; y: number }>;
  }