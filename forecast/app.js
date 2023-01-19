function get_data() {
  fetch("forcaster.json")
    .then(required => required.json())
    .then(data => {
      let gas = [];
      let liquid = [];
      let elecricity = [];
      let solid = [];
      let year = [];
      let month = [];
      let a = 0;

      for (let d in data) {
        if (!year.includes(data[d]["Year"])) {
          year.push(data[d]["Year"])
          document.getElementById('years').innerHTML +=
            `<option value="${year[a]}"> ${year[a]}`
          a++;
          continue;
        }
      }
      for (y in year) {
        gas.push(parseFloat(data[y]["Gas"].toFixed(1)));
        solid.push(parseFloat(data[y]["Solid_fuels"].toFixed(1)))
        elecricity.push(parseFloat(data[y]["Electricity"].toFixed(1)))
        liquid.push(parseFloat(data[y]["Liquid_fuels"].toFixed(1)))
        if (data[y]['Year'] > 1996)
          break;
      }

      Highcharts.chart('container', {
        chart: {
          type: 'line'
        },
        title: {
          text: 'Historical Data'
        },
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true
            },
            enableMouseTracking: false
          }
        },
        series: [{
          name: 'solid',
          data: solid
        },
        {
          name: 'liquid',
          data: liquid
        },
        {
          name: 'elecricity',
          data: elecricity
        }, {
          name: 'gas',
          data: gas
        }]
      });
    })
}

function get_data_by_year() {
  fetch("forcaster.json")
    .then(required => required.json())
    .then(data => {
      let gas = [];
      let liquid = [];
      let elecricity = [];
      let solid = [];
      let year = [];
      let month = [];

      let years = document.getElementById('years').value;

      for (d in data) {
        if (data[d]['Year'] == years) {
          gas.push(parseFloat(data[d]["Gas"].toFixed(1)));
          solid.push(parseFloat(data[d]["Solid_fuels"].toFixed(1)))
          elecricity.push(parseFloat(data[d]["Electricity"].toFixed(1)))
          liquid.push(parseFloat(data[d]["Liquid_fuels"].toFixed(1)))
        }

        // if (data[y]['Year'] > 1996)
        //   break;
      }

      Highcharts.chart('container', {
        chart: {
          type: 'line'
        },
        title: {
          text: 'Monthly Average Prices'
        },
        subtitle: {
          
        },
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
          title: {
            text: 'Prices'
          }
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true
            },
            enableMouseTracking: false
          }
        },
        series: [{
          name: 'solid',
          data: solid
        },
        {
          name: 'liquid',
          data: liquid
        },
        {
          name: 'elecricity',
          data: elecricity
        }, {
          name: 'gas',
          data: gas
        }]
      });
    })
}