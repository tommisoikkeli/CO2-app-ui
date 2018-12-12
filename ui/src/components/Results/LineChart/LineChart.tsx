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
    const merged: LineDataType[] = d3.merge(data.map(d => d.entries));
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
    const xScale = d3.scaleLinear().rangeRound([0, width]);
    const yScale = d3.scaleLinear().rangeRound([height, 0]);
    const line = d3
      .line<LineDataType>()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value))
      .curve(d3.curveBasis);

    xScale.domain(d3.extent<LineDataType>(merged, d => d.date) as any);
    yScale.domain([0, d3.max<LineDataType>(merged, d => d.value) as any]);

    g.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.format('d')));

    g.append('g')
      .call(d3.axisLeft(yScale))
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.70em')
      .attr('text-anchor', 'end')
      .text('asdad');

    g.selectAll('.line')
      .data(data)
      .enter()
      .append('path')
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', (d: any) => line(d.entries));
  };

  public render() {
    return (
      <div className='results-line-chart'>
        <svg id='data-chart' />
      </div>
    );
  }
}
