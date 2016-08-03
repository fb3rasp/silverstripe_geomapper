<?php

/**
 * Created by PhpStorm.
 * User: rainerspittel
 * Date: 8/1/16
 * Time: 8:35 AM
 */
class MapDataObject extends DataObject
{

    private static $db = array(
        'Lat' => 'Float',
        'Long' => 'Float',
        'Zoom' => 'Int',
        'Projection' => 'Varchar(10)'
    );
}