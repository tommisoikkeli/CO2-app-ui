import * as React from 'react';
import * as d3 from 'd3';

interface ILineChartProps {
  data: IData[];
}

interface IData {
  country: string;
  indicator: string;
  entries: ILineDataType[];
}

// faced issues with types here, that's why both types are just "any"
interface ILineDataType {
  date: any;
  value: any;
}

export default class LineChart extends React.Component<ILineChartProps> {
  private desktopMargins = {
    top: 20,
    right: 110,
    bottom: 30,
    left: 80
  };

  private mobileMargins = {
    top: 20,
    right: 30,
    bottom: 30,
    left: 50
  };

  public componentDidMount() {
    this.drawChart(this.props.data);
    window.addEventListener('resize', this.resize);
  }

  public componentWillUnMount() {
    window.removeEventListener('resize', this.resize);
  }

  public componentDidUpdate() {
    // called when a country is removed from the chart
    // remove all content from the svg and draw it again with the updated data
    this.deleteChartContent();
    this.drawChart(this.props.data);
  }

  private deleteChartContent = (): void => {
    d3.select('#data-chart').select('*').remove();
  }

  private drawChart = (data: IData[]): void => {
    // all entries in one array, used in scatter plot generation
    const allEntries: ILineDataType[] = d3.merge(data.map(d => d.entries));
    const lineColors = d3.scaleOrdinal(d3.schemeCategory10).range();

    // size attributes
    const margins = window.innerWidth >= 768 ? this.desktopMargins : this.mobileMargins;
    const svgWidth = parseInt(d3.select('.results-line-chart').style('width'));
    const svgHeight = parseInt(
      d3.select('.results-line-chart').style('height')
    );
    const width = svgWidth - margins.left - margins.right;
    const height = svgHeight - margins.top - margins.bottom;

    // the main svg element
    const svg = d3
      .select('#data-chart')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${svgWidth}, ${svgHeight}`)
      .attr('preserveAspectRatio', 'xMinYMin');
    const g = svg
      .append('g')
      .attr('transform', `translate(${margins.left} ${margins.top})`);
    const xScale = d3.scaleLinear().rangeRound([0, width]);
    const yScale = d3.scaleLinear().rangeRound([height, 0]);

    // line generator
    const line = d3
      .line<ILineDataType>()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value));

    // get the value ranges from the data
    xScale.domain(d3.extent<ILineDataType>(allEntries, d => d.date) as any);
    yScale.domain([0, d3.max<ILineDataType>(allEntries, d => d.value) as any]);

    // x-axis
    g.append('g')
      .attr('transform', `translate(0, ${height})`)
      .attr('class', 'x-axis')
      .call(d3.axisBottom(xScale).tickFormat(d3.format('d')));

    // y-axis
    g.append('g')
      .call(d3.axisLeft(yScale))
      .append('text')
      .attr('class', 'y-axis')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.70em')
      .attr('text-anchor', 'end')
      .text(data[0].indicator);

    // line drawing from data
    g.selectAll('.line')
      .data(data)
      .enter()
      .append('path')
      .attr('class', 'line')
      .attr('stroke', (d, i) => lineColors[i])
      .attr('d', (d: IData) => line(d.entries));

    // label at the end of line
    if (window.innerWidth >= 768) {
      g.selectAll('.line-text')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'line-text')
        .attr(
          'transform',
          (d: IData) => `translate(${width}, ${yScale(d.entries[0].value)})`
        )
        .attr('fill', (d, i) => lineColors[i])
        .attr('x', 10)
        .attr('dy', '1em')
        .text((d: IData) => d.country);
    }

    // scatter plot generator with fancy hover effects
    g.selectAll('.dot')
      .data(allEntries)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('r', 3)
      .attr('cx', (d: ILineDataType) => xScale(d.date))
      .attr('cy', (d: ILineDataType) => yScale(d.value))
      .on('mouseover', function(d: ILineDataType) {
        // can't use arrow function here because of the need for "this"
        d3.select(this)
          .transition()
          .duration(30)
          .attr('r', 5);
        d3.select('.tooltip')
          .html(
            `<span>Year: ${d.date}</span><br/><span>Value: ${d.value.toFixed(
              3
            )}</span>`
          )
          .style('visibility', 'visible')
          .style('left', `${d3.event.pageX + 20}px`)
          .style('top', `${d3.event.pageY}px`);
      })
      .on('mouseout', function() {
        d3.select(this)
          .transition()
          .duration(30)
          .attr('r', 3);
        d3.select('.tooltip').style('visibility', 'hidden');
      });
  };

  private resize = () => {
    this.deleteChartContent();
    this.drawChart(this.props.data);
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
