const router = require('express').Router();

// const apiRoutes = require('./api');
// const dashboardRoutes = require('./dashboardRoutes');

const homeRoutes = require( './homeRoutes') ;
router.use( '/', homeRoutes );

const uploadRoutes = require( './uploadRoutes' )
router.use( '/upload', uploadRoutes )

module.exports = router;
