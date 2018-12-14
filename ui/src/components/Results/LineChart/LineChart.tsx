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
    const lineColors = d3.scaleOrdinal(d3.schemeCategory10).range();

    const svgWidth = 800;
    const svgHeight = 550;
    const margins = {
      top: 20,
      right: 100,
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
      .y(d => yScale(d.value));

    xScale.domain(d3.extent<LineDataType>(merged, d => d.date) as any);
    yScale.domain([0, d3.max<LineDataType>(merged, d => d.value) as any]);

    g.append('g')
      .attr('transform', `translate(0, ${height})`)
      .attr('class', 'axis')
      .call(d3.axisBottom(xScale).tickFormat(d3.format('d')));

    g.append('g')
      .call(d3.axisLeft(yScale))
      .append('text')
      .attr('class', 'axis')
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
      .attr('stroke', (d, i) => lineColors[i])
      .attr('d', (d: any) => line(d.entries));

    g.selectAll('.line-text')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'line-text')
      .attr('transform', (d: any) => `translate(${width}, ${yScale(d.entries[0].value)})`)
      .attr('fill', (d, i) => lineColors[i])
      .attr('x', 10)
      .attr('dy', '1em')
      .text((d: any) => d.key);

    g.selectAll('.dot')
      .data(merged)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('r', 3)
      .attr('cx', (d: any) => xScale(d.date))
      .attr('cy', (d: any) => yScale(d.value))
      .on('mouseover', function(d) {
        d3.select(this)
          .transition()
          .duration(30)
          .attr('r', 5);
        d3.select('.tooltip')
          .html(
            `<span>Year: ${d.date}</span><br/><span>Value: ${d.value}</span>`
          )
          .transition()
          .duration(30)
          .style('opacity', 1)
          .style('left', `${d3.event.pageX - 10}px`)
          .style('top', `${d3.event.pageY + 10}px`);
      })
      .on('mouseout', function() {
        d3.select(this)
          .transition()
          .duration(30)
          .attr('r', 3);
        d3.select('.tooltip')
          .transition()
          .duration(30)
          .style('opacity', 0);
      });
  };

  public render() {
    return (
      <div className='results-line-chart'>
        <svg id='data-chart' />
        <div className='tooltip' />
      </div>
    );
  }
}
