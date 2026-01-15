// Top 10 most frequent requests from Boston 311 data
const data = [
    { reason: "Enforcement & Abandoned Vehicles", count: 65349 },
    { reason: "Code Enforcement", count: 39737 },
    { reason: "Street Cleaning", count: 48702 },
    { reason: "Highway Maintenance", count: 23665 },
    { reason: "Signs & Signals", count: 12925 },
    { reason: "Recycling", count: 11306 },
    { reason: "Needle Program", count: 11687 },
    { reason: "Sanitation", count: 10198 },
    { reason: "Housing", count: 7398 },
    { reason: "Park Maintenance & Safety", count: 7121 }
];

// Sort by count descending to ensure top 10 order
data.sort((a, b) => b.count - a.count);

// Set dimensions
const margin = { top: 20, right: 60, bottom: 30, left: 300 };
const width = 1200 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Create SVG
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Create scales
const xScale = d3.scaleLinear()
    .range([0, width])
    .domain([0, d3.max(data, d => d.count)]);

const yScale = d3.scaleBand()
    .range([0, height])
    .padding(0.2)
    .domain(data.map(d => d.reason));

// Create bars
svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("y", d => yScale(d.reason))
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth());

// Add value labels on bars
svg.selectAll(".bar-label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "bar-label")
    .attr("x", d => xScale(d.count) + 5)
    .attr("y", d => yScale(d.reason) + yScale.bandwidth() / 2)
    .attr("dy", "0.35em")
    .text(d => d.count.toLocaleString());

// Add X axis
svg.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale).tickSize(5));

// Add Y axis
svg.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(yScale))
    .selectAll("text")
    .style("font-size", "12px");

// Add X axis label
svg.append("text")
    .attr("class", "axis-label")
    .attr("x", width / 2)
    .attr("y", height + 40)
    .style("text-anchor", "middle")
    .text("Number of Requests");

// EXTENDED CHART - Remaining reasons (not in top 10)
const allData = [
    { reason: "Abandoned Bicycle", count: 914 },
    { reason: "Administrative & General Requests", count: 2344 },
    { reason: "Air Pollution Control", count: 28 },
    { reason: "Alert Boston", count: 1 },
    { reason: "Animal Issues", count: 1539 },
    { reason: "Billing", count: 9 },
    { reason: "Boston Bikes", count: 56 },
    { reason: "Bridge Maintenance", count: 8 },
    { reason: "Building", count: 4542 },
    { reason: "Catchbasin", count: 972 },
    { reason: "Cemetery", count: 33 },
    { reason: "Code Enforcement", count: 39737 },
    { reason: "Employee & General Comments", count: 2380 },
    { reason: "Enforcement & Abandoned Vehicles", count: 65349 },
    { reason: "Environmental Services", count: 5705 },
    { reason: "Fire Hydrant", count: 313 },
    { reason: "General Request", count: 187 },
    { reason: "Generic Noise Disturbance", count: 33 },
    { reason: "Graffiti", count: 2897 },
    { reason: "Health", count: 1134 },
    { reason: "Highway Maintenance", count: 23665 },
    { reason: "Housing", count: 7398 },
    { reason: "Massport", count: 4 },
    { reason: "Needle Program", count: 11687 },
    { reason: "Neighborhood Services Issues", count: 21 },
    { reason: "Noise Disturbance", count: 1201 },
    { reason: "Notification", count: 573 },
    { reason: "Office of The Parking Clerk", count: 1 },
    { reason: "Operations", count: 166 },
    { reason: "Park Maintenance & Safety", count: 7121 },
    { reason: "Parking Complaints", count: 48 },
    { reason: "Pothole", count: 104 },
    { reason: "Programs", count: 19 },
    { reason: "Quality of Life", count: 1446 },
    { reason: "Recycling", count: 11306 },
    { reason: "Sanitation", count: 10198 },
    { reason: "Sidewalk Cover / Manhole", count: 328 },
    { reason: "Signs & Signals", count: 12925 },
    { reason: "Street Cleaning", count: 48702 },
    { reason: "Street Lights", count: 434 },
    { reason: "Traffic Management & Engineering", count: 982 },
    { reason: "Trees", count: 620 },
    { reason: "Valet", count: 20 },
    { reason: "Weights and Measures", count: 37 }
];

// Get top 10 reasons
const topTenReasons = ["Enforcement & Abandoned Vehicles", "Street Cleaning", "Code Enforcement", "Highway Maintenance", "Signs & Signals", "Needle Program", "Recycling", "Sanitation", "Housing", "Park Maintenance & Safety"];

// Filter to remaining reasons
const remainingData = allData.filter(d => !topTenReasons.includes(d.reason));

// Sort by count descending
remainingData.sort((a, b) => b.count - a.count);

// Set dimensions for extended chart
const marginExt = { top: 20, right: 60, bottom: 30, left: 300 };
const widthExt = 1200 - marginExt.left - marginExt.right;
const heightExt = 600 - marginExt.top - marginExt.bottom;

// Create SVG for extended chart
const svgExt = d3.select("#chart-extended")
    .append("svg")
    .attr("width", widthExt + marginExt.left + marginExt.right)
    .attr("height", heightExt + marginExt.top + marginExt.bottom)
    .append("g")
    .attr("transform", `translate(${marginExt.left},${marginExt.top})`);

// Create scales for extended chart
const xScaleExt = d3.scaleLinear()
    .range([0, widthExt])
    .domain([0, d3.max(remainingData, d => d.count)]);

const yScaleExt = d3.scaleBand()
    .range([0, heightExt])
    .padding(0.2)
    .domain(remainingData.map(d => d.reason));

// Create bars for extended chart
svgExt.selectAll(".bar-ext")
    .data(remainingData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("y", d => yScaleExt(d.reason))
    .attr("width", d => xScaleExt(d.count))
    .attr("height", yScaleExt.bandwidth());

// Add value labels for extended chart
svgExt.selectAll(".bar-label-ext")
    .data(remainingData)
    .enter()
    .append("text")
    .attr("class", "bar-label")
    .attr("x", d => xScaleExt(d.count) + 5)
    .attr("y", d => yScaleExt(d.reason) + yScaleExt.bandwidth() / 2)
    .attr("dy", "0.35em")
    .text(d => d.count.toLocaleString());

// Add X axis for extended chart
svgExt.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${heightExt})`)
    .call(d3.axisBottom(xScaleExt).tickSize(5));

// Add Y axis for extended chart
svgExt.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(yScaleExt))
    .selectAll("text")
    .style("font-size", "12px");

// Add X axis label for extended chart
svgExt.append("text")
    .attr("class", "axis-label")
    .attr("x", widthExt / 2)
    .attr("y", heightExt + 40)
    .style("text-anchor", "middle")
    .text("Number of Requests");

// Toggle button functionality
document.getElementById("toggle-btn").addEventListener("click", function() {
    document.getElementById("extended-container").style.display = "block";
    this.style.display = "none";
    window.scrollTo({ top: document.getElementById("extended-container").offsetTop, behavior: "smooth" });
});

document.getElementById("close-btn").addEventListener("click", function() {
    document.getElementById("extended-container").style.display = "none";
    document.getElementById("toggle-btn").style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
});
