const express = require('express');
const router = express.Router();
const rampsService = require('../services/ramps');
const { getRamps, getRampById, getRampsByConstructionMaterial, getRampsBySize, getTotalRampsByConstructionMaterial, getTotalRampsBySizeRange } = rampsService;

router.get('/', (req, res, next) => {
    res.status(200).json({ body: getRamps()});
});

router.get('/byId/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({ body: getRampById(id)});
});

router.get('/byConstructionMaterial/:material', (req, res, next) => {
    const material = req.params.material;
    res.status(200).json({ body: getRampsByConstructionMaterial(material)});
});

router.get('/bySize/:min_area/:max_area', (req, res, next) => {
    const min_area = req.params.min_area;
    const max_area = req.params.max_area;
    res.status(200).json({ body: getRampsBySize(min_area, max_area)});
});

router.get('/totalPerConstructionMaterial', (req, res, next) => {
    res.status(200).json({ body: getTotalRampsByConstructionMaterial()});
});

router.get('/totalPerConstructionMaterial/coord/:ne_lat/:sw_lat/:ne_lng/:sw_lng', (req, res, next) =>{
    const ne_lat = req.params.ne_lat;
    const sw_lat = req.params.sw_lat;
    const ne_lng = req.params.ne_lng;
    const sw_lng = req.params.sw_lng;
    res.status(200).json({body: getTotalRampsByConstructionMaterial(ne_lat, sw_lat, ne_lng, sw_lng)});
});

router.get('/totalRampsBySizeRange', (req, res, next) => {
    res.status(200).json({ body: getTotalRampsBySizeRange()});
});

router.get('/totalRampsBySizeRange/coord/:ne_lat/:sw_lat/:ne_lng/:sw_lng', (req, res, next) => {
    const ne_lat = req.params.ne_lat;
    const sw_lat = req.params.sw_lat;
    const ne_lng = req.params.ne_lng;
    const sw_lng = req.params.sw_lng;
    res.status(200).json({ body: getTotalRampsBySizeRange(ne_lat, sw_lat, ne_lng, sw_lng)});
});

module.exports = router;