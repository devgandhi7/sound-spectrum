import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Card } from "@/components/ui/card";
import { FilterState } from "@/pages/Index";
import { getPopularityDistribution } from "@/utils/mockData";

interface PopularityHistogramProps {
  filters: FilterState;
}

export const PopularityHistogram = ({ filters }: PopularityHistogramProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const data = getPopularityDistribution(filters);

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.bin))
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count) || 100])
      .range([height, 0]);

    // Color gradient based on popularity
    const colorScale = d3
      .scaleLinear<string>()
      .domain([0, data.length - 1])
      .range(["hsl(280 70% 60%)", "hsl(85 85% 60%)"]);

    // Axes
    const xAxis = d3.axisBottom(xScale).tickValues(
      xScale.domain().filter((d, i) => i % 2 === 0)
    );
    const yAxis = d3.axisLeft(yScale).ticks(6);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .attr("class", "text-muted-foreground text-xs");

    g.append("g")
      .call(yAxis)
      .attr("class", "text-muted-foreground");

    // Bars
    g.selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar cursor-pointer hover:brightness-110 transition-all")
      .attr("x", (d) => xScale(d.bin)!)
      .attr("width", xScale.bandwidth())
      .attr("y", height)
      .attr("height", 0)
      .attr("fill", (d, i) => colorScale(i))
      .attr("rx", 2)
      .on("mouseover", function (event, d) {
        const tooltip = d3
          .select("body")
          .append("div")
          .attr("class", "absolute bg-card border border-border rounded-lg p-3 shadow-lg text-sm pointer-events-none")
          .style("z-index", "1000")
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px")
          .html(`
            <div class="font-semibold text-foreground">Popularity: ${d.bin}</div>
            <div class="text-muted-foreground">${d.count} tracks</div>
          `);
      })
      .on("mouseout", function () {
        d3.selectAll("body > div").filter(function() {
          return d3.select(this).attr("class")?.includes("absolute bg-card");
        }).remove();
      })
      .transition()
      .duration(600)
      .delay((d, i) => i * 30)
      .attr("y", (d) => yScale(d.count))
      .attr("height", (d) => height - yScale(d.count));

    // Labels
    g.append("text")
      .attr("x", width / 2)
      .attr("y", height + 45)
      .attr("text-anchor", "middle")
      .attr("class", "fill-foreground text-sm font-medium")
      .text("Popularity Score");

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -45)
      .attr("text-anchor", "middle")
      .attr("class", "fill-foreground text-sm font-medium")
      .text("Track Count");
  }, [filters]);

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm shadow-card">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Popularity Distribution</h2>
        <p className="text-sm text-muted-foreground">
          How tracks are distributed across popularity scores
        </p>
      </div>
      <svg ref={svgRef} className="w-full" style={{ height: "450px" }} />
    </Card>
  );
};
