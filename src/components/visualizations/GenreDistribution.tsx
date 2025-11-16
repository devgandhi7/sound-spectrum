import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Card } from "@/components/ui/card";
import { FilterState } from "@/pages/Index";
import { getGenreDistribution } from "@/utils/mockData";

interface GenreDistributionProps {
  filters: FilterState;
}

export const GenreDistribution = ({ filters }: GenreDistributionProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 40, right: 40, bottom: 80, left: 60 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const data = getGenreDistribution(filters);

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.genre))
      .range([0, width])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count) || 100])
      .range([height, 0]);

    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.genre))
      .range([
        "hsl(193 95% 58%)",
        "hsl(280 70% 60%)",
        "hsl(85 85% 60%)",
        "hsl(25 95% 60%)",
        "hsl(330 80% 65%)",
        "hsl(200 80% 60%)",
        "hsl(150 70% 55%)",
        "hsl(45 90% 60%)",
      ]);

    // Axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).ticks(8);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end")
      .attr("class", "text-muted-foreground text-xs");

    g.append("g")
      .call(yAxis)
      .attr("class", "text-muted-foreground");

    // Bars with animation
    g.selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar cursor-pointer hover:opacity-80 transition-opacity")
      .attr("x", (d) => xScale(d.genre)!)
      .attr("width", xScale.bandwidth())
      .attr("y", height)
      .attr("height", 0)
      .attr("fill", (d) => colorScale(d.genre) as string)
      .attr("rx", 4)
      .on("mouseover", function (event, d) {
        d3.select(this).attr("opacity", 0.8);
        
        // Tooltip
        const tooltip = d3
          .select("body")
          .append("div")
          .attr("class", "absolute bg-card border border-border rounded-lg p-3 shadow-lg text-sm pointer-events-none")
          .style("z-index", "1000")
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px")
          .html(`
            <div class="font-semibold text-foreground">${d.genre}</div>
            <div class="text-muted-foreground">${d.count} tracks</div>
            <div class="text-xs text-accent mt-1">${((d.count / d3.sum(data, d => d.count)) * 100).toFixed(1)}% of total</div>
          `);
        
        d3.select(this).attr("data-tooltip", "true");
      })
      .on("mouseout", function () {
        d3.select(this).attr("opacity", 1);
        d3.selectAll("body > div").filter(function() {
          return d3.select(this).attr("class")?.includes("absolute bg-card");
        }).remove();
      })
      .transition()
      .duration(800)
      .delay((d, i) => i * 50)
      .attr("y", (d) => yScale(d.count))
      .attr("height", (d) => height - yScale(d.count));

    // Y-axis label
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -45)
      .attr("text-anchor", "middle")
      .attr("class", "fill-foreground text-sm font-medium")
      .text("Track Count");

    // Title
    g.append("text")
      .attr("x", width / 2)
      .attr("y", -15)
      .attr("text-anchor", "middle")
      .attr("class", "fill-foreground text-base font-semibold")
      .text(`Genre Distribution - ${filters.decade}s`);
  }, [filters]);

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm shadow-card">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Genre Distribution</h2>
        <p className="text-sm text-muted-foreground">
          Track count across musical genres for selected filters
        </p>
      </div>
      <svg ref={svgRef} className="w-full" style={{ height: "500px" }} />
    </Card>
  );
};
