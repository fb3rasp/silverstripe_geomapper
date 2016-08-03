<?php

/**
 * Created by PhpStorm.
 * User: rainerspittel
 * Date: 7/29/16
 * Time: 11:43 AM
 */
class MapPage extends Page
{

    private static $has_one = array (
        'Map' => 'MapDataObject'
    );

    public function getCMSFields() {
        $fields = parent::getCMSFields();

        $field = DropdownField::create('MapID','Map',MapDataObject::get()->map('ID','Title'))
            ->setEmptyString('(Please Select a map)');

        $fields->addFieldToTab('Root.Main', $field);

        return $fields;
    }

}

class MapPage_Controller extends Page_Controller
{
    private static $allowed_actions = array('getfeature','getfeature_swath');

    public function init()
    {
        parent::init();

        Requirements::javascript(FRAMEWORK_DIR . '/thirdparty/jquery/jquery.js');
        Requirements::javascript('themes/simple/openlayers3/ol.js');
        Requirements::javascript('themes/simple/javascript/mappage.js');
        Requirements::css('themes/simple/openlayers3/ol.css');
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