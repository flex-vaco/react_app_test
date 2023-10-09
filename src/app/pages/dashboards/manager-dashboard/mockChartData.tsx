export const chartDataMonth = { // to be fetched dynamically from backend-api
    options: {
      chart: {
        id: "test-chart",
        background: '#fff',
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      theme: {
        palette: 'palette3', // upto palette10
      },
    },
    series: [
      {
        name: "series-1",
        data: [10, 18, 25, 30, 32, 47, 52, 56, 61, 67, 73, 98]
      },
      {
        name: "series-2",
        data: [22, 20, 35, 40, 59, 60, 72, 85, 94, 60, 70, 91]
      }
    ],
    animations: {
      enabled: true,
      easing: 'linear',
      speed: 800,
      animateGradually: {
          enabled: true,
          delay: 2450
      },
      dynamicAnimation: {
          enabled: true,
          speed: 1350
      }
    }

  };

  export const chartDataWeek = { // to be fetched dynamically from backend-api
    options: {
      chart: {
        id: "test-chart1",
        background: '#fff',
      },
      xaxis: {
        categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      },
      theme: {
        palette: 'palette1', // upto palette10
      },
    },
    series: [
      {
        name: "series-1",
        data: [3, 12, 32, 45, 19, 30, 50]
      },
      {
        name: "series-2",
        data: [21, 20, 45,50, 85, 77, 82]
      }
    ],
    animations: {
      enabled: true,
      easing: 'linear',
      speed: 800,
      animateGradually: {
          enabled: true,
          delay: 2450
      },
      dynamicAnimation: {
          enabled: true,
          speed: 1350
      }
    }

  };
  export const chartDataYear = { // to be fetched dynamically from backend-api
    options: {
      chart: {
        id: "test-chart2",
        background: '#fff',
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      },
      theme: {
        palette: 'palette6', // upto palette10
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      },
      {
        name: "series-2",
        data: [12, 20, 55, 60, 59, 70, 82, 95]
      }
    ],
    animations: {
      enabled: true,
      easing: 'linear',
      speed: 800,
      animateGradually: {
          enabled: true,
          delay: 2450
      },
      dynamicAnimation: {
          enabled: true,
          speed: 1350
      }
    }

  };