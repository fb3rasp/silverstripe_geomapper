<?php

/**
 * Created by PhpStorm.
 * User: rainerspittel
 * Date: 8/1/16
 * Time: 10:51 AM
 */
class LeafletPage extends Page
{

}

class LeafletPage_Controller extends Page_Controller
{
    public function init()
    {
        parent::init();

        Requirements::javascript(FRAMEWORK_DIR . '/thirdparty/jquery/jquery.js');
        Requirements::javascript('themes/simple/leaflet/leaflet-src.js');
        Requirements::javascript('themes/simple/leaflet/leaflet-wfst.src.js');
        Requirements::javascript('themes/simple/javascript/leafletpage.js');

        Requirements::css('themes/simple/leaflet/leaflet.css');
        Requirements::css('themes/simple/css/LeafletPage.css');
    }

    public function getfeature()
    {
        $request = $this->getRequest();
        $postBody = $request->getBody();

        $client = new GuzzleHttp\Client();

        $response = $client->request(
            'POST',
            'http://wms.niwa.co.nz/cgi-bin/stations',
            [
                'body' => $postBody
            ]
        );

        $body = $response->getBody();
        $body = preg_replace("/\r|\n/", "", $body);
        $body = trim($body);
        $body = trim($body, '\t.');
        $body = preg_replace('/\s\s+/', ' ',$body);
        $body = preg_replace('/> </', '><', $body);
        return '<?xml version="1.0" encoding="UTF-8"?>' . $body;
    }

    public function getfeature_swath()
    {
        $request = $this->getRequest();
        $postBody = $request->getBody();

        $client = new GuzzleHttp\Client();

        $response = $client->request(
            'POST',
            'http://wms.niwa.co.nz/cgi-bin/os2020_swath',
            [
                'body' => $postBody
            ]
        );

        $body = $response->getBody();
        $body = preg_replace("/\r|\n/", "", $body);
        $body = trim($body);
        $body = trim($body, '\t.');
        $body = preg_replace('/\s\s+/', ' ',$body);
        $body = preg_replace('/> </', '><', $body);
        return '<?xml version="1.0" encoding="UTF-8"?>' . $body;
    }
}

