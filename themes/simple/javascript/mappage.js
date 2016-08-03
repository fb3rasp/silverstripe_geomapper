$( document ).ready(function() {


    var vectorSource_sbean = new ol.source.Vector({
        format: new ol.format.GML()
    });
    var vector_sbean = new ol.layer.Vector({
        source: vectorSource_sbean,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(40, 83, 108, 0.45)'
            }),
            stroke: new ol.style.Stroke({
                color: 'rbga(3, 35, 54, 0.45)',
                width: 0.5
            })
        })
    });

    var vectorSource_dtis = new ol.source.Vector({
        format: new ol.format.GML()
    });
    var vector_dtis = new ol.layer.Vector({
        source: vectorSource_dtis,
        style: new ol.style.Style({
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: 'rgba(170, 128, 57, 0.65)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(85, 54, 0, 0.85)',
                    width: 1
                }),
                opacity: 50
            })
        })
    });

    var vectorSource = new ol.source.Vector({
        format: new ol.format.GML()
    });

    var vector = new ol.layer.Vector({
        source: vectorSource,
        style: new ol.style.Style({
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: 'rgba(41, 79, 109,0.65)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(18, 54, 82, 0.85)',
                    width: 1
                }),
                opacity: 50
            })
        })
    });

    var layers = [
        new ol.layer.Tile({
            extent: [160,-55.82,195,-30],
            source: new ol.source.TileWMS({
                url: 'http://wms.niwa.co.nz/cgi-bin/bnz_demo',
                params: {
                    'LAYERS': 'coast_poly', 'TILED': true,'TRANSPARENT':false},
                serverType: 'mapserver'
            })
        }),
        new ol.layer.Tile({
            //extent: [-13884991, 2870341, -7455066, 6338219],
            source: new ol.source.TileWMS({
                url: 'https://gis.niwa.co.nz/arcgis/services/OS2020/BoI_Bathymetry_MS/MapServer/WMSServer',
                params: {'LAYERS': '1', 'TILED': true}

            })
        }),

        new ol.layer.Tile({
            //extent: [-13884991, 2870341, -7455066, 6338219],
            source: new ol.source.TileWMS({
                url: 'https://gis.niwa.co.nz/arcgis/services/OS2020/BoI_AerialPhoto_Color_MosaicFromNIWAGIS/MapServer/WMSServer',
                params: {'LAYERS': '1', 'TILED': true}

            })
        }),

        vector_sbean,
        vector,
        vector_dtis
    ];

    var map = new ol.Map({
        layers: layers,
        target: 'map',
        view: new ol.View({
            projection: 'EPSG:4326',
            center: [173.85864, -34.9895],
            zoom: 8
        })
    });

    var featureRequest = new ol.format.WFS().writeGetFeature({
        srsName: 'EPSG:4326',
        featureNS: 'http://openstreemap.org',
        //featurePrefix: 'ms',
        featureTypes: ['CTD']
        //outputFormat: 'application/json'
    });


    //
    //// then post the request and add the received features to a layer
    jQuery.ajax({
        url: '/map/getfeature',
        type: 'POST',
        data: new XMLSerializer().serializeToString(featureRequest),
        success: function(response) {
            var gmlFormatter = new ol.format.WFS({
                featureNS: 'http://openstreemap.org',
                featureTypes: ['CTD']
            });
            var features = gmlFormatter.readFeatures(response);
            vectorSource.addFeatures(features);
        }
    });

    var featureRequest = new ol.format.WFS().writeGetFeature({
        srsName: 'EPSG:4326',
        featureNS: 'http://openstreemap.org',
        //featurePrefix: 'ms',
        featureTypes: ['DTIS']
        //outputFormat: 'application/json'
    });


    //
    //// then post the request and add the received features to a layer
    jQuery.ajax({
        url: '/map/getfeature',
        type: 'POST',
        data: new XMLSerializer().serializeToString(featureRequest),
        success: function(response) {
            var gmlFormatter = new ol.format.WFS({
                featureNS: 'http://openstreemap.org',
                featureTypes: ['DTIS']
            });
            var features = gmlFormatter.readFeatures(response);
            vectorSource_dtis.addFeatures(features);
        }
    });


    var featureRequest = new ol.format.WFS().writeGetFeature({
        srsName: 'EPSG:4326',
        featureNS: 'http://openstreemap.org',
        //featurePrefix: 'ms',
        featureTypes: ['swath_poly']
        //outputFormat: 'application/json'
    });


    //
    //// then post the request and add the received features to a layer
    jQuery.ajax({
        url: '/map/getfeature_swath',
        type: 'POST',
        data: new XMLSerializer().serializeToString(featureRequest),
        success: function(response) {
            var gmlFormatter = new ol.format.WFS({
                featureNS: 'http://openstreemap.org',
                featureTypes: ['swath_poly']
            });
            var features = gmlFormatter.readFeatures(response);
            vectorSource_sbean.addFeatures(features);
        }
    });

    var highlightStyleCache = {};

    var featureOverlay = new ol.layer.Vector({
        source: new ol.source.Vector(),
        map: map,
        style: function(feature, resolution) {
            var text = resolution < 5000 ? feature.get('name') : '';
            if (!highlightStyleCache[text]) {
                highlightStyleCache[text] = new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 7,
                        fill: new ol.style.Fill({
                            color: 'rgba(166, 55, 63,0.8)'
                        }),
                        stroke: new ol.style.Stroke({
                            color: 'rgba(166, 55, 63, 0.25)',
                            width: 1
                        }),
                        opacity: 50
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(40, 83, 108, 0.75)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'rbga(3, 35, 54, 0.75)',
                        width: 1
                    }),
                    text: new ol.style.Text({
                            font: '12px Calibri,sans-serif',
                            text: text,
                            fill: new ol.style.Fill({
                                color: '#000'
                            }),
                            stroke: new ol.style.Stroke({
                                color: '#f00',
                                width: 3
                            })
                        })
                    });
            }
            return highlightStyleCache[text];
        }
    });

    var highlight;
    var displayFeatureInfo = function(pixel) {
        var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
            return feature;
        });

        var info = document.getElementById('info');
        if (feature) {
            info.innerHTML = feature.getId() + ': ' + feature.get('Cruise');
        } else {
            info.innerHTML = '&nbsp;';
        }

        if (feature !== highlight) {
            if (highlight) {
                featureOverlay.getSource().removeFeature(highlight);
            }
            if (feature) {
                featureOverlay.getSource().addFeature(feature);
            }
            highlight = feature;
        }

    };

    map.on('pointermove', function(evt) {
        if (evt.dragging) {
            return;
        }
        var pixel = map.getEventPixel(evt.originalEvent);
        displayFeatureInfo(pixel);
    });

    map.on('click', function(evt) {
        displayFeatureInfo(evt.pixel);
    });

});
