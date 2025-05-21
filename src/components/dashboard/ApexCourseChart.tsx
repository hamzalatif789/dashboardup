
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const ApexCourseChart = () => {
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      },
      fontFamily: 'inherit',
      background: 'transparent'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    colors: ['#F97316'],
    grid: {
      borderColor: '#f1f1f1',
      row: {
        colors: ['transparent', 'transparent'],
        opacity: 0.5
      }
    },
    markers: {
      size: 6,
      colors: ['#fff'],
      strokeColors: '#F97316',
      strokeWidth: 3,
      hover: {
        size: 8
      }
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: {
        style: {
          colors: '#888'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Hours',
        style: {
          color: '#888'
        }
      },
      min: 0,
      max: 5,
      tickAmount: 5,
      labels: {
        style: {
          colors: '#888'
        }
      }
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: function(val) {
          return val + "h";
        }
      }
    },
    annotations: {
      points: [
        {
          x: 'Mon',
          y: 0,
          marker: {
            size: 6,
            fillColor: '#fff',
            strokeColor: '#F97316',
            strokeWidth: 2
          },
          label: {
            text: '0h',
            offsetY: 0,
            style: {
              color: '#777',
              background: 'transparent'
            }
          }
        },
        {
          x: 'Tue',
          y: 1.5,
          marker: {
            size: 6,
            fillColor: '#fff',
            strokeColor: '#F97316',
            strokeWidth: 2
          },
          label: {
            text: '1.5h',
            offsetY: 0, 
            style: {
              color: '#777',
              background: 'transparent'
            }
          }
        },
        {
          x: 'Wed',
          y: 2.5,
          marker: {
            size: 6,
            fillColor: '#fff',
            strokeColor: '#F97316',
            strokeWidth: 2
          },
          label: {
            text: '2.5h',
            offsetY: 0,
            style: {
              color: '#777',
              background: 'transparent'
            }
          }
        },
        {
          x: 'Thu',
          y: 4,
          marker: {
            size: 6,
            fillColor: '#fff',
            strokeColor: '#F97316',
            strokeWidth: 2
          },
          label: {
            text: '4h',
            offsetY: 0,
            style: {
              color: '#777',
              background: 'transparent'
            }
          }
        },
        {
          x: 'Fri',
          y: 3,
          marker: {
            size: 6,
            fillColor: '#fff',
            strokeColor: '#F97316',
            strokeWidth: 2
          },
          label: {
            text: '3h',
            offsetY: 0,
            style: {
              color: '#777',
              background: 'transparent'
            }
          }
        },
        {
          x: 'Sat',
          y: 2,
          marker: {
            size: 6,
            fillColor: '#fff',
            strokeColor: '#F97316',
            strokeWidth: 2
          },
          label: {
            text: '2h',
            offsetY: 0,
            style: {
              color: '#777',
              background: 'transparent'
            }
          }
        }
      ]
    }
  });
  
  const [series, setSeries] = useState([
    {
      name: "Learning Hours",
      data: [0, 1.5, 2.5, 4, 3, 2, 1]
    }
  ]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-80 flex items-center justify-center">Loading chart...</div>;
  
  return (
    <div className="apex-charts">
      <ReactApexChart 
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default ApexCourseChart;
