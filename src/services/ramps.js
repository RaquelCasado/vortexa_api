const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./api/boat_ramps.json', 'utf8'));
const rampsData = data.features;

function getRamps() {
    return rampsData;
}

function getRampById(id) {
    let chosenRamp = null;
    for (const ramp of rampsData) {
        if (ramp.id === id) {
            chosenRamp = ramp;
            break;
        }
    }
    return chosenRamp
}

function getRampsByConstructionMaterial(material) {
    const ramps = [];
    for (const ramp of rampsData) {
        if (ramp.properties.material === material) {
            ramps.push(ramp)
        }
    }
    return ramps;
}

function getRampsBySize(min_area, max_area) {
    const ramps = [];
    for (const ramp of rampsData) {
        console.log(ramp.properties.shape_area);
        if ((min_area <= ramp.properties.shape_area) && (ramp.properties.shape_area <= max_area)) {
            ramps.push(ramp)
        }
    }
    return ramps;
}

function getTotalRampsByConstructionMaterial(ne_lat=null, sw_lat=null, ne_lng=null, sw_lng=null) {
    let filteredRampsByCoord = rampsData;
    if(ne_lat != null){
        filteredRampsByCoord = getRampsInRange(ne_lat, sw_lat, ne_lng, sw_lng);
    }
    const totalRamps = {};
    for (const ramp of filteredRampsByCoord) {
        const material = ramp.properties.material;
        if (totalRamps.hasOwnProperty(material)) {
            totalRamps[material]++
        } else {
            totalRamps[material] = 1
        }
    }
    return Object.entries(totalRamps);
}

function getRampsInRange(ne_lat, sw_lat, ne_lng, sw_lng){
    const ramps = [];
    for(const ramp of rampsData){
        const coord = ramp.geometry.coordinates[0][0][0];
        if((sw_lat <= coord[1]) && (coord[1] <= ne_lat) && (sw_lng <= coord[0]) && (coord[0] <= ne_lng)){
            ramps.push(ramp);
        }
    }
    return ramps;
}

function getTotalRampsBySizeRange(ne_lat=null, sw_lat=null, ne_lng=null, sw_lng=null, small={min:0, max:50}, medium={min:50, max:200}, big={min:200,max:526}){
    let filteredRampsByCoord = rampsData;
    if(ne_lat != null){
        filteredRampsByCoord = getRampsInRange(ne_lat, sw_lat, ne_lng, sw_lng);
    }
    const totalRamps = {small: 0, medium: 0, big: 0};
    for (const ramp of filteredRampsByCoord) {
        const size = ramp.properties.shape_area;
        if(small.min < size && size < small.max){
            totalRamps['small']++
        }else if(medium.min < size && size < medium.max){
            totalRamps['medium']++
        }else if(big.min < size && size < big.max){
            totalRamps['big']++
        }
    }
    return Object.entries(totalRamps);
}

module.exports = {
    getRamps,
    getRampById,
    getRampsByConstructionMaterial,
    getRampsBySize,
    getTotalRampsByConstructionMaterial,
    getTotalRampsBySizeRange
};