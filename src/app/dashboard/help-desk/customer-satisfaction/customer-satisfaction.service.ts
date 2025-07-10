import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class CustomerSatisfactionService {

    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId: any) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    async loadChart(data: { status__name: string; total: number }[]): Promise<void> {
        if (this.isBrowser) {
            try {
                const ApexCharts = (await import('apexcharts')).default;

                const series = data.map(d => d.total);
                const labels = data.map(d => d.status__name);

                const options = {
                    series,
                    labels,
                    chart: {
                        type: "polarArea",
                        height: 365
                    },
                    stroke: {
                        width: 0,
                        colors: ["#ffffff"]
                    },
                    fill: {
                        opacity: 1
                    },
                    colors: [
                        "#3761EE", "#A9A9C8", "rgba(158,55,76,0.77)", "#5B5B98", "#DC9393", "#D2DC93"
                    ],
                    grid: {
                        show: true,
                        strokeDashArray: 0,
                        borderColor: "#f2f2f2"
                    },
                    legend: {
                        show: false,
                        position: 'top',
                        fontSize: '13px',
                        horizontalAlign: 'left',
                        labels: {
                            colors: '#77838f',
                        },
                        itemMargin: {
                            horizontal: 10,
                            vertical: 5
                        },
                        markers: {
                            offsetY: 1
                        }
                    }
                };

                const chart = new ApexCharts(
                    document.querySelector('#help_desk_customer_satisfaction_chart'),
                    options
                );
                chart.render();

            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }


}
