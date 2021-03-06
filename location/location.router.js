var express = require('express');
var router = express.Router();
var locationController = require('./location.controller')

/* GET users listing. */
router.get('/city/autocomplete/:text', locationController.autocompleteCities);
router.get('/site/categories', locationController.getAllSiteCategories);
router.get('/city/sites', locationController.getCitySitesByCategory);
router.get('/site/:siteId', locationController.getSiteById)
router.get('/hotel/autocomplete/:cityId/:text', locationController.autocompleteHotels);

module.exports = router;
