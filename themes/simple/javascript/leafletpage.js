$( document ).ready(function() {

    var map = L.map('mapid', {
        crs: L.CRS.EPSG4326
    }).setView([-34.9895, 173.85864], 8);

    L.tileLayer.wms('http://wms.niwa.co.nz/cgi-bin/bnz_demo',
        {
            layers: 'coast_poly',
            format: 'image/png',
            transparent: false,
            attribution: 'Hello',
            crs: L.CRS.EPSG4326,
            id: 'niwa.basemap'
        }
    ).addTo(map);

    L.tileLayer.wms('https://gis.niwa.co.nz/arcgis/services/OS2020/BoI_Bathymetry_MS/MapServer/WMSServer',
        {
            layers: '1',
            format: 'image/png',
            transparent: true,
            attribution: 'Hello',
            crs: L.CRS.EPSG4326,
            id: 'niwa.layer1'
        }
    ).addTo(map);

    L.tileLayer.wms('https://gis.niwa.co.nz/arcgis/services/OS2020/BoI_AerialPhoto_Color_MosaicFromNIWAGIS/MapServer/WMSServer',
        {
            layers: '1',
            format: 'image/png',
            transparent: true,
            attribution: 'Hello',
            crs: L.CRS.EPSG4326,
            id: 'niwa.layer2'
        }
    ).addTo(map);

    var swath_poly = new L.WFS({
        url: '/map/getfeature_swath',
        typeNS: 'ms',
        typeName: 'swath_poly',
        crs: L.CRS.EPSG4326,
        geometryField: 'msGeometry',
        style: {
            color: 'black',
            weight: 0.5
        }
    }).addTo(map);

    var ctd = new L.WFS({
        url: '/map/getfeature',
        typeNS: 'ms',
        typeName: 'CTD',
        crs: L.CRS.EPSG4326,
        geometryField: 'msGeometry',
        style: {
            color: 'black',
            weight: 2
        }
    }).addTo(map);

    var dtis = new L.WFS({
        url: '/map/getfeature',
        typeNS: 'ms',
        typeName: 'DTIS',
        crs: L.CRS.EPSG4326,
        geometryField: 'msGeometry',
        style: {
            color: 'black',
            weight: 2
        }
    }).addTo(map);

});
