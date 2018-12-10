import * as React from 'react';
import * as d3 from 'd3';

interface ILineChartProps {
  data: any;
}

type LineDataType = {date: any; value: any};

export default class LineChart extends React.Component<ILineChartProps> {
  public componentDidMount() {
    this.drawChart(this.props.data);
  }

  private drawChart = data => {
    const svgWidth = 700;
    const svgHeight = 500;
    const margins = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 80
    };
    const width = svgWidth - margins.left - margins.right;
    const height = svgHeight - margins.top - margins.bottom;
    const svg = d3
      .select('#data-chart')
      .attr('width', svgWidth)
      .attr('height', svgHeight);
    const g = svg
      .append('g')
      .attr('transform', `translate(${margins.left}, ${margins.top})`);
    const x = d3.scaleLinear().rangeRound([0, width]);
    const y = d3.scaleLinear().rangeRound([height, 0]);
    const line = d3
      .line<LineDataType>()
      .x(d => x(d.date))
      .y(d => y(d.value));
    x.domain(d3.extent<LineDataType>(data, d => d.date) as any);
    y.domain(d3.extent<LineDataType>(data, d => d.value) as any);
    g.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.format('d')));

    g.append('g')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.70em')
      .attr('text-anchor', 'end')
      .text(this.getIndicatorText(data));

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 2)
      .attr('d', line);
  };

  private getIndicatorText = data => data[0].indicator.value;

  public render() {
    return (
      <div className='results-line-chart'>
        <svg id='data-chart' />
      </div>
    );
  }
}
