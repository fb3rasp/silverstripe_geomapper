<?php

/**
 * Created by PhpStorm.
 * User: rainerspittel
 * Date: 8/3/16
 * Time: 8:59 AM
 */
class MapModelAdmin extends ModelAdmin
{
    /**
     * @var array
     */
    public static $managed_models = array('MapDataObject','LayerDataObject');

    /**
     * @var string
     */
    public static $url_segment = 'maps';

    /**
     * @var string
     */
    public static $menu_title = 'Maps';

}