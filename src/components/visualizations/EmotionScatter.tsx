import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Card } from "@/components/ui/card";
import { FilterState } from "@/pages/Index";
import { generateMockTrackData } from "@/utils/mockData";

interface EmotionScatterProps {
  filters: FilterState;
}

export const EmotionScatter = ({ filters }: EmotionScatterProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Generate mock data based on filters
    const data = generateMockTrackData(filters);

    // Scales
    const xScale = d3.scaleLinear().domain([0, 1]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 1]).range([height, 0]);

    // Color scale based on color mode
    const colorScale = d3
      .scaleSequential(d3.interpolateRainbow)
      .domain([0, 1]);

    // Axes
    const xAxis = d3.axisBottom(xScale).ticks(10);
    const yAxis = d3.axisLeft(yScale).ticks(10);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .attr("class", "text-muted-foreground");

    g.append("g").call(yAxis).attr("class", "text-muted-foreground");

    // Axis labels
    g.append("text")
      .attr("x", width / 2)
      .attr("y", height + 45)
      .attr("text-anchor", "middle")
      .attr("class", "fill-foreground text-sm font-medium")
      .text("Energy");

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -45)
      .attr("text-anchor", "middle")
      .attr("class", "fill-foreground text-sm font-medium")
      .text("Valence (Happiness)");

    // Tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "absolute hidden bg-card border border-border rounded-lg p-3 shadow-lg text-sm pointer-events-none")
      .style("z-index", "1000");

    // Plot points with animation
    g.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => xScale(d.energy))
      .attr("cy", (d) => yScale(d.valence))
      .attr("r", 0)
      .attr("fill", (d) => {
        const value =
          filters.colorMode === "danceability"
            ? d.danceability
            : filters.colorMode === "energy"
            ? d.energy
            : filters.colorMode === "acousticness"
            ? d.acousticness
            : d.year / 2020;
        return colorScale(value);
      })
      .attr("opacity", 0.7)
      .attr("class", "cursor-pointer transition-all hover:opacity-100")
      .on("mouseover", function (event, d) {
        d3.select(this).attr("r", 8);
        tooltip
          .html(
            `
            <div class="space-y-1">
              <div class="font-semibold text-foreground">${d.name}</div>
              <div class="text-muted-foreground">${d.artist}</div>
              <div class="grid grid-cols-2 gap-2 mt-2 text-xs">
                <div>Energy: ${(d.energy * 100).toFixed(0)}%</div>
                <div>Valence: ${(d.valence * 100).toFixed(0)}%</div>
                <div>Dance: ${(d.danceability * 100).toFixed(0)}%</div>
                <div>Year: ${d.year}</div>
              </div>
            </div>
          `
          )
          .classed("hidden", false)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).attr("r", 5);
        tooltip.classed("hidden", true);
      })
      .transition()
      .duration(800)
      .delay((d, i) => i * 2)
      .attr("r", 5);

    return () => {
      tooltip.remove();
    };
  }, [filters]);

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm shadow-card">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Emotion Landscape</h2>
        <p className="text-sm text-muted-foreground">
          Explore how energy and emotional valence intersect across tracks
        </p>
      </div>
      <svg ref={svgRef} className="w-full" style={{ height: "580px" }} />
    </Card>
  );
};
