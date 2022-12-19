function setup() {
    createCanvas(500, 500);
    noLoop();
}

function draw() {
    background(255);
    line(0, 0, width, 0);
    line(0, 0, 0, height);
    line(width, 0, width, height);
    line(0, height, width, height);
    const mean = 5;
    const stdev = 200;
    const values = new Array(10000000);
    for (let i = 0; i < values.length; ++i) {
        let x = 10000;
        for (let j = 0; j < 365; ++j) {
            x += randomGaussian(mean, stdev);
        }
        values[i] = x;
    }
    const bins = createBins(values, -10000, 30000, 1000);
    drawHistogram(bins);
    console.log(average(values));
}

function createBins(values, minValue, maxValue, numBins) {
    const bins = new Array(numBins);
    bins.fill(0);
    for (let i = 0; i < values.length; ++i) {
        const j = int(((values[i] - minValue) * numBins) / (maxValue - minValue));
        if (0 <= j && j < numBins) {
            bins[j] += 1;
        }
    }
    return bins;
}

function drawHistogram(bins) {
    const binWidth = width / bins.length;
    const binMax = max(bins);
    fill(0);
    for (let i = 0; i < bins.length; ++i) {
        const binHeight = (height * bins[i]) / binMax;
        rect(binWidth * i, height - binHeight, binWidth, binHeight);
    }
}

function average(values) {
    let sum = 0;
    for (let i = 0; i < values.length; ++i) {
        sum += values[i];
    }
    return sum / values.length;
}
