import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Card } from "@/components/ui/card";
import { FilterState } from "@/pages/Index";
import { generateGenreTrendData } from "@/utils/mockData";

interface GenreTrendsProps {
  filters: FilterState;
}

export const GenreTrends = ({ filters }: GenreTrendsProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 40, right: 120, bottom: 60, left: 60 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const data = generateGenreTrendData();

    // Scales
    const xScale = d3
      .scaleLinear()
      .domain([1930, 2020])
      .range([0, width]);

    const yScale = d3.scaleLinear().domain([0, 1]).range([height, 0]);

    const colorScale = d3
      .scaleOrdinal()
      .domain(["Pop", "Rock", "Hip-Hop", "Jazz", "Electronic"])
      .range([
        "hsl(193 95% 58%)",
        "hsl(280 70% 60%)",
        "hsl(85 85% 60%)",
        "hsl(25 95% 60%)",
        "hsl(330 80% 65%)",
      ]);

    // Axes
    const xAxis = d3.axisBottom(xScale).tickFormat((d) => `${d}s`);
    const yAxis = d3.axisLeft(yScale).tickFormat((d) => `${(d * 100).toFixed(0)}%`);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .attr("class", "text-muted-foreground");

    g.append("g").call(yAxis).attr("class", "text-muted-foreground");

    // Line generator
    const line = d3
      .line<any>()
      .x((d) => xScale(d.decade))
      .y((d) => yScale(d.avgValence))
      .curve(d3.curveMonotoneX);

    // Draw lines
    const genres = Array.from(new Set(data.map((d) => d.genre)));

    genres.forEach((genre) => {
      const genreData = data.filter((d) => d.genre === genre);

      const path = g
        .append("path")
        .datum(genreData)
        .attr("fill", "none")
        .attr("stroke", colorScale(genre) as string)
        .attr("stroke-width", 3)
        .attr("d", line)
        .attr("opacity", 0.8)
        .attr("class", "hover:opacity-100 transition-opacity cursor-pointer");

      const totalLength = path.node()!.getTotalLength();

      path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);
    });

    // Legend
    const legend = g
      .append("g")
      .attr("transform", `translate(${width + 20}, 0)`);

    genres.forEach((genre, i) => {
      const legendRow = legend
        .append("g")
        .attr("transform", `translate(0, ${i * 25})`);

      legendRow
        .append("rect")
        .attr("width", 20)
        .attr("height", 3)
        .attr("fill", colorScale(genre) as string);

      legendRow
        .append("text")
        .attr("x", 30)
        .attr("y", 5)
        .attr("class", "fill-foreground text-sm")
        .text(genre);
    });

    // Title
    g.append("text")
      .attr("x", width / 2)
      .attr("y", -15)
      .attr("text-anchor", "middle")
      .attr("class", "fill-foreground text-base font-semibold")
      .text("Genre Evolution Over Time");
  }, [filters]);

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm shadow-card">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Genre Trends</h2>
        <p className="text-sm text-muted-foreground">
          How musical emotion has evolved across genres through the decades
        </p>
      </div>
      <svg ref={svgRef} className="w-full" style={{ height: "500px" }} />
    </Card>
  );
};
