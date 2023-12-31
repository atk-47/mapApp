declare module '@here/maps-api-for-javascript' { export = H }
declare module goog { class Disposable {} namespace events { class Event {} class EventTarget {} } }
type GlobalElement = Element;
type GlobalEvent = Event;
type GlobalFloat32Array = Float32Array;
type GlobalObject = Object;
declare namespace H {
  /**
   * The `Map` class defines a map instance. By creating this object, you initialize
   * a visible map attached to a DOM element. The `Map` class is the entry point to
   * all operations involving layers, map objects and geo-screen
   * transformations. Use the `options` argument to initialize the map
   * with a specific map view.
   */
  class Map extends H.util.EventTarget {
    /**
     * The `Map` class defines a map instance. By creating this object, you initialize
     * a visible map attached to a DOM element. The `Map` class is the entry point to
     * all operations involving layers, map objects and geo-screen
     * transformations. Use the `options` argument to initialize the map
     * with a specific map view.
     * @param element HTML element into which the map will be rendered.
     * @param baseLayer The layer to be used as the base layer.
     * @param opt_options Additional map options (for example a map view)
     */
    constructor (element : HTMLElement , baseLayer : H.map.layer.Layer , opt_options ? : H.Map.Options ) ;
    /**
     * This method adds a layer to the map.
     * If the layer was already added before, it will be moved above the most recently added layer.
     * @param layer The map layer to be added
     * @param opt_idx index at which the new layer should be inserted
     */
    addLayer (layer : H.map.layer.Layer , opt_idx ? : number ) : H.Map ;
    /**
     * This method adds a map object to the map. The map object can be a marker or a
     * spatial object such as a polygon or polyline.
     * @param mapObject The map object to add
     */
    addObject (mapObject : H.map.Object ) : H.map.Object ;
    /**
     * This method adds an array of objects or an object group to the map.
     *
     * Note: Objects which were added to the map previously won't be added again.
     */
    addObjects (mapObjects : H.map.Object [] ) : H.Map ;
    /**
     * This method captures the desired region of the map and the associated map objects. The
     * method returns an HTML5 Canvas element. The origin of coordinate system is the
     * top-left corner of the viewport.
     *
     * In order to see any captured UI controls in the output, pass in a reference to
     * {@link H.ui.UI} object. At present, only {@link H.ui.ScaleBar} UI element
     * supports the feature.
     *
     * Note that instances of `H.map.Icon` taint the output canvas
     * if images from different origins are used. When an image source sets CORS headers,
     * `H.map.Icon` supports a flag that enables image loading with cross-origin parameters.
     * Internet Explorer always taints the canvas element when SVG images are used.
     * CORS support for images starts only from IE11.
     * @param callback Callback function to call once capturing has been finished. If the Map's render engine doesn't support capturing capability then `null` is passed as argument, otherwise a canvas element that represents the captured map.
     * @param opt_capturables Collection of "capturable" element(s) to draw onto the resulting canvas
     * @param opt_x1 The x coordinate of the left edge of the capturing rectangle, defaults to 0
     * @param opt_y1 The y coordinate of the top edge of the capturing rectangle, defaults to 0
     * @param opt_x2 The x coordinate of the right edge of the capturing rectangle, defaults to viewport width
     * @param opt_y2 The y coordinate of the bottom edge of the capturing rectangle, defaults to viewport height
     */
    capture (callback : (a : HTMLCanvasElement | null ) => any , opt_capturables ? : H.util.ICapturable [] , opt_x1 ? : number , opt_y1 ? : number , opt_x2 ? : number , opt_y2 ? : number ) : void ;
    /**
     * This method clears the entire stored content.
     * @param opt_onprogress A callback which is invoked each time the progress state of the returned clear request changes
     */
    clearContent (opt_onprogress ? : (a : H.util.Request ) => any ) : H.util.Request ;
    /**
     * Indicates whether the map will be considered as target for drag events. The default value is `false`
     */
    draggable : boolean ;
    /**
     * This method retrieves the screen coordinates corresponding to the geographical
     * coordinates supplied by the caller.
     * @param geoPoint point on the map
     */
    geoToScreen (geoPoint : H.geo.IPoint ) : H.math.Point | null ;
    /**
     * This method gets the current base map layer.
     */
    getBaseLayer ( ) : H.map.layer.Layer | null ;
    /**
     * This method returns the current center of the map.
     */
    getCenter ( ) : H.geo.Point ;
    /**
     * This method retrieves the map root HTML element.
     */
    getElement ( ) : HTMLElement ;
    /**
     * This method retrieves the imprint object for this map.
     */
    getImprint ( ) : H.map.Imprint | null ;
    /**
     * This method retrieves the map's current layer collection.
     */
    getLayers ( ) : H.map.DataModel ;
    /**
     * To obtain the top-most z-ordered map object found at the specified screen coordinates.
     * Coordinates are viewport pixel coordinates starting from top-left corner as origin (0, 0).
     * @param x map viewport x-axis pixel coordinate
     * @param y map viewport y-axis pixel coordinate
     * @param callback It is invoked when the operation has been finished. It gets as argument the top-most map feature object or `undefined` if no object has been found.
     */
    getObjectAt (x : number , y : number , callback : (a : H.map.Feature | undefined ) => any ) : void ;
    /**
     * This method obtains a list of all objects that have been added to the map. See {@link H.map.Group#getObjects}.
     *
     * Unless `opt_recursive` parameter is set to `true`, this method will return only first level objects,
     * for example if group with a marker is added to the map, only the group will be returned and not the marker.
     *
     * Note: Adding or removing objects on the obtained list doesn't affect the map.
     * Use the map's `addObject` and `removeObjects` methods instead.
     * @param opt_recursive Indicates whether objects in sub-groups are also collected.
     */
    getObjects (opt_recursive ? : boolean ) : H.map.Object [] ;
    /**
     * To obtain a list of map objects in descending z-order found at the specified screen coordinates.
     * The coordinates are viewport pixel coordinates starting from top left corner as origin (0, 0).
     * @param x map Viewport x-axis pixel coordinate
     * @param y map Viewport y-axis pixel coordinate
     * @param callback It is invoked when the operation has been finished. It gets as argument a list of feature objects found.
     * @param opt_allowDuplicates Boolean flag indicating that multiple pick results for the same feature are allowed, if the render engine supports it. Be aware that setting this flag to true may cause performance impacts!
     */
    getObjectsAt (x : number , y : number , callback : (a : H.map.Feature [] ) => any , opt_allowDuplicates ? : boolean ) : void ;
    /**
     * To obtain a list of map objects which intersect the provided area.
     * @param area The polygonal geographical area where to obtain the map objects. Since the polygon's legs are not projected, for some areas covering several latitude degrees the set of objects retrieved is not guaranteed to be what is shown in the map.
     * @param callback The function to invoke when the request operation has been finished. It gets a list of all found objects as argument.
     * @param opt_options Additional options to filter the obtained map objects
     */
    getObjectsWithin (area : H.geo.Polygon , callback : (a : H.map.Object [] ) => any , opt_options ? : H.Map.GetObjectsWithinOptions ) : void ;
    /**
     * This method retrieves current view model. View model can be used to modify
     * the current view or camera. {@link H.map.ViewModel}
     */
    getViewModel ( ) : H.map.ViewModel ;
    /**
     * This method retrieves the current map viewport. The viewport can be used
     * to modify padding and margin, which reflect the position
     * of the viewport center and the amount of extra data loaded (for margin)
     */
    getViewPort ( ) : H.map.ViewPort ;
    /**
     * This method retrieves the current map zoom level.
     */
    getZoom ( ) : number ;
    /**
     * This method removes a layer from the map.
     * @param layer The map layer to be removed
     */
    removeLayer (layer : H.map.layer.Layer ) : H.Map ;
    /**
     * This method removes previously added map object from the map.
     * Note that method can be used to remove only direct children of the root group of the default object layer.
     * @param mapObject The map object to remove
     */
    removeObject (mapObject : H.map.Object ) : H.map.Object ;
    /**
     * This method removes an array of map objects from the map.
     * Note that method can be used to remove only direct children of the root group of the default object layer.
     */
    removeObjects (mapObjects : H.map.Object [] ) : H.Map ;
    /**
     * This method retrieves the geographical coordinates corresponding to the screen
     * coordinates supplied by the caller.
     * @param x Map viewport x-axis pixel coordinate
     * @param y Map viewport y-axis pixel coordinate
     */
    screenToGeo (x : number , y : number ) : H.geo.Point | null ;
    /**
     * This method retrieves `LookAtData` according to the given screen coordinates.
     * The method converts screen pixel coordinates to correct `LookAtData` object.
     * @param x map viewport x-axis pixel coordinate
     * @param y map viewport y-axis pixel coordinate
     */
    screenToLookAtData (x : number , y : number ) : H.map.ViewModel.ILookAtData ;
    /**
     * This method sets the provided layer as base map. The layer is inserted
     * as the bottom-most layer in the map.
     * @param layer The layer to use as base map
     */
    setBaseLayer (layer : H.map.layer.Layer ) : H.Map ;
    /**
     * This method sets the center of the map.
     * @param center An object containing the coordinates of the new map center
     * @param opt_animate A value indicating if an animated transition should be applied, default is `false`
     */
    setCenter (center : H.geo.IPoint , opt_animate ? : boolean ) : H.Map ;
    /**
     * This method sets the zoom level of the map. Every zoom level
     * represents a different scale. The map at zoom level 2 is twice as large
     * as the map at zoom level 1.
     * @param zoom A value indicating the new map zoom level
     * @param opt_animate A value indicating if an animated transition should be applied, default is `false`
     */
    setZoom (zoom : number , opt_animate ? : boolean ) : H.Map ;
    /**
     * This method persistently stores the content of a map layer for a given area and range of zoom levels.
     * It can be used to enable map rendering when no internet connection is available and also to reduce the download
     * traffic for frequently visited map areas.
     *
     * Specified `opt_min` and `opt_max` values are clamped to the provider `[min,max]` range. Note that specifying a big
     * range will cause many tile requests to the server and might greatly affect the performance of the browser.
     * @param opt_onprogress A callback invoked each time the progress state of the returned store request changes.
     * @param opt_boundingBox The area to store, default is the current bounding box of the map
     * @param opt_min The minimum zoom level to store, default is the current zoom level
     * @param opt_max The maximum zoom level to store, default is the current zoom level
     * @param opt_layer The layer to store, default is the current base layer
     */
    storeContent (opt_onprogress ? : (a : H.util.Request ) => any , opt_boundingBox ? : H.geo.Rect , opt_min ? : number , opt_max ? : number , opt_layer ? : H.map.layer.BaseTileLayer ) : H.util.Request ;
    /**
     * This method changes the map zoom level while keeping the map location
     * under the specified screen coordinates (x,y) fixed in the viewport.
     * @param zoom A value indicating the new map zoom level
     * @param x A value representing the x coordinate in the map viewport
     * @param y A value representing the y coordinate in the map viewport
     */
    zoomAt (zoom : number , x : number , y : number ) : void ;
  }
}
declare namespace H.Map {
  type BackgroundRange = { higher : number , lower : number } ;
  /**
   * Types of engines.
   */
  enum EngineType {
    HARP ,
    P2D ,
    WEBGL ,
  }
  type GetObjectsWithinOptions = { types ? : number , visiblesOnly ? : boolean , zoom ? : number } ;
  type Options = { autoColor ? : boolean , bounds ? : H.geo.AbstractGeometry , center ? : H.geo.IPoint , engineType ? : H.Map.EngineType , imprint ? : H.map.Imprint.Options | null , layers ? : H.map.layer.Layer [] , margin ? : number , padding ? : H.map.ViewPort.Padding , pixelRatio ? : number , renderBaseBackground ? : H.Map.BackgroundRange , zoom ? : number } ;
}
declare namespace H.clustering {
  /**
   * This class represents the input data structure for data points to be clustered.
   */
  class DataPoint implements H.geo.IPoint {
    /**
     * This class represents the input data structure for data points to be clustered.
     * @param lat The latitude coordinate of the position of the data point
     * @param lng The longitude coordinate of the position of the data point
     * @param opt_weight The weight of the data point as a positive number, the default is 1
     * @param opt_data Optional data, which will be associated with the given `DataPoint`
     */
    constructor (lat : number , lng : number , opt_weight ? : number , opt_data ? : any ) ;
    /**
     * This property holds the altitude of the data point.
     */
    alt ? : number ;
    /**
     * This property holds the data associated with the given data point.
     */
    data : any ;
    /**
     * This property holds the latitude of the data point.
     */
    lat : number ;
    /**
     * This property holds the longitude of the data point.
     */
    lng : number ;
    /**
     * This property holds the (clustering) weight of the data point.
     */
    wt : number ;
  }
}
declare namespace H.clustering {
  /**
   * This interface encapsulates a cluster of data points, which fulfill the
   * clustering specification (the data points are within the epsilon and there
   * are enough points to form a cluster).
   *
   * We can make an analogue with a [Tree](https://en.wikipedia.org/wiki/Tree_%28data_structure%29).
   * In that case, the given cluster is a node in a tree, children of that node are
   * sub-clusters and leaves of that sub-tree are the noise points.
   *
   * Sub-clusters of a cluster can be seen on a map when changing the zoom level,
   * as parent clusters split into smaller clusters and possible noise points.
   */
  interface ICluster extends H.clustering.IResult {
    /**
     * This method invokes the specified callback for each data point in the given
     * cluster.
     * In an analogy to the example from the class description, the method traverses
     * only through the leaf nodes of the tree.
     * @param callback The callback to invoke. It receives the currently traversed noise point as argument.
     */
    forEachDataPoint (callback : (a : H.clustering.INoisePoint ) => any ) : void ;
    /**
     * This method invokes the specified callback for each "entry" of the
     * cluster. That "entry" can be either a cluster which implements
     * {@link H.clustering.ICluster} interface or a noise point which implements
     * {@link H.clustering.INoisePoint} interface.
     * In an analogy to the example from the class description, the method traverses
     * through all nodes of the tree beside the root.
     * @param callback The callback to invoke. It receives the currently traversed entry as an argument, which is cluster or noise point
     */
    forEachEntry (callback : (a : H.clustering.IResult ) => any ) : void ;
    /**
     * This method retrieves the rectangular bounding box of the given cluster.
     */
    getBoundingBox ( ) : H.geo.Rect ;
    /**
     * This method retrieves the maximum zoom level at which the given cluster does
     * not break up into into sub-clusters and/or noise points.
     */
    getMaxZoom ( ) : number ;
  }
}
declare namespace H.clustering {
  /**
   * This interface represents a data point which does not belong to a cluster.
   */
  interface INoisePoint extends H.clustering.IResult {
    /**
     * This method retrieves the data associated with the given noise point.
     */
    getData ( ) : any ;
  }
}
declare namespace H.clustering {
  /**
   * This interface represents an item in the results of a clustering operation.
   */
  interface IResult {
    /**
     * This method retrieves the minimum zoom level at which the given item is not part of another cluster.
     */
    getMinZoom ( ) : number ;
    /**
     * This method retrieves the geographical position of the cluster result.
     */
    getPosition ( ) : H.geo.Point ;
    /**
     * This method retrieves the weight of the cluster result.
     */
    getWeight ( ) : number ;
    /**
     * This method retrieves a value indicating whether the cluster result is a
     * cluster or a noise point.
     */
    isCluster ( ) : boolean ;
  }
}
declare namespace H.clustering {
  /**
   * This interface specifies the methods a clustering theme must implement.
   *
   * Themes can be used to style the output of a clustering process when overlaying clustered data on the map.
   */
  interface ITheme {
    /**
     * This method retrieves a map object representing a cluster.
     * @param cluster An object implementing the interface `ICluster`
     */
    getClusterPresentation (cluster : H.clustering.ICluster ) : H.map.Object ;
    /**
     * This method retrieves a map object representing a noise point.
     * @param noisePoint An object implementing the interface `INoisePoint`
     */
    getNoisePresentation (noisePoint : H.clustering.INoisePoint ) : H.map.Object ;
  }
}
declare namespace H.clustering {
  /**
   * The clustering provider serves clusters and noise point representation
   * for the map based on the provided data set. Levels for clustering
   * as well as custom cluster representation can be set via `Options`.
   */
  class Provider extends H.map.provider.LocalObjectProvider {
    /**
     * The clustering provider serves clusters and noise point representation
     * for the map based on the provided data set. Levels for clustering
     * as well as custom cluster representation can be set via `Options`.
     * @param dataPoints An array of objects representing data points
     * @param opt_options An object containing configuration options
     */
    constructor (dataPoints : H.clustering.DataPoint [] , opt_options ? : H.clustering.Provider.Options ) ;
    /**
     * This method adds a data point to the provider.
     * Note that this method triggers re-clustering of the the data set associated with the provider.
     * @param dataPoint An object representing the data point to add
     */
    addDataPoint (dataPoint : H.clustering.DataPoint ) : void ;
    /**
     * This method adds a list of data points to the provider.
     * Note that this method triggers re-clustering of the data set associated with the provider.
     * @param dataPoints A set of data point objects to add
     */
    addDataPoints (dataPoints : H.clustering.DataPoint [] ) : void ;
    /**
     * This method retrieves the current theme used for cluster visualizations.
     */
    getTheme ( ) : H.clustering.ITheme ;
    providesDomMarkers ( ) : boolean ;
    providesMarkers ( ) : boolean ;
    providesSpatials ( ) : boolean ;
    /**
     * This method removes a data point from the provider's data set.
     * Note that this method triggers re-clustering of the data set associated with the provider.
     * @param dataPoint An object representing the data point to remove
     */
    removeDataPoint (dataPoint : H.clustering.DataPoint ) : void ;
    /**
     * This method sets a new data on the provider class.
     * @param dataPoints A set of data points
     */
    setDataPoints (dataPoints : H.clustering.DataPoint [] ) : void ;
    /**
     * This method sets new theme on the provider.
     * Note that this method changes the visual representation of the displayed clusters and noise points.
     * @param theme An object representing the theme to set
     */
    setTheme (theme : H.clustering.ITheme ) : void ;
  }
}
declare namespace H.clustering.Provider {
  type ClusteringOptions = { eps ? : number , minWeight ? : number , projection ? : H.geo.IProjection , strategy ? : H.clustering.Provider.Strategy } ;
  type GetObjectsWithinOptions = { types ? : number , visiblesOnly ? : boolean , zoom : number } ;
  type Options = { clusteringOptions ? : H.clustering.Provider.ClusteringOptions , getCopyrights ? : (a : H.geo.Rect , b : number ) => any , max ? : number , min ? : number , pixelRatio ? : number , theme ? : H.clustering.ITheme , uri ? : string } ;
  /**
   * This enumeration represents identifiers for possible clustering strategies.
   */
  enum Strategy {
    DYNAMICGRID = 2.0 ,
    FASTGRID = 0.0 ,
    GRID = 1.0 ,
  }
}
declare namespace H.data {
  /**
   * This abstract reader class defines an interface for data readers and general functionality
   * related to fetching data and to handling rendering events.
   */
  abstract class AbstractReader extends H.util.EventTarget {
    /**
     * This abstract reader class defines an interface for data readers and general functionality
     * related to fetching data and to handling rendering events.
     * @param opt_url The optional URL of the data file
     */
    constructor (opt_url ? : string ) ;
    /**
     * This method retrieves an object layer ({@link H.map.layer.ObjectLayer})
     * that contains parsed data and can be added directly to the map. The method
     * gets a new instance of `ObjectLayer` with every invocation.  If the
     * data has not been parsed, the method returns an `ObjectLayer` that
     * contains partial information, and the reader adds any new parsed objects to
     * the provider associated with the layer later on.
     */
    getLayer ( ) : H.map.layer.ObjectLayer ;
    /**
     * This method retrieves a collection of objects representing parsed data
     * converted to data objects. Note that the method returns only currently parsed
     * objects if parsing is ongoing.
     */
    getParsedObjects ( ) : H.map.Object [] ;
    /**
     * This method retrieves the processing state of the `Reader`. For possible
     * states see {@link H.data.AbstractReader.State}.
     */
    getState ( ) : H.data.AbstractReader.State ;
    /**
     * This method retrieves the URL of the current file, which is either a file
     * being fetched/parsed or a file that has been already parsed.
     */
    getUrl ( ) : string | undefined ;
    /**
     * This method launches parsing of the data file at the current URL
     * (see {@link H.data.AbstractReader#setUrl} or
     * {@link H.data.AbstractReader}). The method uses XHR as a transport,
     * therefore the same origin policy applies, or the server should respond
     * with the appropriate CORS headers.
     */
    parse ( ) : void ;
    /**
     * This method sets the URL for the `Reader`. It resets the current state
     * of the `Reader` to its initial values (clears data about last parsed
     * objects, etc.), and throws `InvalidState` exception if the state of the
     * `Reader` is not `READY` or `ERROR`.
     * @param url The new URL
     */
    setUrl (url : string ) : H.data.AbstractReader ;
  }
}
declare namespace H.data.AbstractReader {
  /**
   * This enumeration defines the states of the {@link H.data.AbstractReader}.
   */
  enum State {
    ERROR = -1.0 ,
    LOADING = 0.0 ,
    READY = 2.0 ,
    VISIT = 1.0 ,
  }
}
declare namespace H.data.AbstractReader {
  /**
   * This class encapsulates state change events dispatched by `AbstractReader`.
   */
  class Event extends H.util.Event {
    /**
     * This class encapsulates state change events dispatched by `AbstractReader`.
     * @param target The target that is passed to event listeners
     * @param type An identifier of the event type
     * @param state An identifier of the state of the target firing an event
     * @param message The message associated with an event
     */
    constructor (target : H.data.AbstractReader | H.map.Object , type : string , state : H.data.AbstractReader.State , message : string ) ;
  }
}
declare namespace H.data.geojson {
  /**
   * This class represents a GeoJSON reader responsible for fetching and
   * interpreting GeoJSON data. It creates an instance of `H.map.Object`
   * that can be displayed on the map (for more details see [GeoJSON documentation](https://geojson.org/)).
   *
   *
   * Auxiliary data that accompanies geometries (the contents of the field
   * `properties`) is bound to the map object and can be fetched with the method
   * `getData()` on that object. See {@link H.map.Object#getData}.
   *
   * Note that you can load a GeoJSON file even from a different domain, if that
   * domain supports
   * [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).
   */
  class Reader extends H.data.AbstractReader {
    /**
     * This class represents a GeoJSON reader responsible for fetching and
     * interpreting GeoJSON data. It creates an instance of `H.map.Object`
     * that can be displayed on the map (for more details see [GeoJSON documentation](https://geojson.org/)).
     *
     *
     * Auxiliary data that accompanies geometries (the contents of the field
     * `properties`) is bound to the map object and can be fetched with the method
     * `getData()` on that object. See {@link H.map.Object#getData}.
     *
     * Note that you can load a GeoJSON file even from a different domain, if that
     * domain supports
     * [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).
     * @param opt_url The optional URL of the data file.
     * @param opt_options An object providing additional reader configuration parameters.
     */
    constructor (opt_url ? : string , opt_options ? : H.data.geojson.Reader.Options ) ;
    /**
     * This method launches the parsing process on the provided data.
     * @param data A string or object containing the data to parse
     */
    parseData (data : string | GlobalObject ) : void ;
  }
}
declare namespace H.data.geojson.Reader {
  type Options = { disableLegacyMode ? : boolean , style ? : (a : H.map.Object ) => any } ;
}
declare namespace H.data.heatmap {
  /**
   * This class defines a standard way to customize the colors displayed in a
   * heat map by associating custom colors with the normalized "heat" values.
   *
   * It associates colors with "heat" values via the `stops` property.
   * This property is a map, where the keys are numbers ranging from 0 to 1, inclusive,
   * and the values are colors associated with these numeric values.
   * The colors are represented using CSS syntax, that is hexadecimal notation ("#RGB" or "#RRGGBB") or
   * rgb(a) notation ("rgba(R, G, B, A)"), etc.
   * The range [0 .. 1] stands for the normalized "heat" value.
   */
  class Colors {
    /**
     * This class defines a standard way to customize the colors displayed in a
     * heat map by associating custom colors with the normalized "heat" values.
     *
     * It associates colors with "heat" values via the `stops` property.
     * This property is a map, where the keys are numbers ranging from 0 to 1, inclusive,
     * and the values are colors associated with these numeric values.
     * The colors are represented using CSS syntax, that is hexadecimal notation ("#RGB" or "#RRGGBB") or
     * rgb(a) notation ("rgba(R, G, B, A)"), etc.
     * The range [0 .. 1] stands for the normalized "heat" value.
     * @param stops An object defining the color stops
     * @param opt_interpolate A value indicating whether interpolation is to be used to display smooth color transitions in the heat map (`true`) or whether the heat map is to be posterized (`false`), the default is `false`.
     */
    constructor (stops : { [ /* warning: coerced from ? */ key: string ]: string } , opt_interpolate ? : boolean ) ;
    /**
     * This static member defines the default heat map colors. It uses color
     * interpolation and has the following color stops:
     */
    static DEFAULT : H.data.heatmap.Colors ;
  }
}
declare namespace H.data.heatmap {
  /**
   * This interface represents a single data point that can be represented
   * visually in a heat map. It consists of the geographic coordinates defining
   * the location of the point and an optional value to be associated with this
   * location.
   */
  interface IDataPoint extends H.geo.IPoint {
    /**
     * This property holds the "heat" value associated with the given data
     * point. The default is `1`.
     */
    value ? : number ;
  }
}
declare namespace H.data.heatmap {
  /**
   * This class provides tiles to visualize value-based or density-based heat maps.
   * The user can choose between density and value based heat map.
   */
  class Provider extends H.map.provider.RemoteTileProvider {
    /**
     * This class provides tiles to visualize value-based or density-based heat maps.
     * The user can choose between density and value based heat map.
     * @param opt_options An object containing configuration options
     */
    constructor (opt_options ? : H.data.heatmap.Provider.Options ) ;
    /**
     * This method adds an array of data points {@link H.data.heatmap.IDataPoint} to the heat map.
     * The heat map provides a visual representation of these data points. Note that there is a significant
     * performance cost to adding and removing data, once an overlay has been
     * created.  This is related to the rendering engine and tile caching. If you
     * wish to add data after the tiles have been created, the cache must be cleared
     * and all tiles need to be recreated.  For this reason, heat maps should not be
     * used to create fast animations.
     *
     * As new data can invalidate the already generated tiles, those tiles should be
     * removed form the tile cache.  Use the argument `opt_hardReload` to
     * change the mode determining how those tiles are removed. Two modes are
     * supported:
     *
     * - `hard`: This mode immediately removes the cached tiles from
     * the tile cache and forces the provider to re-fetch the tiles. Currently
     * cached tiles are not used for rendering.
     *
     * - `soft`: This mode only marks tiles as invalid and requests
     * the tiles to be re-fetched at the earliest opportunity. The provider does
     * not invalidate the cache immediately in this case. This means that cached
     * tiles can still be rendered while the updated tiles are fetched.
     * @param dataPoints An array of data points to add
     * @param opt_hardReload A value indicating whether to invalidate in `hard` mode (`true`) or in `soft` mode (`false`), the default is `soft` mode.
     */
    addData (dataPoints : H.data.heatmap.IDataPoint [] , opt_hardReload ? : boolean ) : void ;
    /**
     * This method removes all data from the given heat map provider object.
     * New data can be added using the method {@link H.data.heatmap.Provider#addData}.
     */
    clear ( ) : void ;
    /**
     * To obtain the opacity which is used for the rendering of the heatmap. See `setOpacity`for more details.
     */
    getOpacity ( ) : number ;
    providesRasters ( ) : boolean ;
    requestInternal (col : number , row : number , level : number , onResponse : (a : null | HTMLImageElement | HTMLCanvasElement | ArrayBuffer | GlobalObject , b ? : any ) => any , onError : (a : Error ) => any , f ? : number ) : H.util.ICancelable ;
    /**
     * To set the opacity which is used for the rendering of the heatmap.
     * @param opt_opacity The opacity to set in range `[0..1]` where `0.0` means full transparent and `1.0` means full opaque. The default value is `1.0`
     */
    setOpacity (opt_opacity ? : number ) : void ;
  }
}
declare namespace H.data.heatmap.Provider {
  type Options = { assumeValues ? : boolean , coarseness ? : number , colors ? : H.data.heatmap.Colors , dataMax ? : number , engineType ? : H.Map.EngineType , max ? : number , min ? : number , opacity ? : number , pointSize ? : number , sampleDepth ? : number , tileSize ? : number , type ? : string } ;
}
declare namespace H.data.kml {
  /**
   * This class is responsible for fetching and interpreting KML data. It creates
   * an instance of `H.map.Object` that can be displayed on the map,
   * from KML features and geometries as described by OGC.
   *
   * Auxiliary data that accompanies geometries (such as name, description, the
   * KML node itself, etc.) is bound to the map object and can be fetched by
   * calling the method {@link H.map.Object#getData} on the map object.
   *
   * Note that you can load a KML file even from a different domain, if that domain supports
   * [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).
   */
  class Reader extends H.data.AbstractReader {
    /**
     * This class is responsible for fetching and interpreting KML data. It creates
     * an instance of `H.map.Object` that can be displayed on the map,
     * from KML features and geometries as described by OGC.
     *
     * Auxiliary data that accompanies geometries (such as name, description, the
     * KML node itself, etc.) is bound to the map object and can be fetched by
     * calling the method {@link H.map.Object#getData} on the map object.
     *
     * Note that you can load a KML file even from a different domain, if that domain supports
     * [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).
     * @param url A URL from which to get KML data
     */
    constructor (url : string ) ;
  }
}
declare namespace H.geo {
  /**
   * This property holds a geographic coordinate that specifies the elevation of a
   * point on the Earth's surface in meters. A value of `undefined` is
   * treated as `0`.
   */
  type Altitude = number | undefined ;
  /**
   * This property holds a geographic coordinate that specifies the north-south
   * position of a point on the Earth's surface in the range from -90 to + 90
   * degrees, inclusive.
   */
  type Latitude = number ;
  /**
   * This property holds a geographic coordinate that specifies the east-west
   * position of a point on the Earth's surface in the range from -180 to 180
   * degrees, inclusive.
   */
  type Longitude = number ;
  /**
   * To obtain whether a leg (formed by the given two longitudes) crosses the International Date Line.
   * @param lng1 The start longitude of the leg
   * @param lng2 The end longitude of the leg
   */
  function isDBC (lng1 : number , lng2 : number ) : boolean ;
}
declare namespace H.geo {
  /**
   * The base class for all geometry types.
   */
  abstract class AbstractGeometry {
    /**
     * Checks whether the geometry is equal to the geometry supplied by the caller.
     * Two geometries are considered as equal if they represent the same geometry type and have equal coordinate values.
     * @param other The geometry to check against
     */
    abstract equals (other : any ) : boolean ;
    /**
     * Returns the bounding rectangle of the geometry.
     */
    abstract getBoundingBox ( ) : H.geo.Rect | null ;
    /**
     * To obtain a [GeoJSON](https://tools.ietf.org/html/rfc7946#page-7) representation of the given geometry.
     */
    toGeoJSON ( ) : GlobalObject ;
    /**
     * To obtain a [Well-Known-Text (WKT)](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry)
     * representation of the geometry.
     */
    toString ( ) : any ;
  }
}
declare namespace H.geo {
  /**
   * An interface to represent a geographic point. Every point in geographic space
   * is represented by three coordinates latitude, longitude and optional altitude.
   */
  interface IPoint {
    /**
     * This property represents the altitude of the point.
     */
    alt ? : number ;
    /**
     * This property represents the latitude of the point.
     */
    lat : number ;
    /**
     * This property represents the longitude of the point.
     */
    lng : number ;
  }
}
declare namespace H.geo {
  /**
   * This interface represents a map projection. It defines functions that
   * transform geographic coordinates to EPSG3857 coordinate reference system,
   * which uses x, y values in range 0..1
   */
  interface IProjection {
    /**
     * This method transforms a geographical point to a projected point in the range [0...1].
     * @param geoPoint An object containing geographical coordinates
     * @param opt_out An optional point to receive the result
     */
    geoToPoint (geoPoint : H.geo.IPoint , opt_out ? : H.math.Point ) : H.math.Point ;
    /**
     * This method transforms geographical lat/lng coordinates to a projected point
     * in the range [0...1].
     * @param lat latitude A value indicating the latitude
     * @param lng longitude A value indicating the longitude
     * @param opt_out An optional point to receive the result
     */
    latLngToPoint (lat : number , lng : number , opt_out ? : H.math.Point ) : H.math.Point ;
    /**
     * This method transforms a projected point in the range [0...1] to a
     * geographical point.
     * @param point An object representing the point to convert
     * @param opt_out An optional geographical point object to receive the results
     */
    pointToGeo (point : H.math.IPoint , opt_out ? : H.geo.Point ) : H.geo.Point ;
    /**
     * This method transforms projected x/y coordinates in the range [0...1] to a
     * geographical point.
     * @param x A value indicating the x coordinate
     * @param y A value indicating the y coordinate
     * @param opt_out An optional point object to receive the result
     */
    xyToGeo (x : number , y : number , opt_out ? : H.geo.Point ) : H.geo.Point ;
  }
}
declare namespace H.geo {
  /**
   * A LineString is a geometry of connected line segments in geographic space.
   */
  class LineString extends H.geo.AbstractGeometry {
    /**
     * A LineString is a geometry of connected line segments in geographic space.
     * @param opt_latLngAlts An optional array of latitude, longitude and altitude triples to initialize the LineString with.
     */
    constructor (opt_latLngAlts ? : number [] ) ;
    /**
     * A utility method to iterate over the points of a line string.
     * @param eachFn The function to invoke for every point. It gets the point's latitude, longitude, altitude and index as arguments.
     * @param opt_start The point's start index (inclusive) to iterate from, defaults to `0`.
     * @param opt_end The point's end index (exclusive) to iterate to, defaults to `Infinity`.
     */
    eachLatLngAlt (eachFn : (a : number , b : number , c : number , d : number ) => any , opt_start ? : number , opt_end ? : number ) : void ;
    equals (other : any ) : boolean ;
    /**
     * This method extracts a {@link H.geo.Point} from this LineString at the virtual point
     * index. If the extracted point has an alt value, the LineString's altitude context
     * will be supplied to the point.
     * @param pointIndex the virtual point index in the LineString
     * @param opt_out an optional point object to store the lat, lng, alt values
     */
    extractPoint (pointIndex : number , opt_out ? : H.geo.Point ) : H.geo.Point ;
    /**
     * This method returns the bounding box of this LineString.
     *
     * Note: The LineString is treated as an open path. If the bounding rectangle for a
     * closed shape is required, the closing leg must be merged in an extra step.
     */
    getBoundingBox ( ) : H.geo.Rect | null ;
    /**
     * To obtain the number of times that this LineString cross the International Date Line.
     * @param opt_asClosed Indicates whether the LineString is treated as closed (the LineString's last and first coordinates form the closing leg of a polygon). It defaults to `false`.
     */
    getDBCs (opt_asClosed ? : boolean ) : number ;
    /**
     * Returns the vertices of the line segments as an array of alternating latitude, longitude and altitude coordinates.
     * The returned array must be treated as read-only to not violate the integrity of the line-string.
     */
    getLatLngAltArray ( ) : number [] ;
    /**
     * This method return the number of points stored in this LineString.
     */
    getPointCount ( ) : number ;
    /**
     * This method inserts one set of lat, lng, alt values into the LineString at the
     * specified index.
     * @param index the index at which to add the element
     * @param lat the latitude to insert
     * @param lng the longitude to insert
     * @param alt the altitude to insert
     */
    insertLatLngAlt (index : number , lat : number , lng : number , alt : number ) : void ;
    /**
     * This method inserts the lat, lng, alt values of a {@link H.geo.Point} into the list
     * at the specified index.
     */
    insertPoint (pointIndex : number , geoPoint : H.geo.IPoint ) : void ;
    /**
     * This method pushes a lat, lng, alt to the end of this LineString.
     */
    pushLatLngAlt (lat : number , lng : number , alt : number | undefined ) : void ;
    /**
     * This method pushes the lat, lng, alt values of a {@link H.geo.Point} to the end
     * of this LineString.
     */
    pushPoint (geoPoint : H.geo.IPoint ) : void ;
    /**
     * This method removes one set of lat, lng, alt values from the LineString at the
     * specified index.
     */
    removeLatLngAlt (index : number ) : void ;
    /**
     * This method removes one set of lat, lng, alt values from this LineString at the virtual point
     * index specified.
     * @param pointIndex the virtual point index
     */
    removePoint (pointIndex : number ) : void ;
    /**
     * This method splices the LineString at the provided index, removing the specified
     * number of items at that index and inserting the lat, lng, alt array.
     * @param index The index at which to splice
     * @param opt_nRemove The number of lat, lng, alt values to remove
     * @param opt_latLngAlts The lat, lng, alt values to add
     */
    spliceLatLngAlts (index : number , opt_nRemove ? : number , opt_latLngAlts ? : number [] ) : number [] ;
    /**
     * To obtain a [Flexible Polyline](https://github.com/heremaps/flexible-polyline)
     * encoded representation of the geometry.
     * @param precision How many decimal digits of precision to store the values, default is `5`.
     */
    toFlexiblePolyline (precision ? : number ) : string ;
    /**
     * Decodes the specified [Flexible Polyline](https://github.com/heremaps/flexible-polyline) and converts it to
     * the `LineString`.
     */
    static fromFlexiblePolyline (encodedPolyline : string ) : H.geo.LineString ;
    /**
     * This method initializes a new LineString with an array of lat, lng values. Arrays
     * are expected to have an even length with the format `[lat, lng, lat, lng, ...]`.
     * @param latLngs the array of lat, lng value.
     */
    static fromLatLngArray (latLngs : number [] ) : H.geo.LineString ;
    /**
     * To obtain whether a leg (formed by the given two longitudes) crosses the International Date Line.
     * @param lng1 The start longitude of the leg
     * @param lng2 The end longitude of the leg
     */
    static isDBC (a : number , b : number ) : boolean ;
  }
}
declare namespace H.geo {
  /**
   * The base class for a geometry that is a container for multiple geometries of a generic type.
   * The type of the contained geometries is specified by the generic type parameter `T`.
   */
  abstract class MultiGeometry < T = any > extends H.geo.AbstractGeometry {
    /**
     * The base class for a geometry that is a container for multiple geometries of a generic type.
     * The type of the contained geometries is specified by the generic type parameter `T`.
     * @param geometries The list of geometries which are initially aggregated.
     */
    constructor (geometries : T [] ) ;
    equals (other : any ) : boolean ;
    getBoundingBox ( ) : H.geo.Rect | null ;
    /**
     * Returns the aggregated geometries of the multi-geometry.
     * The returned geometries must be treated as read-only to not violate the integrity of the multi-geometry.
     */
    getGeometries ( ) : T [] ;
    /**
     * Adds the specified geometry to the current multi-geometry.
     * @param geometry A geometry which will be added to the current multi-geometry
     */
    push (geometry : T ) : void ;
    /**
     * Removes the specified geometry from the multi-geometry.
     * @param geometry The geometry (by reference) to remove from this multi-geometry.
     */
    remove (geometry : T ) : T ;
    /**
     * Removes a contained geometry at the given index.
     * @param index The index of the geometry to remove.
     */
    removeAt (index : number ) : T ;
    /**
     * This method splices the specified MultiGeometry at the provided index, removing the
     * specified number of items at that index and inserting new items.
     * @param index The index at which to start changing the list.
     * @param opt_deleteCount The number of geometries to remove.
     * @param opt_items The geometries to add.
     */
    splice (index : number , opt_deleteCount ? : number , opt_items ? : T [] ) : T [] ;
  }
}
declare namespace H.geo {
  /**
   * A MultiLineString is a collection of line strings represented as a
   * {@link H.geo.MultiGeometry} with a {@link H.geo.LineString} as generic type parameter `T`.
   */
  class MultiLineString extends H.geo.MultiGeometry < any > {
    /**
     * A MultiLineString is a collection of line strings represented as a
     * {@link H.geo.MultiGeometry} with a {@link H.geo.LineString} as generic type parameter `T`.
     * @param lineStrings The list of line-strings which are initially represented by the MultiLineString.
     */
    constructor (lineStrings : H.geo.LineString [] ) ;
  }
}
declare namespace H.geo {
  /**
   * A MultiPoint is a collection of points represented as a
   * {@link H.geo.MultiGeometry} with a {@link H.geo.Point} as generic type parameter `T`.
   */
  class MultiPoint extends H.geo.MultiGeometry < any > {
    /**
     * A MultiPoint is a collection of points represented as a
     * {@link H.geo.MultiGeometry} with a {@link H.geo.Point} as generic type parameter `T`.
     * @param points The list of points which are initially represented by the MultiPoint.
     */
    constructor (points : H.geo.IPoint [] ) ;
  }
}
declare namespace H.geo {
  /**
   * A MultiPolygon is a collection of polygons represented as a {@link H.geo.MultiGeometry}
   * with a {@link H.geo.Polygon} as generic type parameter `T`.
   */
  class MultiPolygon extends H.geo.MultiGeometry < any > {
    /**
     * A MultiPolygon is a collection of polygons represented as a {@link H.geo.MultiGeometry}
     * with a {@link H.geo.Polygon} as generic type parameter `T`.
     * @param polygons The list of polygons which are initially represented by the MultiPolygon.
     */
    constructor (polygons : H.geo.Polygon [] ) ;
  }
}
declare namespace H.geo {
  /**
   * `PixelProjection` transforms pixel world coordinates at a certain scale
   * (zoom level) to geographical coordinates and vice versa. By default, it uses
   * the Mercator projection to transform geographic points into the 2d plane map
   * points, which are adjusted to the current scale.
   */
  class PixelProjection {
    /**
     * `PixelProjection` transforms pixel world coordinates at a certain scale
     * (zoom level) to geographical coordinates and vice versa. By default, it uses
     * the Mercator projection to transform geographic points into the 2d plane map
     * points, which are adjusted to the current scale.
     * @param opt_projection An object representing the projection to use, the default is spherical Mercator {@link H.geo.mercator}
     * @param opt_sizeAtLevelZero A value indicating the size of a tile representation of the world in pixels at zoom level 0, the default is 256
     */
    constructor (opt_projection ? : H.geo.IProjection , opt_sizeAtLevelZero ? : number ) ;
    /**
     * This method translates a point defines in terms of its geographic coordinates
     * to pixel coordinates at the specified zoom level.
     * @param geoPoint An object containing the geographic coordinates
     * @param opt_out An optional point to store the result
     */
    geoToPixel (geoPoint : H.geo.IPoint , opt_out ? : H.math.IPoint ) : H.math.IPoint ;
    /**
     * This method retrieves the current zoom scale factor previously set by
     * a call to {@link H.geo.PixelProjection#rescale}.
     */
    getZoomScale ( ) : number ;
    /**
     * This property holds a value indicating the height of the world in pixels.
     */
    h : number ;
    /**
     * This method translates geographical coordinates (latitude, longitude)
     * supplied by the caller into a point defined in terms of pixel coordinates.
     * This method accepts longitudes outside of the normal longitude range.
     * @param latitude The latitude to translate
     * @param longitude The longitude to translate
     * @param opt_out An optional point to store the result
     */
    latLngToPixel (latitude : number , longitude : number , opt_out ? : H.math.IPoint ) : H.math.Point ;
    /**
     * This method translates a point defined in terms of its pixel coordinates to a
     * location defined in geographic coordinates.
     * @param point An object defining a location on the screen in terms of pixel coordinates
     * @param opt_out An optional point to store the result
     */
    pixelToGeo (point : H.math.IPoint , opt_out ? : H.geo.IPoint ) : H.geo.IPoint ;
    /**
     * This method method translates a map point to world pixel coordinates relative
     * to current projection offset.
     * @param point An object representing the map point to convert
     */
    pointToPixel (point : H.math.IPoint ) : H.math.Point ;
    /**
     * This property indicates the geographical projection that underlies the
     * given `PixelProjection`.
     */
    projection : H.geo.IProjection ;
    /**
     * This method updates the scale exponent for the pixel projection.
     * @param zoom A value indicating the zoom level
     */
    rescale (zoom : number ) : void ;
    /**
     * This property holds a value indicating the width of the world in pixels.
     */
    w : number ;
    /**
     * This property holds the x-offset in the projection relative to the top-left
     * corner of the screen.
     */
    x : number ;
    /**
     * This method translates the x and y coordinates of a pixel to a geographic point.
     * @param x A value indicating the pixel x-coordinate
     * @param y A value indicating the pixel y-coordinate
     * @param opt_out An optional point to store the result
     */
    xyToGeo (x : number , y : number , opt_out ? : H.geo.Point ) : H.geo.Point ;
    /**
     * This property holds the y-offset in the projection relative to the top-left
     * corner of the screen.
     */
    y : number ;
  }
}
declare namespace H.geo {
  /**
   * A Point represents a geographical point.
   */
  class Point extends H.geo.AbstractGeometry implements H.geo.IPoint {
    /**
     * A Point represents a geographical point.
     * @param lat A value indicating latitude
     * @param lng A value indicating longitude
     * @param opt_alt A value indicating altitude
     */
    constructor (lat : number , lng : number , opt_alt ? : number ) ;
    alt ? : number ;
    /**
     * Returns the distance between the point and the point supplied by the caller.
     * The method uses the Haversine formula. The altitude is not considered.
     * @param other An object representing the point to which to calculate the distance
     */
    distance (other : H.geo.IPoint ) : number ;
    equals (other : any ) : boolean ;
    getBoundingBox ( ) : H.geo.Rect ;
    lat : number ;
    lng : number ;
    /**
     * Returns the destination point, based on the given distance and bearing relative to the current point.
     * The algorithm is based on the Haversine formula. The altitude is ignored, instead the WGS84 Mean Radius is taken.
     * @param bearing The bearing to the destination in degrees
     * @param distance The distance to the destination in meters
     * @param opt_overGreatCircle `true` means that the computation is to use the "Great Circle", otherwise it uses "Rhumb Line".
     */
    walk (bearing : number , distance : number , opt_overGreatCircle ? : boolean ) : H.geo.Point ;
    /**
     * This method creates a `Point` instance from an `IPoint` object.
     * @param iPoint The `IPoint` object to use
     */
    static fromIPoint (iPoint : H.geo.IPoint ) : H.geo.Point ;
    /**
     * Validates the given instance of `Point`. It checks if
     * `lat`, `lng`, `alt` have valid types.
     * Additionally, the method checks if the value of the `lat` property is
     * in the range `[-90 ... +90]`, the modulo of the value of `lng` in the
     * range `[-180 ... +180]`, and it validates the `alt` property.
     * @param point An object representing the point to validate
     * @param opt_caller The caller to use to throw InvalidArgumentError, if omitted no error is thrown
     * @param opt_argNr The argument number to use for InvalidArgumentError
     */
    static validate (this : H.geo.Point , point : H.geo.IPoint , opt_caller ? : Function , opt_argNr ? : number ) : boolean ;
  }
}
declare namespace H.geo {
  /**
   * A polygon represents a plane figure that is defined by an exterior ring (finite chain of straight line segments)
   * and zero or more interior rings which are rendered by using the
   * [Even–odd rule](https://en.wikipedia.org/wiki/Even-odd_rule).
   * In a simple case each interior ring represents a hole within the polygon.
   *
   * Interior rings that intersects the exterior ring or that are outside the exterior ring are not supported.
   */
  class Polygon extends H.geo.AbstractGeometry {
    /**
     * A polygon represents a plane figure that is defined by an exterior ring (finite chain of straight line segments)
     * and zero or more interior rings which are rendered by using the
     * [Even–odd rule](https://en.wikipedia.org/wiki/Even-odd_rule).
     * In a simple case each interior ring represents a hole within the polygon.
     *
     * Interior rings that intersects the exterior ring or that are outside the exterior ring are not supported.
     * @param exterior The exterior ring of the polygon.
     * @param opt_interiors The interior rings of the polygon.
     */
    constructor (exterior : H.geo.LineString , opt_interiors ? : H.geo.LineString [] ) ;
    equals (other : any ) : boolean ;
    getBoundingBox ( ) : H.geo.Rect | null ;
    /**
     * To obtain the exterior ring of the polygon.
     */
    getExterior ( ) : H.geo.LineString ;
    /**
     * To obtain a reference to the list of interior rings of the polygon.
     */
    getInteriors ( ) : H.geo.LineString [] ;
    /**
     * To obtain whether this polygon covers the North or the South Pole.
     * See {@link H.geo.Polygon#setPoleCovering} for more details.
     */
    getPoleCovering ( ) : H.geo.Polygon.Direction ;
    /**
     * To add an interior ring.
     * @param interior The interior ring to add.
     */
    pushInterior (interior : H.geo.LineString ) : void ;
    /**
     * To remove the specified interior ring.
     * @param interior The interior ring to remove.
     */
    removeInterior (interior : H.geo.LineString ) : H.geo.LineString | undefined ;
    /**
     * To remove an interior ring at the given index.
     * @param opt_index The index of the interior ring to remove, defaults to `0`.
     */
    removeInteriorAt (opt_index ? : number ) : H.geo.LineString | undefined ;
    /**
     * To set the exterior ring of the polygon.
     * @param exterior The exterior ring to set
     */
    setExterior (exterior : H.geo.LineString ) : void ;
    /**
     * To specify whether this polygon covers the North or the South Pole.
     * This information is only needed for very special polygons that are defined as a line string around the world on
     * longitude axis (for example along the coast of the Antarctic).
     * In such cases, an additional information is needed to know if the southern part of the Earth (Antarctic)
     * or the northern part (anything except Antarctic) should be covered.
     * @param direction The direction to set.
     */
    setPoleCovering (direction : H.geo.Polygon.Direction ) : H.geo.Polygon ;
    /**
     * Applies a splice-operation on the list of interior rings of the polygon.
     * @param opt_index The index at which to start changing the list, defaults to `0`.
     * @param opt_deleteCount The number of interior rings to remove, defaults to `Infinity`.
     * @param var_args The interior rings to insert.
     */
    spliceInteriors (opt_index ? : number , opt_deleteCount ? : number ,  ...var_args : H.geo.LineString [] ) : H.geo.LineString [] ;
  }
}
declare namespace H.geo.Polygon {
  /**
   * See {@link H.geo.Polygon#setPoleCovering} for more details.
   */
  enum Direction {
    NORTH = 90.0 ,
    SOUTH = -90.0 ,
  }
}
declare namespace H.geo {
  /**
   * A Rect represents a rectangular geographic area defined by the geographic coordinates of its top-left
   * and bottom-right corners.
   */
  class Rect extends H.geo.AbstractGeometry {
    /**
     * A Rect represents a rectangular geographic area defined by the geographic coordinates of its top-left
     * and bottom-right corners.
     * @param top A value indicating the northern-most latitude
     * @param left A value indicating the left-most longitude
     * @param bottom A value indicating the southern-most latitude
     * @param right A value indicating the right-most latitude
     */
    constructor (top : number , left : number , bottom : number , right : number ) ;
    /**
     * This method clones the given rectangle.
     */
    clone ( ) : H.geo.Rect ;
    /**
     * This method checks if the latitude and longitude supplied by the caller
     * lie within the area of the given rectangular area.
     * @param lat A value representing the latitude
     * @param lng A value representing the longitude
     * @param opt_skipValidation A Boolean indicating whether to check the validity of the arguments (`true`)
     */
    containsLatLng (lat : number , lng : number , opt_skipValidation ? : boolean ) : boolean ;
    /**
     * This method checks if the point supplied by the caller lies within the area
     * of the given rectangular area.
     * @param geoPoint An object representing the point to check
     * @param opt_skipValidation A Boolean indicating whether to check validity of the arguments (`true`)
     */
    containsPoint (geoPoint : H.geo.IPoint , opt_skipValidation ? : boolean ) : boolean ;
    /**
     * This method checks if the rectangular area supplied by the caller
     * is completely contained within the given rectangular area.
     * @param geoRect An object representing the rectangular area to check
     * @param opt_skipValidation A Boolean indicating whether to check validity of the arguments (`true`)
     */
    containsRect (geoRect : H.geo.Rect , opt_skipValidation ? : boolean ) : boolean ;
    equals (other : any ) : boolean ;
    /**
     * This method retrieves the southern-most latitude of the given rectangular area.
     */
    getBottom ( ) : number ;
    /**
     * This method retrieves the bottom-right corner of the given rectangular area.
     */
    getBottomRight ( ) : H.geo.Point ;
    getBoundingBox ( ) : H.geo.Rect | null ;
    /**
     * This method retrieves the center point of the given rectangular area.
     */
    getCenter ( ) : H.geo.Point ;
    /**
     * This method retrieves the height of the given rectangular area in decimal degrees.
     */
    getHeight ( ) : number ;
    /**
     * This method retrieves the left-most longitude of the given rectangular area.
     */
    getLeft ( ) : number ;
    /**
     * This method retrieves the right-most longitude of the given rectangular area.
     */
    getRight ( ) : number ;
    /**
     * This method retrieves the north-most latitude of the given rectangular area.
     */
    getTop ( ) : number ;
    /**
     * This method retrieves the top-left corner of the given rectangular area.
     */
    getTopLeft ( ) : H.geo.Point ;
    /**
     * This method retrieves the width of the given rectangular area in decimal degrees.
     */
    getWidth ( ) : number ;
    /**
     * This method checks if the intersection of two bounding boxes is non-empty.
     * @param geoRect An object representing a rectangle object to test for intersection with the given rectangle
     * @param opt_skipValidation A Boolean indicating whether to check validity of the arguments (`true`)
     */
    intersects (geoRect : H.geo.Rect , opt_skipValidation ? : boolean ) : boolean ;
    /**
     * This method checks if the given rectangular area spans the date border.
     */
    isCDB ( ) : boolean ;
    /**
     * The method checks if the area enclosed by the given bounding box is 0.
     */
    isEmpty ( ) : boolean ;
    /**
     * This method retrieves the smallest bounding box that covers the given rectangular
     * area and the latitude and longitude supplied by the caller.
     * @param lat A value representing the latitude to check
     * @param lng A value representing the longitude to check
     * @param opt_skipValidation A Boolean indicating whether to check validity of the arguments (`true`)
     * @param opt_out An optional rectangle object to store the result
     */
    mergeLatLng (lat : number , lng : number , opt_skipValidation ? : boolean , opt_out ? : H.geo.Rect ) : H.geo.Rect ;
    /**
     * This method retrieves the smallest bounding box that covers the given rectangular
     * area and the point supplied by the caller.
     * @param geoPoint An object representing the point to include
     * @param opt_skipValidation A Boolean indicating whether to check validity of the arguments (`true`)
     * @param opt_out An optional rectangle object to store the result
     */
    mergePoint (geoPoint : H.geo.IPoint , opt_skipValidation ? : boolean , opt_out ? : H.geo.Rect ) : H.geo.Rect ;
    /**
     * This method retrieves the smallest bounding box that covers the given rectangle
     * area and the rectangle supplied by the caller.
     * @param geoRect An object representing the rectangle to include
     * @param opt_skipValidation A Boolean flag indicating whether to check validity of the arguments (`true`)
     * @param opt_out an optional rectangle object to store the result
     */
    mergeRect (geoRect : H.geo.Rect , opt_skipValidation ? : boolean , opt_out ? : H.geo.Rect ) : H.geo.Rect ;
    /**
     * This method retrieves the smallest bounding box that covers the given rectangle
     * area and the rectangle supplied by the caller as a set of coordinates.
     * @param top A value indicating the top latitude of the rectangle to include
     * @param left A value indicating the left longitude of the rectangle to include
     * @param bottom A value indicating the bottom latitude of the rectangle to include
     * @param right A value indicating the right longitude of the rectangle to include
     * @param opt_skipValidation A Boolean flag indicating whether to check validity of the arguments (`true`)
     * @param opt_out An optional rectangle object to store the result
     */
    mergeTopLeftBottomRight (top : number , left : number , bottom : number , right : number , opt_skipValidation ? : boolean , opt_out ? : H.geo.Rect ) : H.geo.Rect ;
    /**
     * This method clones the given bounding rectangle and resizes the clone if necessary
     * until the location supplied by the caller is at its center.
     * @param center A point object which is to be the center of the resized rectangular area
     * @param opt_out An optional rectangle object to store the result
     */
    resizeToCenter (center : H.geo.IPoint , opt_out ? : H.geo.Rect ) : H.geo.Rect ;
    /**
     * This method creates the minimum rectangular area covering all of the
     * coordinates in the array provided by the caller.
     * @param latLngAltArray An array of coordinates to cover
     * @param opt_skipValidation A Boolean indicating whether to check validity of the arguments (`true`)
     */
    static coverLatLngAlts (latLngAltArray : number [] , opt_skipValidation ? : boolean ) : H.geo.Rect | undefined ;
    /**
     * This method creates the minimum rectangular area covering all of the points
     * in the array provided by the caller.
     * @param pointArray An array of points to cover
     * @param opt_skipValidation A Boolean indicating whether to check validity of the arguments (`true`)
     */
    static coverPoints (pointArray : H.geo.IPoint [] , opt_skipValidation ? : boolean ) : H.geo.Rect | null ;
    /**
     * This method creates the smallest rectangular area covering all of the
     * rectangular areas in the array provided by the caller.
     * @param rectList A list of rectangle objects to cover
     * @param opt_skipValidation A Boolean indicating whether to check validity of the arguments (`true`)
     */
    static coverRects (rectList : H.geo.Rect [] , opt_skipValidation ? : boolean ) : H.geo.Rect | undefined ;
    /**
     * This method creates a rectangular area from a top-left and bottom-right
     * points provided by the caller.
     * @param topLeft An object representing the top-left corner of the area
     * @param bottomRight An object representing the bottom-right corner of the area
     * @param opt_skipValidation A Boolean flag indicating whether to check validity of the arguments (`true`)
     */
    static fromPoints (topLeft : H.geo.IPoint , bottomRight : H.geo.IPoint , opt_skipValidation ? : boolean ) : H.geo.Rect ;
    /**
     * This method merges two rectangle objects defines by their coordinates. The
     * result of the merge is a rectangle that covers the both provided rectangles.
     * @param topA A value representing the northern-most latitude
     * @param leftA A value representing the left-most longitude of operand A
     * @param bottomA A value representing the southern-most latitude of operand A
     * @param rightA A value representing the right-most latitude of operand A
     * @param topB A value representing the northern-most latitude of operand B
     * @param leftB A value representing the left-most longitude of operand B
     * @param bottomB A value representing the southern-most latitude of operand B
     * @param rightB A value representing the right-most latitude of operand B
     * @param opt_out An optional rectangle object to store the results
     */
    static merge (topA : number , leftA : number , bottomA : number , rightA : number , topB : number , leftB : number , bottomB : number , rightB : number , opt_out ? : H.geo.Rect ) : H.geo.Rect ;
  }
}
declare namespace H.geo {
  /**
   * This property represents a spherical Mercator projection. It represents the Earth as a sphere and
   * maps geographic coordinates to a corresponding two-dimensional space.
   * The `Map` uses this projection by default.
   */
  let mercator : H.geo.IProjection ;
}
declare namespace H.lang {
  /**
   * This class encapsulates an error to throw on an illegal operation.
   */
  class IllegalOperationError extends Error {
    /**
     * This class encapsulates an error to throw on an illegal operation.
     * @param opt_caller The calling function
     * @param opt_message The text of the error message to output
     */
    constructor (opt_caller ? : Function , opt_message ? : any ) ;
  }
}
declare namespace H.lang {
  /**
   * This class encapsulates an error to throw if an argument is invalid.
   */
  class InvalidArgumentError extends Error {
    /**
     * This class encapsulates an error to throw if an argument is invalid.
     * @param opt_caller The calling function
     * @param opt_argNr The index of the invalid argument (zero based)
     * @param opt_message The text of the error message to output
     */
    constructor (opt_caller ? : Function , opt_argNr ? : number , opt_message ? : any ) ;
  }
}
declare namespace H.lang {
  /**
   * This class encapsulates information about an error to throw if the value
   * supplied by the caller is out of range.
   */
  class OutOfRangeError extends Error {
    /**
     * This class encapsulates information about an error to throw if the value
     * supplied by the caller is out of range.
     * @param opt_caller The calling function
     * @param opt_val The value to check against the range specified by `opt_range`
     * @param opt_range Values defining the validity range (as [min, max])
     */
    constructor (opt_caller ? : Function , opt_val ? : number , opt_range ? : number [] ) ;
  }
}
declare namespace H.map {
  /**
   * The abstract base class for markers.
   * A Marker is a visual representation of locations on a map in the form of an icon.
   * Markers are rendered in screen space, that is although a marker is fixed to
   * its geographic location, its icon is always rendered independently of the map's zoom level.
   */
  abstract class AbstractMarker extends H.map.Object {
    /**
     * The abstract base class for markers.
     * A Marker is a visual representation of locations on a map in the form of an icon.
     * Markers are rendered in screen space, that is although a marker is fixed to
     * its geographic location, its icon is always rendered independently of the map's zoom level.
     * @param geometry The geographic location(s) of the marker
     * @param opt_options The options to initialize the marker
     */
    constructor (geometry : H.geo.IPoint | H.geo.MultiPoint , opt_options ? : H.map.AbstractMarker.Options ) ;
    /**
     * To obtain the marker's location(s).
     * If you modify the obtained geometry, you must call `setGeometry(geometry)` afterwards to not violate the
     * integrity of the marker.
     */
    getGeometry ( ) : H.geo.Point | H.geo.MultiPoint ;
    /**
     * This method retrieves the current icon associated with the given marker.
     */
    getIcon ( ) : H.map.Icon | H.map.DomIcon ;
    /**
     * To Set the marker's geographic location(s).
     * If you modify the given geometry afterwards, you must call `setGeometry(geometry)` again to not violate the
     * integrity of the marker.
     */
    setGeometry (geometry : H.geo.IPoint | H.geo.MultiPoint ) : H.map.AbstractMarker ;
    /**
     * This method sets the marker icon.
     * @param icon The new marker icon
     */
    setIcon (icon : H.map.Icon | H.map.DomIcon ) : H.map.AbstractMarker ;
  }
}
declare namespace H.map.AbstractMarker {
  type Options = { data : any , icon ? : H.map.Icon | H.map.DomIcon , max ? : number , min ? : number , provider ? : H.map.provider.ObjectProvider , visibility ? : boolean , volatility ? : boolean , zIndex ? : number } ;
}
declare namespace H.map {
  /**
   * This class represents style attributes for arrows to be rendered along a polyline.
   * An instance of `ArrowStyle` is always treated as immutable to avoid inconsistencies and must not modified.
   */
  class ArrowStyle {
    /**
     * This class represents style attributes for arrows to be rendered along a polyline.
     * An instance of `ArrowStyle` is always treated as immutable to avoid inconsistencies and must not modified.
     * @param opt_options An object containing initialization options
     */
    constructor (opt_options ? : H.map.ArrowStyle | H.map.ArrowStyle.Options ) ;
    /**
     * This method checks value-equality between the given object and an instance of
     * `ArrowStyle` provided by the caller.
     * @param other The arrow style object with which to compare the given object
     */
    equals (other : H.map.ArrowStyle | H.map.ArrowStyle.Options ) : boolean ;
  }
}
declare namespace H.map.ArrowStyle {
  type Options = { fillColor ? : string , frequency ? : number , length ? : number , width ? : number } ;
}
declare namespace H.map {
  /**
   * This event signalizes map-related changes.
   */
  class ChangeEvent extends H.util.ChangeEvent {
    /**
     * This event signalizes map-related changes.
     * @param type The type of the event
     * @param newValue The view values after the change
     * @param oldValue The view values before the change
     * @param modifiers A bitmask indicating which values were changed.
     */
    constructor (type : string , newValue : GlobalObject , oldValue : GlobalObject , modifiers : number ) ;
    /**
     * This modifier indicates a change to the "bounds" property. Use {@link H.map.ChangeEvent.Type} instead.
     */
    BOUNDS : number ;
    /**
     * This modifier indicates a change to the "heading" property. Use {@link H.map.ChangeEvent.Type} instead.
     */
    HEADING : number ;
    /**
     * This modifier indicates a change to the "incline" property. Use {@link H.map.ChangeEvent.Type} instead.
     */
    INCLINE : number ;
    /**
     * This modifier indicates a change to the "position" property. Use {@link H.map.ChangeEvent.Type} instead.
     */
    POSITION : number ;
    /**
     * This modifier indicates a change to the "size" property. Use {@link H.map.ChangeEvent.Type} instead.
     */
    SIZE : number ;
    /**
     * This modifier indicates a change to the "tilt" property. Use {@link H.map.ChangeEvent.Type} instead.
     */
    TILT : number ;
    /**
     * This modifier indicates a change to the "zoom" property. Use {@link H.map.ChangeEvent.Type} instead.
     */
    ZOOM : number ;
  }
}
declare namespace H.map.ChangeEvent {
  /**
   * This enumeration specifies the bits each indicating a change in a specific property of the map.
   */
  enum Type {
    BOUNDS = 64.0 ,
    HEADING = 4.0 ,
    INCLINE = 16.0 ,
    POSITION = 2.0 ,
    SIZE = 1.0 ,
    TILT = 8.0 ,
    ZOOM = 32.0 ,
  }
}
declare namespace H.map {
  /**
   * A Circle is a visual representation of a circular shaped surface on a map.
   */
  class Circle extends H.map.Polygon {
    /**
     * A Circle is a visual representation of a circular shaped surface on a map.
     * @param center The geographical coordinates of the center of the circle
     * @param radius The radius of the circle in meters
     * @param opt_options An object that specifies the initialization options of the circle (among these, `precision` has a significant impact on the shape of the circle - please see `H.map.Circle.Options`
     */
    constructor (center : H.geo.IPoint , radius : number , opt_options ? : H.map.Circle.Options ) ;
    /**
     * This method retrieves the center of the circle.
     * You must not modify the returned object without calling without calling
     * `setCenter()`  immediately afterwards.
     */
    getCenter ( ) : H.geo.IPoint ;
    getGeometry ( ) : H.geo.Polygon | H.geo.MultiPolygon ;
    /**
     * This method retrieves the precision of the given circle.
     */
    getPrecision ( ) : number ;
    /**
     * This method retrieves the length of the radius of the circle in meters.
     */
    getRadius ( ) : number ;
    /**
     * This method sets the geographical center of the circle.
     * If the specified center is an instance of `H.geo.Point`, you must not modify it without calling
     * `setCenter()` immediately afterwards.
     * @param center An object defining the geographical coordinates of the center of the circle
     */
    setCenter (center : H.geo.IPoint ) : void ;
    setGeometry (a ? : H.geo.Polygon | H.geo.MultiPolygon ) : H.map.Polygon ;
    /**
     * This method sets the precision of the circle (see {@link H.map.Circle.Options#precision}).
     * @param precision A value indicating precision
     */
    setPrecision (precision : number ) : void ;
    /**
     * This method sets the length of the radius of the circle in meters.
     * The value is restricted to the range of [0 ... 20015089.27787877]  (half of WGS84 mean circumference).
     */
    setRadius (radius : number ) : void ;
  }
}
declare namespace H.map.Circle {
  type Options = { data : any , elevation ? : number , extrusion ? : number , max ? : number , min ? : number , precision ? : number , provider ? : H.map.provider.ObjectProvider , style ? : H.map.SpatialStyle , visibility ? : boolean , volatility ? : boolean , zIndex ? : number } ;
}
declare namespace H.map {
  /**
   * This class represents the data model of the map. It holds a list of layers
   * that are rendered by map's `RenderEngine`. The class listens to
   * `update` events from layers and dispatches them to the
   * `RenderEngine`.
   */
  class DataModel extends H.util.OList {
    /**
     * This class represents the data model of the map. It holds a list of layers
     * that are rendered by map's `RenderEngine`. The class listens to
     * `update` events from layers and dispatches them to the
     * `RenderEngine`.
     * @param opt_layers An array of layers to be added to the data model
     */
    constructor (opt_layers ? : any [] ) ;
    /**
     * This method adds a layer to the data model, ensuring that layers are displayed
     * on the map following the order in which they were added.
     * @param layer The Layer to add
     * @param opt_idx index The index at which the new element should be inserted
     */
    add (layer : H.map.layer.Layer , opt_idx ? : number ) : void ;
    /**
     * This method removes all layers from the data model.
     */
    flush ( ) : void ;
    /**
     * This method removes a layer, which means that the layer is removed from the map.
     * @param layer The layer to be removed
     */
    remove (layer : H.map.layer.Layer ) : boolean ;
    /**
     * This method removes layer with the given index. This will effectively remove
     * the layer from the map.
     * @param idx index of the layer to be removed
     */
    removeAt (idx : number ) : H.map.layer.Layer ;
    /**
     * This method sets (replaces) a layer at the index specified by the caller.
     * @param idx The index at which to set the layer
     * @param layer A layer object to set
     */
    set (idx : number , layer : H.map.layer.Layer ) : H.map.layer.Layer | null ;
  }
}
declare namespace H.map {
  /**
   * This class provides a visual representation of a {@link H.map.DomMarker}.
   *
   * An instance of `DomIcon` needs to be created with a DOM element.
   * The DOM element works as a template for the visual representation of the marker, which
   * allows a single `DomIcon` to be reused in multiple
   * `DomMarkers`. The provided DOM node is cloned and
   * rendered every time the marker reaches (is visible within) the map view port, therefore
   * any previously attached event listeners do not execute. If listeners
   * for the DOM node are needed, please add them in the <i>onAttach</i> callback
   * where the currently displayed clone reference is available. The cloned node
   * listeners can be removed in the `onDetach` callback.
   *
   * The `onAttach` and `onDetach` callbacks can be provided to the icon by using
   * {@link H.map.DomIcon.Options}
   */
  class DomIcon {
    /**
     * This class provides a visual representation of a {@link H.map.DomMarker}.
     *
     * An instance of `DomIcon` needs to be created with a DOM element.
     * The DOM element works as a template for the visual representation of the marker, which
     * allows a single `DomIcon` to be reused in multiple
     * `DomMarkers`. The provided DOM node is cloned and
     * rendered every time the marker reaches (is visible within) the map view port, therefore
     * any previously attached event listeners do not execute. If listeners
     * for the DOM node are needed, please add them in the <i>onAttach</i> callback
     * where the currently displayed clone reference is available. The cloned node
     * listeners can be removed in the `onDetach` callback.
     *
     * The `onAttach` and `onDetach` callbacks can be provided to the icon by using
     * {@link H.map.DomIcon.Options}
     * @param element The element or markup to use for this icon
     * @param opt_options An object containing configuration properties
     */
    constructor (element : GlobalElement | string , opt_options ? : H.map.DomIcon.Options ) ;
  }
}
declare namespace H.map.DomIcon {
  type Options = { onAttach ? : (a : GlobalElement , b : H.map.DomIcon , c : H.map.DomMarker ) => any , onDetach ? : (a : GlobalElement , b : H.map.DomIcon , c : H.map.DomMarker ) => any } ;
}
declare namespace H.map {
  /**
   * A DomMarker is a visual representation of a location on a map in the form of a fully styleable and scripteable
   * DOM element.
   *
   * It should be only used where small numbers of markers with dynamic style and/or scripted
   * icons are to be displayed on the map (for example animated interactive SVG).
   * Otherwise a {@link H.map.Marker} should be preferred for performance reasons.
   */
  class DomMarker extends H.map.AbstractMarker {
    /**
     * A DomMarker is a visual representation of a location on a map in the form of a fully styleable and scripteable
     * DOM element.
     *
     * It should be only used where small numbers of markers with dynamic style and/or scripted
     * icons are to be displayed on the map (for example animated interactive SVG).
     * Otherwise a {@link H.map.Marker} should be preferred for performance reasons.
     * @param position The geographic location(s) of the marker
     * @param opt_options The options to initialize the marker
     */
    constructor (position : H.geo.IPoint | H.geo.MultiPoint , opt_options ? : H.map.DomMarker.Options ) ;
  }
}
declare namespace H.map.DomMarker {
  type Options = { data : any , icon ? : H.map.DomIcon , max ? : number , min ? : number , provider ? : H.map.provider.ObjectProvider , visibility ? : boolean , zIndex ? : number } ;
}
declare namespace H.map {
  /**
   * Instances of this class represent map features with an associated arbitrary data
   */
  class Feature extends H.util.EventTarget {
    /**
     * Instances of this class represent map features with an associated arbitrary data
     * @param data Any arbitrary value associated with the feature.
     */
    constructor (data : any ) ;
    /**
     * To retrieve arbitrary data associated with the given object.
     */
    getData ( ) : any ;
  }
}
declare namespace H.map {
  /**
   * A GeoShape is the abstract base class for visual representation of two-dimensional geographical objects whose shape
   * is defined by a H.geo.AbstractGeometry.
   */
  abstract class GeoShape extends H.map.Spatial {
    /**
     * A GeoShape is the abstract base class for visual representation of two-dimensional geographical objects whose shape
     * is defined by a H.geo.AbstractGeometry.
     * @param isClosed Indicates whether the geographical shape is closed (a polygon)
     * @param options The initialization options (attributes) to apply
     */
    constructor (isClosed : boolean , options : H.map.Spatial.Options ) ;
    /**
     * Returns the smallest rectangle which encloses the whole geometry of the GeoShape.
     */
    abstract getBoundingBox ( ) : H.geo.Rect | null ;
  }
}
declare namespace H.map {
  /**
   * A group is a container for other map objects.
   * Its visibility, zIndex and object-order affect the contained map objects.
   */
  class Group extends H.map.Object {
    /**
     * A group is a container for other map objects.
     * Its visibility, zIndex and object-order affect the contained map objects.
     * @param opt_options An optional object containing initialization values
     */
    constructor (opt_options ? : H.map.Group.Options ) ;
    /**
     * This method adds an object to the group.
     */
    addObject (object : H.map.Object ) : H.map.Object ;
    /**
     * This method appends a list of objects to the given group.
     */
    addObjects (objects : H.map.Object [] ) : void ;
    contains (object : any ) : boolean ;
    /**
     * This method invokes a provided callback once per object in add order.
     * The callback receives the following arguments:
     * - the currently traversed object
     * - the index of the object
     * - the group itself
     * @param opt_recursive A Boolean value indicating whether sub-groups should be traversed recursively
     * @param opt_context The context to use as "this" within the callback
     */
    forEach (callback : (a : H.map.Object , b : number , c : H.map.Group ) => any , opt_recursive ? : boolean , opt_context ? : any ) : void ;
    /**
     * This method retrieves the rectangular bounding box for the group. The bounding box
     * is the smallest rectangle that covers all objects. If the group does not contain
     * any objects, the method returns `null`.
     */
    getBoundingBox ( ) : H.geo.Rect ;
    /**
     * This method retrieves a list of all objects of this group.
     * On groups with many children this method can cause a higher memory and CPU consumption.
     * Alternatively you case use {@link H.map.Group#forEach}
     * @param opt_recursive Indicates whether objects in sub-groups are also collected .
     */
    getObjects (opt_recursive ? : boolean ) : H.map.Object [] ;
    invalidate (flags : number ) : boolean ;
    /**
     * This method removes all objects from the group.
     */
    removeAll ( ) : void ;
    /**
     * This method removes an object from the group.
     * @param object The object to remove
     */
    removeObject (object : H.map.Object ) : H.map.Object ;
    /**
     * This method removes objects from the group.
     * @param objects A list of objects to remove
     */
    removeObjects (objects : H.map.Object [] ) : void ;
    /**
     * To obtain a GeoJSON `FeatureCollection` object representing the given group.
     * @param opt_callback Callback called with the object's data as argument. It must return either a valid JSON object or `null` which will be set as value for the Feature's properties key.
     */
    toGeoJSON (opt_callback ? : (a : any ) => any ) : GlobalObject ;
  }
}
declare namespace H.map.Group {
  type Options = { data : any , max ? : number , min ? : number , objects ? : H.map.Object [] , provider ? : H.map.provider.ObjectProvider , visibility ? : boolean , volatility ? : boolean , zIndex ? : number } ;
}
declare namespace H.map {
  /**
   * This class represents an area that objects, such as a marker, occupy in the
   * screen space. Such objects can be probed and returned by {@link H.Map@getObjectsAt} method.
   */
  class HitArea {
    /**
     * This class represents an area that objects, such as a marker, occupy in the
     * screen space. Such objects can be probed and returned by {@link H.Map@getObjectsAt} method.
     * @param shapeType The shape type of the HitArea. The shape type `NONE` can be used to prevent positive probes for the whole area. The types (`RECT`, `CIRCLE`, `POLYGON`) specify a geometrical shape for positive at this shape.
     * @param opt_coords The coordinates to define the geometry of the shape. All values are treated as CSS pixels in screen space. The x-coordinates increase to the right; y-coordinates increase from top to bottom. Every `shapeType` requires its own format for the `opt_coords` value:\ - `NONE`: The value is ignored and can be omitted.\ - `RECT`: The mandatory value is two `x,y` pairs: left, top, right, bottom.\ - `CIRCLE`: The mandatory value is `x,y,r` where `x,y` is a pair specifying the center of the circle and `r` is a value for the radius.\ - `POLYGON`: The mandatory value is a set of `x,y` pairs for each point in the polygon: `x1,y1,x2,y2,x3,y3` and so on.
     */
    constructor (shapeType : H.map.HitArea.ShapeType , opt_coords ? : number [] ) ;
  }
}
declare namespace H.map.HitArea {
  /**
   * The possible shape types that are supported by `HitArea`.
   */
  enum ShapeType {
    CIRCLE = 2.0 ,
    NONE = 0.0 ,
    POLYGON = 3.0 ,
    RECT = 1.0 ,
  }
}
declare namespace H.map {
  /**
   * This interface defines methods used for direct view manipulation.
   */
  interface IControl {
    /**
     * To control a look-at-point animation in screen space. Before the look-at-point can be controlled
     * the method {@link H.map.IControl.prototype.startControl} must be invoked once. The animation
     * can be finished via {@link H.map.IControl.prototype.endControl}
     * @param moveX The movement along the x-axis in pixels per second
     * @param moveY The movement along the y-axis in pixels per second
     * @param moveZ The movement along the z-axis in zoom-levels per second
     * @param rotateX The rotation around the x-axis in degrees per second
     * @param rotateY The rotation around the y-axis in degrees per second
     * @param rotateZ The rotation around the z-axis in degrees per second
     */
    control (moveX : number , moveY : number , moveZ : number , rotateX : number , rotateY : number , rotateZ : number ) : void ;
    /**
     * To finish the control of a look-at-point animation. See also
     * {@link H.map.IControl.prototype.startControl} and {@link H.map.IControl.prototype.control}
     * @param opt_preventKinetics Indicates whether a kinetic effect at the end of the controlled animation is prevented.
     * @param opt_adjustView A custom function to adjust the final view. It receives the last requested look-at data from the view model and has to return a possibly modified {@link H.map.ViewModel.ILookAtData} which is used instead.
     */
    endControl (opt_preventKinetics ? : boolean , opt_adjustView ? : (a : H.map.ViewModel.ILookAtData ) => any ) : void ;
    /**
     * To start the controlling of the look-at-point animation. After this method was invoked, the look-at-point
     * animation can be controlled by several calls of {@link H.map.IControl.prototype.control} and
     * finished by a call of {@link H.map.IControl.prototype.endControl}
     * @param opt_kinetics Kinetics settings
     * @param opt_atX The x screen coordinate at which control starts
     * @param opt_atY The y screen coordinate at which control starts
     */
    startControl (opt_kinetics ? : H.util.kinetics.IKinetics , opt_atX ? : number , opt_atY ? : number ) : void ;
  }
}
declare namespace H.map {
  /**
   * This interface defines the elements of a copyright notice.
   */
  interface ICopyright {
    /**
     * This property represents the detailed textual representation of a copyright
     * note, for example "copyright 2009 DigitalGlobe, Inc."
     */
    alt : string ;
    /**
     * This property represents a copyright label, a short textual representation of
     * the copyright note, for example "DigitalGlobe 2009".
     */
    label : string ;
  }
}
declare namespace H.map {
  /**
   * This interface represents an interaction with the view port. Interaction reflects view changes,
   * depending on the interaction coordinates and the modifiers which specify the type
   * of interaction.
   */
  namespace IInteraction {
    function /**
     * This method ends the interaction and applies a kinetic movement, if it was defined by
     * using the method `startInteraction()`.
     * @param opt_preventKinetics A Boolean value indicating whether to prevent kinetic behaviour at the end of an interaction (`true`) or allow it (`false`)
     */
    endInteraction (opt_preventKinetics ? : boolean ) : void ;
    function /**
     * This method resolves direct screen (view port) interaction. It modifies the current
     * view using the arguments provided by the caller.
     * @param x viewport x coordinate
     * @param y viewport y coordinate
     * @param opt_bx x coordinate for second pointer/touch if present
     * @param opt_by y coordinate for second pointer/touch if present
     * @param opt_timestamp The known timestamp to use
     */
    interaction (x : number , y : number , opt_bx ? : number , opt_by ? : number , opt_timestamp ? : number ) : void ;
    function /**
     * This method starts an interaction with the view port. It should be called
     * every time when a new interaction is started, for example on mouse grab or touch start.
     * @param modifiers Specifies what operations should performed during every interaction
     * @param opt_kinetics Specifies the kinetic move at the end of interaction
     */
    startInteraction (modifiers : number , opt_kinetics ? : H.util.kinetics.IKinetics ) : void ;
  }
  interface IInteraction {
  }
}
declare namespace H.map {
  /**
   * A visual representation of the {@link H.map.Marker}.
   */
  class Icon extends H.util.EventTarget {
    /**
     * A visual representation of the {@link H.map.Marker}.
     * @param bitmap An image URL, an SVG (string), an bitmap image or a canvas.
     * @param opt_options an object containing icon initialization attributes such as width and height, etc.
     */
    constructor (bitmap : string | HTMLImageElement | HTMLCanvasElement , opt_options ? : H.map.Icon.Options ) ;
    /**
     * Retrieves the anchor point of the given icon or `null` if an anchor was
     * not specified in the constructor options
     * and the state of this icon is not {@link H.map.Icon.State.READY}.
     */
    getAnchor ( ) : H.math.Point | null ;
    /**
     * Retrieves the bitmap of the give icon or `null` if the bitmap is not yet ready
     * (see {@link H.map.Icon#getState})
     */
    getBitmap ( ) : HTMLImageElement | null | HTMLCanvasElement ;
    /**
     * Retrieves the hit area of the icon.
     */
    getHitArea ( ) : H.map.HitArea | null ;
    /**
     * Retrieves the size of the given icon or `null` if a size was not specified in the constructor
     * options and the state of the icon is not {@link H.map.Icon.State.READY}
     */
    getSize ( ) : H.math.Size | null ;
    /**
     * Retrieves the bitmap loading state of the given icon object.
     */
    getState ( ) : H.map.Icon.State ;
  }
}
declare namespace H.map.Icon {
  type Options = { anchor ? : H.math.IPoint , crossOrigin ? : string , hitArea ? : H.map.HitArea , size ? : H.math.ISize , stickColor ? : string , stickHeight ? : number } ;
  /**
   * The state types of an Icon
   */
  enum State {
    ERROR ,
    LOADING ,
    READY ,
  }
}
declare namespace H.map {
  /**
   * This class encapsulates the brand, copyright and terms of use information displayed on the map.
   */
  class Imprint extends H.util.Disposable implements H.util.ICapturable {
    /**
     * This class encapsulates the brand, copyright and terms of use information displayed on the map.
     * @param map The map object with which the imprint information is associated
     * @param opt_options The configuration options for the imprint information
     */
    constructor (map : H.Map , opt_options ? : H.map.Imprint.Options ) ;
    /**
     * Method adds "Terms of use" L11N string to the available collection.
     * @param tag IETF language tag
     * @param value localisation string
     */
    addL11NString (tag : string , value : string ) : void ;
    capture (canvas : HTMLCanvasElement , pixelRatio : number , callback : (a : HTMLCanvasElement ) => any , opt_errback ? : (a : string ) => any ) : void ;
    disposeInternal : ( ) => void ;
    /**
     * This method retrieves the copyright string for the current view of the map.
     */
    getCopyrights ( ) : string ;
    /**
     * This method sets the imprint options.
     * If the argument `opt_options` is not defined, then all values are reset
     * to defaults.
     * @param opt_options The options to style the imprint
     */
    setOptions (opt_options ? : H.map.Imprint.Options ) : void ;
  }
}
declare namespace H.map.Imprint {
  type Options = { font ? : string , href ? : string , invert ? : boolean , locale ? : string , mark ? : string } ;
}
declare namespace H.map {
  /**
   * A Marker is a visual representation of a location on a map in the form of a static bitmap icon.
   *
   * With the `WEBGL` engine {@link H.Map.EngineType} markers can be elevated from the ground level
   * if altitude is specified. Altitude is defined in meters. Supported maximum value is `32767`.
   */
  class Marker extends H.map.AbstractMarker {
    /**
     * A Marker is a visual representation of a location on a map in the form of a static bitmap icon.
     *
     * With the `WEBGL` engine {@link H.Map.EngineType} markers can be elevated from the ground level
     * if altitude is specified. Altitude is defined in meters. Supported maximum value is `32767`.
     * @param position The geographic location(s) of the marker
     * @param opt_options The options to initialize the marker
     */
    constructor (position : H.geo.IPoint | H.geo.MultiPoint , opt_options ? : H.map.Marker.Options ) ;
    invalidate (flags : number ) : boolean ;
    setIcon (icon : H.map.Icon | H.map.DomIcon ) : H.map.AbstractMarker ;
  }
}
declare namespace H.map.Marker {
  type Options = { data : any , icon ? : H.map.Icon , max ? : number , min ? : number , provider ? : H.map.provider.ObjectProvider , visibility ? : boolean , volatility ? : boolean , zIndex ? : number } ;
}
declare namespace H.map {
  /**
   * An Object is the abstract base class for visual representational objects on a map, such as
   * polylines, polygons, markers, groups, overlays, etc.
   */
  abstract class Object extends H.map.Feature {
    /**
     * An Object is the abstract base class for visual representational objects on a map, such as
     * polylines, polygons, markers, groups, overlays, etc.
     * @param opt_options An object containing the initialization values for the given object
     */
    constructor (opt_options ? : H.map.Object.Options ) ;
    /**
     * This method compares the rendering z-order of the given object with another object.
     * (The 'given object' mean the object on which the method has been invoke.)
     * @param other The map object with which to compare the given object.
     */
    compareZOrder (other : H.map.Object ) : number ;
    /**
     * This method checks whether the received object is an inclusive descendant of the given object.
     * @param object The object to check.
     */
    contains (object : any ) : boolean ;
    /**
     * Indicates whether the map object will be considered as target for drag events. The default value is `false`
     */
    draggable : boolean ;
    /**
     * This method retrieves the ID of the given object.
     */
    getId ( ) : any ;
    /**
     * This method retrieves the invalidation states for the given object.
     */
    getInvalidations ( ) : H.map.provider.Invalidations ;
    /**
     * This method retrieves the parent group which contains the given object or `null` if
     * the object is not contained in any group.
     */
    getParentGroup ( ) : H.map.Group | null ;
    /**
     * This method obtains the current provider of the given object.
     */
    getProvider ( ) : H.map.provider.ObjectProvider | null ;
    /**
     * This method retrieves the remote ID of the given object.
     */
    getRemoteId ( ) : number | string | undefined ;
    /**
     * The root object to which the given object is attached or the object itself if
     * it is not attached to another.
     */
    getRootGroup ( ) : H.map.Object ;
    /**
     * This method retrieves a value indicating the visibility of the given object.
     * @param opt_effective Indicates whether the effective visibility is requested, defaults to `false`. If set to `true` the visibility of all nesting parent groups on the ancestor axis are also taken into account: The object is only visible if the object itself and all of its nesting parent groups are visible.
     */
    getVisibility (opt_effective ? : boolean ) : boolean ;
    /**
     * To obtain the volatility indicator of the object.
     * @param opt_effective Indicates whether the effective volatility is requested, defaults to `false`. If set to `true` the volatility of all nesting parent groups on the ancestor axis are also taken into account: The object is volatile if the object itself or at least one of its nesting parent groups is volatile.
     */
    getVolatility (opt_effective ? : boolean ) : boolean ;
    /**
     * This method retrieves the z-index of the given object.
     */
    getZIndex ( ) : number | undefined ;
    /**
     * This method invalidates the given map object.
     * @param flags The value indicates the types of invalidations to the given object.
     */
    invalidate (flags : number ) : boolean ;
    /**
     * This method stores arbitrary data associated with the given object.
     * @param data The data to be stored
     */
    setData (data : any ) : H.map.Object ;
    /**
     * This method sets the ID that identifies the given object in a remote service.
     * @param id The identifier to assign to the given object.
     */
    setRemoteId (id : number | string ) : H.map.Object ;
    /**
     * This method sets the visibility of the given object.
     * @param opt_visibility Indicates whether the map object should be visible, the default value is `false`.
     */
    setVisibility (opt_visibility ? : boolean ) : H.map.Object ;
    /**
     * To set the volatility indicator of the object
     * @param opt_volatility The volatility value to set, `true` means volatile, `false` means non-volatile. The default value is `false`.
     */
    setVolatility (opt_volatility ? : boolean ) : H.map.Object ;
    /**
     * This method sets the z-index of the given object.
     * @param zIndex A value indicating the new z-index
     */
    setZIndex (zIndex : number | undefined ) : H.map.Object ;
    /**
     * To obtain a GeoJSON `Feature` object representing the given map object.
     * @param opt_callback Callback called with the object's data as argument. It must return either a valid JSON object or `null` which will be set as value for the Feature's properties key.
     */
    toGeoJSON (opt_callback ? : (a : any ) => any ) : GlobalObject ;
    /**
     * This method compares the z-order of two objects. It can be useful when
     * sorting a list of objects using the `sort()` method on `Array`
     * @param first The first object to compare
     * @param second The second object to compare
     */
    static compareZOrder (first : H.map.Object , second : H.map.Object ) : number ;
  }
}
declare namespace H.map.Object {
  type Options = { data : any , max ? : number , min ? : number , provider ? : H.map.provider.ObjectProvider , visibility ? : boolean , volatility ? : boolean , zIndex ? : number } ;
  /**
   * This object defines the supported types of map objects.
   */
  enum Type {
    ANY ,
    DOM_MARKER = 8.0 ,
    GROUP = 16.0 ,
    MARKER = 4.0 ,
    OVERLAY = 1.0 ,
    SPATIAL = 2.0 ,
  }
}
declare namespace H.map {
  /**
   * A Overlay is a visual representation of a rectangular area on a map in the form of a bitmap.
   * Overlays are rendered in projected geographical space.
   */
  class Overlay extends H.map.Object {
    /**
     * A Overlay is a visual representation of a rectangular area on a map in the form of a bitmap.
     * Overlays are rendered in projected geographical space.
     * @param boundingBox A rectangular area of the overlay defined in terms of the geographical coordinates of its top-left and bottom-right corners.
     * @param bitmap An image URL, an SVG image (markup), a bitmap image or a canvas.
     * @param opt_options Initialization values for the overlay (optional)
     */
    constructor (boundingBox : H.geo.Rect , bitmap : string | HTMLImageElement | HTMLCanvasElement , opt_options ? : H.map.Overlay.Options ) ;
    /**
     * This method retrieves the current bitmap of the overlay.
     */
    getBitmap ( ) : HTMLImageElement | null | HTMLCanvasElement ;
    /**
     * This method retrieves the current bounding box of the overlay. This method has been deprecated,
     * use {@link H.map.Overlay#getGeometry} instead.
     */
    getBoundingBox ( ) : H.geo.Rect ;
    /**
     * This method retrieves the current geometry of the overlay.
     */
    getGeometry ( ) : H.geo.Rect ;
    /**
     * This method retrieves the opacity of the overlay.
     */
    getOpacity ( ) : number ;
    /**
     * This method sets the bitmap for the given overlay.
     * @param bitmap An image URL, an SVG image (markup), a bitmap image or a canvas.
     * @param opt_crossOrigin The value to use for the `crossOrigin` attribute of the overlay image. If omitted the attribute is not set.
     */
    setBitmap (bitmap : string | HTMLImageElement | HTMLCanvasElement , opt_crossOrigin ? : string ) : H.map.Overlay ;
    /**
     * This method sets the bounding box of the overlay. This method has been deprecated,
     * use {@link H.map.Overlay#setGeometry} instead.
     * @param boundingBox A bounding box to set.
     */
    setBoundingBox (boundingBox : H.geo.Rect ) : H.map.Overlay ;
    /**
     * This method sets the bounding box of the overlay.
     * If the given geometry is modified afterwards, it must be set again via `setGeometry(geometry)` to not violate the
     * integrity of the overlay.
     * @param geometry A geometry to set.
     */
    setGeometry (geometry : H.geo.Rect ) : H.map.Overlay ;
    /**
     * This method sets the opacity of the overlay.
     * @param opacity A value representing opacity; must be in the range from 0 (transparent) to 1 (opaque).
     */
    setOpacity (opacity : number ) : H.map.Overlay ;
  }
}
declare namespace H.map.Overlay {
  type Options = { crossOrigin ? : string | null , data : any , max ? : number , min ? : number , provider ? : H.map.provider.ObjectProvider , visibility ? : boolean , volatility ? : boolean , zIndex ? : number } ;
}
declare namespace H.map {
  /**
   * A Polygon is a visual representation of a surface on a map.
   */
  class Polygon extends H.map.GeoShape {
    /**
     * A Polygon is a visual representation of a surface on a map.
     * @param geometry The geometry that defines the surface of the polygon. If a `H.geo.LineString` is passed it is used as an exterior ring of a `H.geo.Polygon`.
     * @param opt_options An optional object containing initialization parameters
     */
    constructor (geometry : H.geo.LineString | H.geo.Polygon | H.geo.MultiPolygon , opt_options ? : H.map.Polygon.Options ) ;
    getBoundingBox ( ) : H.geo.Rect | null ;
    /**
     * Returns elevation of the polygon in meters.
     */
    getElevation ( ) : number ;
    /**
     * Returns extrusion of the polygon in meters.
     */
    getExtrusion ( ) : number ;
    /**
     * To obtain the polygon's geometry.
     * If you modify the obtained geometry, you must call `setGeometry` afterwards to not violate the
     * integrity of the polygon.
     */
    getGeometry ( ) : H.geo.Polygon | H.geo.MultiPolygon ;
    /**
     * Sets elevation of the polygon in meters.
     * @param elevation The elevation in meters. Must be greater than or equal to `0`. The maximum supported cumulative height (`elevation + extrusion`) is {@link H.map.Polygon.MAX_EXTRUDE_HEIGHT}.
     */
    setElevation (elevation : number ) : void ;
    /**
     * To set the extrusion of the polygon in meters.
     * @param extrusion The extrusion in meters. Must be greater than or equal to `0`. The maximum supported cumulative height (`elevation + extrusion`) is {@link H.map.Polygon.MAX_EXTRUDE_HEIGHT}.
     */
    setExtrusion (extrusion : number ) : void ;
    /**
     * To set the polygon's geometry.
     * If the given geometry is modified afterwards, it must be set via `setGeometry` again to not violate the
     * integrity of the polygon.
     */
    setGeometry (geometry : H.geo.Polygon | H.geo.MultiPolygon ) : H.map.Polygon ;
    /**
     * The maximum supported height (elevation + extrusion) of the spatial object.
     */
    static MAX_EXTRUDE_HEIGHT : number ;
  }
}
declare namespace H.map.Polygon {
  type Options = { arrows ? : H.map.ArrowStyle | H.map.ArrowStyle.Options , data : any , elevation ? : number , extrusion ? : number , max ? : number , min ? : number , provider ? : H.map.provider.ObjectProvider , style ? : H.map.SpatialStyle.Options , visibility ? : boolean , volatility ? : boolean , zIndex ? : number } ;
}
declare namespace H.map {
  /**
   * A Polyline is a visual representation of connected line segments on a map.
   */
  class Polyline extends H.map.GeoShape {
    /**
     * A Polyline is a visual representation of connected line segments on a map.
     * @param geometry The geometry that defines the line segments of the polyline
     * @param opt_options An optional object that contains the configuration options for a polyline
     */
    constructor (geometry : H.geo.LineString | H.geo.MultiLineString , opt_options ? : H.map.Spatial.Options ) ;
    /**
     * Clips the geometry of the Polyline to a rectangular area
     * @param geoRect The rectangle to clip against.
     */
    clip (geoRect : H.geo.Rect ) : number [] [] ;
    getBoundingBox ( ) : H.geo.Rect | null ;
    /**
     * To obtain the polyline's geometry.
     * If you modify the obtained geometry, you must call `setGeometry(geometry)` afterwards to not violate the
     * integrity of the polyline.
     */
    getGeometry ( ) : H.geo.LineString | H.geo.MultiLineString ;
    /**
     * To set the polyline's geometry.
     * If the given geometry is modified afterwards, it must be set again via `setGeometry(geometry)` to not violate the
     * integrity of the polyline.
     * @param geometry the geometry to set.
     */
    setGeometry (geometry : H.geo.LineString | H.geo.MultiLineString ) : H.map.Polyline ;
  }
}
declare namespace H.map.Polyline {
  type Options = { arrows ? : H.map.ArrowStyle | H.map.ArrowStyle.Options , data : any , max ? : number , min ? : number , provider ? : H.map.provider.ObjectProvider , style ? : H.map.SpatialStyle.Options , visibility ? : boolean , volatility ? : boolean , zIndex ? : number } ;
}
declare namespace H.map {
  /**
   * A Rect is a visual representation of a rectangular shaped surface on a map.
   */
  class Rect extends H.map.Polygon {
    /**
     * A Rect is a visual representation of a rectangular shaped surface on a map.
     * @param boundingBox The geographical bounding box for the rectangle
     * @param opt_options An object containing configuration options.
     */
    constructor (boundingBox : H.geo.Rect , opt_options ? : H.map.Rect.Options ) ;
    getBoundingBox ( ) : H.geo.Rect | null ;
    getGeometry ( ) : H.geo.Polygon | H.geo.MultiPolygon ;
    /**
     * This method sets the bounding box of the given rectangle.
     * @param boundingBox The bounding box to set
     */
    setBoundingBox (boundingBox : H.geo.Rect ) : void ;
    setGeometry (a ? : H.geo.Polygon | H.geo.MultiPolygon ) : H.map.Polygon ;
  }
}
declare namespace H.map.Rect {
  type Options = { arrows ? : H.map.ArrowStyle | H.map.ArrowStyle.Options , data : any , elevation ? : number , extrusion ? : number , max ? : number , min ? : number , provider ? : H.map.provider.ObjectProvider | null , style ? : H.map.SpatialStyle.Options , visibility ? : boolean , volatility ? : boolean , zIndex ? : number } ;
}
declare namespace H.map {
  /**
   * A Spatial is the abstract base class for visual representation of two-dimensional geographical objects.
   */
  abstract class Spatial extends H.map.Object {
    /**
     * A Spatial is the abstract base class for visual representation of two-dimensional geographical objects.
     * @param isClosed Indicates whether this spatial object represents a closed shape (`true`) or not (`false`)
     * @param opt_options The configuration options to apply
     */
    constructor (isClosed : boolean , opt_options ? : H.map.Spatial.Options ) ;
    /**
     * This method retrieves the arrow style of the given spatial object or
     * `undefined` if the style is not defined. The returned arrow style is treated as
     * immutable and must not be modified afterwards to prevent inconsistencies!
     */
    getArrows ( ) : H.map.ArrowStyle | undefined ;
    /**
     * This method retrieves the drawing style of the given spatial object. The
     * returned style is treated as immutable and must not be modified afterwards to
     * prevent inconsistencies!
     */
    getStyle ( ) : H.map.SpatialStyle ;
    /**
     * This method indicates whether this spatial object represents a closed shape.
     */
    isClosed ( ) : boolean ;
    /**
     * This method sets the arrow style of the given spatial object.
     *
     * Valid only when using map engine type `H.Map.EngineType['P2D']`.
     *
     * With engine type `H.Map.EngineType['WEBGL']`, an arrows style for the given spatial object can be set within
     * the `style` property in the configuration options object passed to the constructor or in the
     * style object argument provided to the `setStyle` method.<br>
     * See properties `lineDash`, `lineDashOffset`, `lineTailCap` and `lineHeadCap` in
     * {@link H.map.SpatialStyle.Options} for more details.
     * @param opt_arrows The arrow style to be applied
     */
    setArrows (opt_arrows ? : H.map.ArrowStyle | H.map.ArrowStyle.Options ) : H.map.Spatial ;
    /**
     * This method sets the drawing style of the given spatial object.  If the
     * argument `opt_style` is an instance of {@link H.map.SpatialStyle},
     * it is treated as immutable and must not be modified afterwards to prevent
     * inconsistencies!
     * .
     * @param opt_style The style to set. If it evaluates to a `false`, the {@link H.map.SpatialStyle.DEFAULT_STYLE} is used.
     */
    setStyle (opt_style ? : H.map.SpatialStyle.Options ) : H.map.Spatial ;
  }
}
declare namespace H.map.Spatial {
  type Label = { angle : number , color : string , font : string , lines : string [] , size : number , x : number , y : number } ;
  type Options = { arrows ? : H.map.ArrowStyle | H.map.ArrowStyle.Options , data : any , max ? : number , min ? : number , provider ? : H.map.provider.ObjectProvider , style ? : H.map.SpatialStyle.Options , visibility ? : boolean , volatility ? : boolean , zIndex ? : number } ;
}
declare namespace H.map {
  /**
   * This class represents a style with which spatial objects such as polylines and polygons are drawn.
   * A SpatialStyle instance is always treated as immutable to avoid inconsistencies and must not modified.
   */
  class SpatialStyle {
    /**
     * This class represents a style with which spatial objects such as polylines and polygons are drawn.
     * A SpatialStyle instance is always treated as immutable to avoid inconsistencies and must not modified.
     * @param opt_options An object specifying style attributes
     */
    constructor (opt_options ? : H.map.SpatialStyle.Options ) ;
    /**
     * This method checks if the given style object is the same as the style object
     * supplied by the caller. Two style objects are equal if the values of their
     * properties are equal.
     * @param other The style object against which to compare the given style object
     */
    equals (other : H.map.SpatialStyle.Options ) : boolean ;
    /**
     * The filling color in CSS syntax, the default is  `"rgba(0, 85, 170, 0.4)"`.
     */
    fillColor : string ;
    /**
     * This method obtains a copy of the given spatial style object and sets its attributes.
     * @param opt_attributes The style attributes to set on the copy of the given style instance
     */
    getCopy (opt_attributes ? : H.map.SpatialStyle.Options ) : H.map.SpatialStyle ;
    /**
     * The style of the end caps for a line, the default is  `"round"`.
     */
    lineCap : string ;
    /**
     * The line dash pattern as an even-numbered list of distances produce a line of
     * alternating dashes and spaces.
     * The default is `[ ]`.
     */
    lineDash : number [] ;
    /**
     * An image that will be placed inside each dash. Can be used only when the `lineDash` is specified.
     * Works only when using map engine type `H.Map.EngineType['HARP']`.
     * If not specified then no image is used.
     */
    lineDashImage ? : HTMLCanvasElement | HTMLImageElement | H.map.SpatialStyle.DashImage ;
    /**
     * The phase offset for the line dash pattern
     * The default is `0`.
     */
    lineDashOffset : number ;
    /**
     * The cap type of the head of a solid line or, in case of a dashed line, for the head of each dash.
     * If not specified the `lineCap` property is used.
     */
    lineHeadCap ? : string ;
    /**
     * The type of the corner created when two lines meet, the default is  `"miter"`.
     */
    lineJoin : string ;
    /**
     * The cap type of the tail of a solid line or, in case of a dashed line, for the tail of each dash.
     * If not specified then the `lineCap` property is used.
     */
    lineTailCap ? : string ;
    /**
     * The width of the line in pixels, the default is  `2`.
     */
    lineWidth : number ;
    /**
     * The miter length as the distance between the inner corner and the outer corner where two lines meet.
     * The default is `1`.
     */
    miterLimit : number ;
    /**
     * The color of the stroke in CSS syntax, the default is `"rgba(0, 85, 170, 0.6)"`.
     */
    strokeColor : string ;
    /**
     * This static member defines the default style for spatial objects on the map.
     * It's value is:
     */
    static DEFAULT_STYLE : H.map.SpatialStyle ;
    /**
     * This constant represents the maximum line width which can be used for rendering.
     */
    static MAX_LINE_WIDTH : number ;
  }
}
declare namespace H.map.SpatialStyle {
  type DashImage = string &{clutzEnumBrand: never} ;
  let DashImage : {
    ARROW : DashImage ,
    CIRCLE : DashImage ,
  };
  type LineCap = string ;
  type LineJoin = string ;
  type Options = { fillColor ? : string , lineCap ? : string , lineDash ? : number [] , lineDashImage ? : HTMLImageElement | HTMLCanvasElement | H.map.SpatialStyle.DashImage , lineDashOffset ? : number , lineHeadCap ? : string , lineJoin ? : string , lineTailCap ? : string , lineWidth ? : number , miterLimit ? : number , strokeColor ? : string } ;
}
declare namespace H.map {
  /**
   * This class is deprecated, use {@link H.map.render.webgl.Style} instead.
   */
  export import Style = H.map.render.webgl.Style ;
}
declare namespace H.map {
  /**
   * This class represents a view of the map. It consists of a look-at point which has a position
   * in geo-space and orientation angles (heading, tilt and incline). The view model allows to change
   * the values of this object in order to move or rotate the map or zoom in and out.
   *
   * Modifying the view of a map is asynchronous as the view model notifies the
   * renderer of a change in its state and triggers the renderer.
   *
   * A map renderer can choose to ignore or even correct certain values depending
   * on its capabilities. For example a 2D map renderer will ignore tilt values
   * and correct tilt values to be 0 on the view model in order to keep the
   * integrity of the view model.
   *
   * In order to be notified of changes to the model that originate from the
   * renderer, the view model dispatches a "sync" event whenever the
   * renderer synchronizes the requested changes to the view with its own
   * internal state.
   */
  class ViewModel extends H.util.EventTarget implements H.map.IControl {
    /**
     * This class represents a view of the map. It consists of a look-at point which has a position
     * in geo-space and orientation angles (heading, tilt and incline). The view model allows to change
     * the values of this object in order to move or rotate the map or zoom in and out.
     *
     * Modifying the view of a map is asynchronous as the view model notifies the
     * renderer of a change in its state and triggers the renderer.
     *
     * A map renderer can choose to ignore or even correct certain values depending
     * on its capabilities. For example a 2D map renderer will ignore tilt values
     * and correct tilt values to be 0 on the view model in order to keep the
     * integrity of the view model.
     *
     * In order to be notified of changes to the model that originate from the
     * renderer, the view model dispatches a "sync" event whenever the
     * renderer synchronizes the requested changes to the view with its own
     * internal state.
     */
    constructor ( ) ;
    /**
     * To control a look-at-point animation in screen space. Before the look-at-point can be controlled
     * the method {@link H.map.ViewModel#startControl} must be invoked once. The animation
     * can be finished via {@link H.map.ViewModel#endControl}
     * @param moveX The movement along the x-axis in pixels per second
     * @param moveY The movement along the y-axis in pixels per second
     * @param moveZ The movement along the z-axis in zoom-levels per second
     * @param rotateX The rotation around the x-axis in degrees per second
     * @param rotateY The rotation around the y-axis in degrees per second
     * @param rotateZ The rotation around the z-axis in degrees per second
     */
    control (a : number , b : number , c : number , d : number , e : number , f : number ) : void ;
    /**
     * To finish the control of a look-at-point animation. See also
     * {@link H.map.ViewModel#startControl} and {@link H.map.ViewModel#control}
     * @param opt_preventKinetics Indicates whether a kinetic effect at the end of the controlled animation is prevented.
     * @param opt_adjustView A custom function to adjust the final view. It receives the last requested look-at data from the view model and has to return a possibly modified {@link H.map.ViewModel.ILookAtData} which is used instead.
     */
    endControl (a ? : boolean , b ? : (a : H.map.ViewModel.ILookAtData ) => any ) : void ;
    /**
     * This method retrieves the current rendered look-at data.
     * It returns {@link H.geo.Rect} as bounds in case of `P2D` engine,
     * otherwise bounds is of type {@link H.geo.Polygon}.
     */
    getLookAtData ( ) : H.map.ViewModel.ILookAtData ;
    /**
     * To set new look-at data for the view model. This method supports any type of geometry.
     * In case of `P2D` engine type, the bounding box of the geometry is used.
     * In case of other engine types: if the bounds type is {@link H.geo.Polygon},
     * then the exterior of the polygon defines visible area,
     * otherwise the bounding box of the given bounds geometry.
     * @param data The values to be modified. Here are some of the main possibilities to reposition the camera at give look-at point: - `position` - use existing (default) zoom and change map center - `zoom` - use existing (default) map center and change zoom - `position` & `zoom` - use specified position as map center and zoom - `bounds` - set center of the bounds as a new map center and calculate zoom such that bounds are visible - `bounds` & `position` - set specified position as map center and calculate zoom such that bounds are visible - `bounds` & `zoom` - set center of the bounds as a new map center and set specified zoom - `bounds` & `position` & `zoom` - ignore bounds and use specified position and zoom - `tilt`, `heading`, `incline` - set look-at angles
     * @param opt_animate A boolean indicating if an animated transition should be applied. Alternatively, a positive number representing a speed factor that's multiplied to the default animation speed computed by the rendering engine. Valid for vector engines only. Examples: - 1.1 means 10% faster than the default animation speed. - 0.5 means 50% slower. Default is `false`.
     */
    setLookAtData (data : H.map.ViewModel.ILookAtData , opt_animate ? : boolean | number ) : H.map.ViewModel ;
    /**
     * To start the controlling of the look-at-point animation. After this method was invoked, the look-at-point
     * animation can be controlled by several calls of {@link H.map.ViewModel#control} and
     * finished by a call of {@link H.map.ViewModel#endControl}
     * @param opt_kinetics Kinetics settings
     * @param opt_atX The x screen coordinate at which control starts
     * @param opt_atY The y screen coordinate at which control starts
     */
    startControl (a ? : H.util.kinetics.IKinetics , b ? : number , c ? : number ) : void ;
  }
}
declare namespace H.map.ViewModel {
  type ILookAtData = { bounds ? : H.geo.AbstractGeometry , heading ? : number , incline ? : number , position ? : H.geo.IPoint , tilt ? : number , zoom ? : number } ;
}
declare namespace H.map {
  /**
   * A viewport object holds information about the HTML element in which the map
   * is rendered. It contains information regarding the size of view port size and
   * triggers events when the size changes.
   */
  class ViewPort extends H.util.EventTarget implements H.map.IInteraction {
    /**
     * A viewport object holds information about the HTML element in which the map
     * is rendered. It contains information regarding the size of view port size and
     * triggers events when the size changes.
     * @param element The HTML element where the map is to be rendered
     * @param opt_options Optional configuration parameters
     */
    constructor (element : HTMLElement , opt_options ? : H.map.ViewPort.Options ) ;
    /**
     * This property holds a value indicating the current center point of the viewport.
     */
    center : H.math.Point ;
    /**
     * This property holds the HTML element that defines the viewport.
     */
    element : HTMLElement ;
    /**
     * This method ends an interaction and applies a kinetic movement if it was
     * specified in a call to `startInteraction()`
     * @param opt_preventKinetics A value indicating a kinetic movement at the end of the interaction is to be prevented (`true` or not `false`)
     */
    endInteraction (a ? : boolean ) : any ;
    /**
     * This property holds a value indicating the height of the viewport.
     */
    height : number ;
    /**
     * This method resolves direct screen (view port) interaction. This function modifies the current
     * view according to values passed in by the caller.
     * @param x viewport x coordinate
     * @param y viewport y coordinate
     * @param opt_bx x coordinate for the second pointer/touch if present
     * @param opt_by y coordinate for the second pointer/touch if present
     * @param opt_timestamp A known timestamp to use
     */
    interaction (a : number , b : number , c ? : number , d ? : number , e ? : number ) : any ;
    /**
     * This property holds a value indicating the current margin of the viewport.
     */
    margin : number ;
    /**
     * This property holds a value indicating the current padding of the viewport.
     */
    padding : H.map.ViewPort.Padding ;
    /**
     * This method updates the size of the viewport to match the container size. It
     * must be called whenever the HTML element changes size in order to update the
     * map's viewport values.
     */
    resize ( ) : void ;
    /**
     * This method sets the margin on the viewport.
     * @param margin A value indicating the margin used to fetch map data
     */
    setMargin (margin : number ) : void ;
    /**
     * This method sets a value indicating the padding of the viewport. Padding
     * results in a shifted map center which is the visual center of the padded area.
     * @param top A value indicating padding at the top of the viewport
     * @param right A value indicating padding on the right of the viewport
     * @param bottom A value indicating padding at the bottom of the viewport
     * @param left A value indicating padding on the left of the viewport
     */
    setPadding (top : number , right : number , bottom : number , left : number ) : void ;
    /**
     * This method starts the interaction with the view port. It should be called
     * every time a new interaction is started, for example on mouse grab or touch start.
     * @param modifiers Specifies what operations should performed during every interaction.
     * @param opt_kinetics Specifies a kinetic move at the end of interaction
     */
    startInteraction (a : number , b ? : H.util.kinetics.IKinetics ) : any ;
    /**
     * This property holds a value indicating the width of the viewport.
     */
    width : number ;
  }
}
declare namespace H.map.ViewPort {
  type Options = { margin ? : number , padding ? : H.map.ViewPort.Padding } ;
  type Padding = { bottom : number , left : number , right : number , top : number } ;
}
declare namespace H.map.layer {
  /**
   * `BaseTileLayer` encapsulates functionality that is common to all layers that deliver tiles,
   * such as {@link H.map.layer.TileLayer}.
   */
  class BaseTileLayer extends H.map.layer.Layer {
    /**
     * `BaseTileLayer` encapsulates functionality that is common to all layers that deliver tiles,
     * such as {@link H.map.layer.TileLayer}.
     * @param provider The data source for the `BaseTileLayer`
     * @param opt_options Configuration/initialization options. Unless min/max are specified layer will use min/max of the specified provider.
     */
    constructor (provider : H.map.provider.TileProvider , opt_options ? : H.map.layer.ITileLayer.Options ) ;
    /**
     * This method cancels a previous request for a tile.
     * @param x The tile row position
     * @param y The tile column position
     * @param z The zoom level
     */
    cancelTile (x : number , y : number , z : number ) : void ;
    /**
     * This method transforms a geo-rectangle to a projected geometrical rectangle at
     * the current projection zoom level or at the zoom level provided by the caller.
     * @param geoRect The rectangle to be projected
     * @param opt_zoom A zoom value to override the current projection zoom level
     */
    geoRectToRect (geoRect : H.geo.Rect , opt_zoom ? : number ) : H.math.Rect ;
    getCopyrights (boundingBox : H.geo.Rect , level : number ) : H.map.ICopyright [] | null ;
    /**
     * This method requests tiles from a data source (provider). It can return a set of
     * tiles which are currently loaded. All tiles which are not yet loaded are
     * included in the response as soon as they become available during subsequent calls.
     * @param tileGridBoundary The boundary within a tile grid
     * @param isCDB A value indicating if `tileBoundary` crosses the international date line `true`
     * @param zoomLevel The zoom level for which the objects are requested
     * @param cacheOnly A value indicating whether only cached objects are to be considered (`true`) or not (`false`)
     * @param prioCenter The priority center as an offset in screen pixels relative to the center
     * @param opt_requesterId Unique identifier of the requester, is used when layer is shared between different maps
     */
    getProviderTiles (tileGridBoundary : H.math.Rect , isCDB : boolean , zoomLevel : number , cacheOnly : boolean , prioCenter : H.math.Point , opt_requesterId ? : any ) : H.map.layer.ITileLayer.Response ;
    /**
     * This method retrieves the tile grid boundary for a projected bounding box.
     * @param boundingBox A projected bounding box which corresponds to a geographical bounding box whose tile grid is to be retrieved
     * @param zoom The current zoom level
     */
    getTileBounds (boundingBox : H.math.Rect , zoom : number ) : H.math.Rect ;
    /**
     * This method requests a single tile based on the tile coordinates.
     * It returns either a `Tile` object if it is already loaded or `undefined`,
     * in which case it starts loading the tile.
     * @param x The tile row position
     * @param y The tile column position
     * @param z The zoom level for which the tile is requested
     * @param cacheOnly A value indicating whether only cached tiles are to be considered (`true`) or not (`false`)
     */
    requestTile (x : number , y : number , z : number , cacheOnly : boolean ) : H.map.provider.Tile | undefined ;
    /**
     * This property holds the size of a tile image rendered by the tile layer.
     */
    tileSize : number ;
  }
}
declare namespace H.map.layer {
  /**
   * This class represents a layer for drawing 2D or 3D graphics on the map.
   *
   * Note that there is no need to create own [animation frame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame),
   * as rendering callback is called within main animation frame used for rendering all other layers on the map.
   */
  class CanvasLayer extends H.map.layer.Layer {
    /**
     * This class represents a layer for drawing 2D or 3D graphics on the map.
     *
     * Note that there is no need to create own [animation frame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame),
     * as rendering callback is called within main animation frame used for rendering all other layers on the map.
     * @param renderCallback A custom callback to render the layer's content in each [animation frame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame). It is called with the rendering context according to canvas type and attributes specified via `opt_options` and other rendering parameters. The return value of the render callback indicates the rendering state. See {@link H.map.render.RenderState}. If render callback returns `H.map.render.RenderState.DONE` or `H.map.render.RenderState.PENDING` the rendering engine might go to sleep mode. Call `this.dispatchEvent('update')` to restart the rendering engine. Note that in case of `P2D` engine canvas is cleared before each render loop. In order to have higher rendering performance and responsiveness of the map it is recommended to execute any expensive operations asynchronously or – even better – in a web worker and perform only the absolute necessary operations synchronously within the render callback.
     * @param opt_options An optional configuration object
     */
    constructor (renderCallback : (a : CanvasRenderingContext2D | WebGLRenderingContext , b : H.map.render.RenderingParams ) => H.map.render.RenderState , opt_options ? : H.map.layer.CanvasLayer.Options ) ;
  }
}
declare namespace H.map.layer.CanvasLayer {
  type Options = { contextAttributes ? : GlobalObject , contextType ? : string , dark ? : boolean , max ? : number , min ? : number } ;
}
declare namespace H.map.layer {
  /**
   * This class represents a layer to render DOM nodes on the map.
   *
   * The `element` argument for the render callback is a DOM element where the layer's content has to be
   * represented as child nodes.
   */
  class DomLayer extends H.map.layer.Layer {
    /**
     * This class represents a layer to render DOM nodes on the map.
     *
     * The `element` argument for the render callback is a DOM element where the layer's content has to be
     * represented as child nodes.
     * @param renderCallback A custom callback to render the layer's content in each [animation frame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame). The return value of the render callback indicates the rendering state. See {@link H.map.render.RenderState}. If render callback returns `H.map.render.RenderState.DONE` or `H.map.render.RenderState.PENDING` the rendering engine might go to sleep mode. Call `this.dispatchEvent('update')` to restart the rendering engine. Note that in order to have higher rendering performance and responsiveness of the map it is recommended to execute any expensive operations asynchronously or – even better – in a web worker and perform only the absolute necessary operations synchronously within the render callback.
     * @param opt_options An optional configuration object
     */
    constructor (renderCallback : (a : GlobalElement , b : H.map.render.RenderingParams ) => H.map.render.RenderState , opt_options ? : H.map.layer.Layer.Options ) ;
  }
}
declare namespace H.map.layer {
  /**
   * This interface defines a layer which provides marker objects to the
   * renderer.
   *
   * Adding a layer implementing this interface to the layer collection causes
   * the render engine to render marker objects provided by the `requestMarkers()`
   * function.
   */
  interface IMarkerLayer {
    /**
     * This method requests DOM marker objects for a bounding rectangle.
     *
     * The implementation of this method must return all DOM marker objects which
     * are contained within the bounding rectangle.
     *
     * The response object returned by this method must contain the number of
     * objects which intersect with the bounding rectangle.
     *
     * This method is called by the renderer in each rendering cycle. An
     * implementing object must make sure that calling this method does not impede
     * the rendering process.
     * @param boundingBox The rectangular area for which marker are to be retrieved
     * @param zoomLevel The zoom level for which the objects are requested
     * @param cacheOnly A value indicating whether only cached objects are to be considered `true`
     * @param prioCenter The priority center as an offset in screen pixel relative to the center
     */
    requestDomMarkers (boundingBox : H.geo.Rect , zoomLevel : number , cacheOnly : boolean , prioCenter : H.math.Point ) : H.map.layer.IMarkerLayer.Response ;
    /**
     * This method requests marker objects for a bounding rectangle.
     *
     * The implementation of this method must return all marker objects which
     * are contained within the bounding rectangle.
     *
     * The response object returned by this method must contain the number of
     * objects which intersect with the bounding rectangle.
     *
     * This method is called by the renderer in each rendering cycle. An
     * implementing object must make sure that calling this method does not impede
     * the rendering process.
     * @param boundingBox The rectangular area for which marker are to be retrieved
     * @param zoomLevel The zoom level for which the objects are requested
     * @param cacheOnly A value indicating whether only cached objects are to be considered `true`
     * @param prioCenter The priority center as an offset in screen pixels relative to the center
     */
    requestMarkers (boundingBox : H.geo.Rect , zoomLevel : number , cacheOnly : boolean , prioCenter : H.math.Point ) : H.map.layer.IMarkerLayer.Response ;
  }
}
declare namespace H.map.layer.IMarkerLayer {
  type Response = { markers : H.map.AbstractMarker [] , total : number } ;
  type TiledResponse = { markers : H.map.AbstractMarker [] , requested : number , total : number } ;
}
declare namespace H.map.layer {
  /**
   * This interface defines a layer which provides spatial objects (i.e.
   * polylines and polygons) to the renderer.
   *
   * Adding a layer implementing this interface to the layer collection causes
   * the render engine to render spatial objects provided by the `requestMarkers`
   * function.
   */
  interface ISpatialLayer {
    /**
     * This method requests spatial objects for a bounding rectangle.
     *
     * The implementation of this method must return all spatial objects which
     * intersect with this bounding rectangle.
     * @param boundingBox The rectangular area for which spatial objects are to be returned
     * @param zoomLevel The zoom level for which the objects are requested
     * @param cacheOnly A value indicating whether only cached objects are to be considered `true`
     */
    requestSpatials (boundingBox : H.geo.Rect , zoomLevel : number , cacheOnly : boolean ) : H.map.Object [] ;
  }
}
declare namespace H.map.layer {
  /**
   * This interface describes a layer which provides data partitioned in quad-tree
   * tiles in an x, y, z fashion (where z describes the level within the tree and
   * x and y describe the absolute column and row indices within the level).
   *
   * Adding a layer implementing this interface to the layer collection causes
   * the render engine to retrieve tiles and render the data contained within the
   * tiles (see {@link H.map.provider.Tile}).
   */
  interface ITileLayer {
    /**
     * This method cancels a previously requested tile.
     * @param x Tile row position
     * @param y Tile column position
     * @param z Zoom level
     */
    cancelTile (x : number , y : number , z : number ) : void ;
    /**
     * This method requests a single tile for the specified tile coordinates.
     * @param x Tile row position
     * @param y Tile column position
     * @param z The zoom level for which the tile is requested
     * @param cacheOnly A value indicating whether only cached tiles are to be considered `true`
     */
    requestTile (x : number , y : number , z : number , cacheOnly : boolean ) : H.map.provider.Tile | undefined ;
    /**
     * This method requests tiles for a specific bounding box and
     * zoom level (z-value).
     *
     * An implementing object must calculate the tile grid which intersects with
     * the bounding box. An `ITileLayer` does not need to return all
     * tiles immediately (as loading tile data from remote sources may be
     * asynchronous). The implementing object may return a partial response if
     * the full response cannot be synchronously provided to the renderer.
     *
     * The response object returned by this method must contain the number of tiles
     * which intersect with the bounding box at the zoom level specified by
     * the caller.
     *
     * This method is called by the renderer for each rendering cycle. An
     * implementing object must make sure that calling this method does not impede
     * the rendering process, therefore caching of remote objects is strongly advised.
     * @param boundingBox The rectangular area for which tiles are to be returned
     * @param zoomLevel The zoom level for which the tiles are requested
     * @param cacheOnly Indicates whether only cached tiles are to be considered (`true`)
     * @param prioCenter The priority center as an offset in screen pixel relative to the center
     * @param opt_requesterId Unique identifier of the requester, is used when layer is shared between different maps
     */
    requestTiles (boundingBox : H.geo.Rect , zoomLevel : number , cacheOnly : boolean , prioCenter : H.math.Point , opt_requesterId ? : any ) : H.map.layer.ITileLayer.Response ;
  }
}
declare namespace H.map.layer.ITileLayer {
  type Options = { dark ? : boolean , max ? : number , min ? : number , projection ? : H.geo.IProjection } ;
  type Response = { tiles : H.map.provider.Tile [] , total : number } ;
}
declare namespace H.map.layer {
  /**
   * The Layer class represents an object that is evaluated by the renderer in the
   * order in which it is added to the collection of map layers. It provides the basic
   * infrastructure for dispatching update events to the renderer when new data
   * is available.
   *
   * A layer is defined by a minimum and maximum zoom level for which it can
   * provide data to the renderer and a projection it uses to transform
   * geographic coordinates into 2D projected world coordinates.
   */
  class Layer extends H.util.EventTarget {
    /**
     * The Layer class represents an object that is evaluated by the renderer in the
     * order in which it is added to the collection of map layers. It provides the basic
     * infrastructure for dispatching update events to the renderer when new data
     * is available.
     *
     * A layer is defined by a minimum and maximum zoom level for which it can
     * provide data to the renderer and a projection it uses to transform
     * geographic coordinates into 2D projected world coordinates.
     * @param opt_options An optional configuration object
     */
    constructor (opt_options ? : H.map.layer.Layer.Options ) ;
    /**
     * This method retrieves the copyright of the current data provider.
     *
     * Note: This function must be overridden by any class derived from `Layer`.
     * The default implementation returns `null`.
     * @param boundingBox The bounding box for which to retrieve the copyright information
     * @param level The zoom level for which to retrieve the copyright information
     */
    getCopyrights (boundingBox : H.geo.Rect , level : number ) : H.map.ICopyright [] | null ;
    /**
     * This method returns the provider which feeds this layer with data.
     */
    getProvider ( ) : H.map.provider.Provider ;
    /**
     * This method checks if a zoom level can be served by the given layer.
     * @param zoomLevel The zoom level to check
     */
    isValid (zoomLevel : number ) : boolean ;
    /**
     * This property holds a value of the maximum zoom level at which the given layer can be rendered.
     */
    max : number ;
    /**
     * This property holds the value of the minimum zoom level at which the given layer can be rendered.
     */
    min : number ;
    /**
     * This property indicates the projection type for the given layer.
     */
    pixelProjection : H.geo.PixelProjection ;
    /**
     * This method sets the maximum zoom level at which the given layer provides content.
     * @param max The new maximum zoom level for the given layer
     */
    setMax (max : number ) : H.map.layer.Layer ;
    /**
     * This method sets the minimum zoom level at which the given layer provides content.
     * @param min The new minimum zoom level for the given layer
     */
    setMin (min : number ) : H.map.layer.Layer ;
  }
}
declare namespace H.map.layer.Layer {
  type Options = { dark ? : boolean , max ? : number , min ? : number , minWorldSize ? : number , projection ? : H.geo.IProjection , provider ? : H.map.provider.Provider } ;
}
declare namespace H.map.layer {
  /**
   * `ObjectTileLayer` represents map objects which are requested on a tile basis.
   */
  class MarkerTileLayer extends H.map.layer.BaseTileLayer implements H.map.layer.IMarkerLayer {
    /**
     * `ObjectTileLayer` represents map objects which are requested on a tile basis.
     * @param provider An object that represents the tile provider
     * @param opt_options An object containing configuration/initialization options
     */
    constructor (provider : H.map.provider.RemoteTileProvider , opt_options ? : H.map.layer.ITileLayer.Options ) ;
    requestDomMarkers (geoRect : H.geo.Rect , zoom : number , cacheOnly : boolean , prioCenter : H.math.Point ) : H.map.layer.IMarkerLayer.Response ;
    requestMarkers (geoRect : H.geo.Rect , zoom : number , cacheOnly : boolean , prioCenter : H.math.Point ) : H.map.layer.IMarkerLayer.Response ;
  }
}
declare namespace H.map.layer {
  /**
   * This class represents a layer which renders map objects. Spatial objects such
   * as polygons and polylines are rendered to tiles before being passed to the
   * rendering engine.
   * Point objects such as markers are provided as objects given an rectangular area.
   */
  class ObjectLayer extends H.map.layer.Layer implements H.map.layer.ITileLayer , H.map.layer.IMarkerLayer {
    /**
     * This class represents a layer which renders map objects. Spatial objects such
     * as polygons and polylines are rendered to tiles before being passed to the
     * rendering engine.
     * Point objects such as markers are provided as objects given an rectangular area.
     * @param provider The `ObjectProvider` which provides the map objects to the given object layer.
     * @param opt_options An object containing the initialization options for the given layer
     */
    constructor (provider : H.map.provider.ObjectProvider , opt_options ? : H.map.layer.ObjectLayer.Options ) ;
    /**
     * Implementation of {@link H.map.layer.ITileLayer#cancelTile}.
     */
    cancelTile (x : number , y : number , z : number ) : void ;
    requestDomMarkers (geoRect : H.geo.Rect , zoom : number , cacheOnly : boolean , prioCenter : H.math.Point ) : H.map.layer.IMarkerLayer.Response ;
    requestMarkers (geoRect : H.geo.Rect , zoom : number , cacheOnly : boolean , prioCenter : H.math.Point ) : H.map.layer.IMarkerLayer.Response ;
    /**
     * This method retrieves overlay objects for a given bounding box.
     * @param boundingBox The bounding box for which overlays are to be returned
     * @param zoomLevel The zoom level for which the objects are requested
     * @param cacheOnly Indicates whether only cached objects are to be considered
     * @param prioCenter The priority center as an offset in screen pixel relative to the center
     */
    requestOverlays (boundingBox : H.geo.Rect , zoomLevel : number , cacheOnly : boolean , prioCenter : H.math.Point ) : H.map.layer.ObjectLayer.OverlaysResponse ;
    /**
     * Implementation of {@link H.map.layer.ITileLayer#requestTile}.
     */
    requestTile (x : number , y : number , z : number , cacheOnly : boolean ) : H.map.provider.Tile | undefined ;
    /**
     * Implementation of {@link H.map.layer.ITileLayer#requestTiles}.
     */
    requestTiles (geoRect : H.geo.Rect , zoomLevel : number , cacheOnly : boolean , prioCenter : H.math.Point , e ? : any ) : H.map.layer.ITileLayer.Response ;
  }
}
declare namespace H.map.layer.ObjectLayer {
  type Options = { dataCacheSize ? : number , pixelRatio ? : number , tileCacheSize ? : number , tileSize ? : number } ;
  type OverlaysResponse = { overlays : H.map.Overlay [] , total : number } ;
}
declare namespace H.map.layer {
  /**
   * This class represents data shown on the map as a set of tiles. It can be used
   * to show map tile images or other type of data which is partitioned into tiles.
   *
   * The class is an implementation of the `ITileLayer` interface which
   * uses an `ITileProivder` as a data source. It delegates tile requests to its
   * provider.
   */
  class TileLayer extends H.map.layer.BaseTileLayer implements H.map.layer.ITileLayer {
    /**
     * This class represents data shown on the map as a set of tiles. It can be used
     * to show map tile images or other type of data which is partitioned into tiles.
     *
     * The class is an implementation of the `ITileLayer` interface which
     * uses an `ITileProivder` as a data source. It delegates tile requests to its
     * provider.
     * @param provider data source for the `TileLayer`
     * @param opt_options An object containing initialization options
     */
    constructor (provider : H.map.provider.TileProvider , opt_options ? : H.map.layer.ITileLayer.Options ) ;
    requestTiles (boundingBox : H.geo.Rect , zoomLevel : number , cacheOnly : boolean , prioCenter : H.math.Point , opt_requesterId ? : any ) : H.map.layer.ITileLayer.Response ;
  }
}
declare namespace H.map.provider {
  /**
   * An `ImageTileProvider` uses a network service to provide bitmap images as tiles.
   */
  class ImageTileProvider extends H.map.provider.RemoteTileProvider {
    /**
     * An `ImageTileProvider` uses a network service to provide bitmap images as tiles.
     * @param options An object containing configuration for the tile provider
     */
    constructor (options : H.map.provider.ImageTileProvider.Options ) ;
    /**
     * To obtain the opacity which is used for the rendering of the provider's image tiles.
     */
    getOpacity ( ) : number ;
    /**
     * To obtain the style used for the rendering of the provider's data.
     */
    getStyle ( ) : H.map.render.Style < any > ;
    requestInternal (x : number , y : number , z : number , onResponse : (a : null | HTMLImageElement | HTMLCanvasElement | ArrayBuffer | GlobalObject , b ? : any ) => any , onError : (a : Error ) => any , priority ? : number ) : H.util.ICancelable ;
    /**
     * To set the opacity which is used for the rendering of the provider's image tiles.
     * @param opt_opacity The opacity to set in range `[0..1]` where `0.0` means full transparent and `1.0` means full opaque. The default value is `1.0`.
     */
    setOpacity (opt_opacity ? : number ) : void ;
    /**
     * Sets the style to be used for the rendering of the provider's data.
     * This method works only when `engineType` is `H.Map.EngineType.HARP`.
     */
    setStyle (style : H.map.render.Style < any > ) : void ;
    /**
     * This property holds a value indicating the size of a tile image supported by the provider.
     */
    tileSize : number ;
  }
}
declare namespace H.map.provider.ImageTileProvider {
  type Options = { crossOrigin ? : string | null , engineType ? : H.Map.EngineType , getCopyrights ? : (a : H.geo.Rect , b : number ) => any , getURL : (a : number , b : number , c : number ) => string | undefined , headers ? : GlobalObject , max ? : number , min ? : number , opacity ? : number , style ? : H.map.render.Style < any > , tileSize ? : number , uri ? : string } ;
}
declare namespace H.map.provider {
  /**
   * This class represents invalidation states of a renderable object. A renderer
   * can optimize its rendering strategies based on the information in this
   * object.
   *
   * For example, renderers may differentiate between a purely visual change to an
   * object and a spatial change. One may only require the change of a color
   * during rendering, the other requires re-projection of the object.
   */
  class Invalidations {
    /**
     * This method retrieves the current invalidation mark of the given invalidations
     * object.
     */
    getMark ( ) : number ;
    /**
     * This method checks whether an add-operation occurred after the specified `since` mark.
     * @param since The invalidation mark to check against
     */
    isAdd (since : number ) : boolean ;
    /**
     * This method checks whether any change occurred after the specified `since` mark.
     * @param since The invalidation mark to check against
     */
    isAny (since : number ) : boolean ;
    /**
     * This method checks whether a remove operation occurred after the specified `since` mark.
     * @param since The invalidation mark to check against
     */
    isRemove (since : number ) : boolean ;
    /**
     * This method checks whether a spatial change occurred after the specified `since` mark.
     * @param since The invalidation mark to check against
     */
    isSpatial (since : number ) : boolean ;
    /**
     * This method checks whether a visual change occurred after the specified `since` mark.
     * @param since The invalidation mark to check against
     */
    isVisual (since : number ) : boolean ;
    /**
     * To obtain whether a volatility change occurred after the specified `since` mark.
     * @param since The invalidation mark to check against
     */
    isVolatility (since : number ) : boolean ;
    /**
     * This method checks whether a z-order change occurred after the specified `since` mark.
     * @param since The invalidation mark to check against
     */
    isZOrder (since : number ) : boolean ;
    /**
     * This method updates invalidation marks according to the caller-provided invalidation types.
     * @param mark The invalidation mark to set
     * @param types The discrete invalidation types to update
     */
    update (mark : number , types : number ) : void ;
    /**
     * This constant represents the initial invalidation mark for an invalidations
     * object.
     */
    static MARK_INITIAL : number ;
  }
}
declare namespace H.map.provider.Invalidations {
  /**
   * This enumeration encapsulates bit flags for different invalidations of map objects.
   *
   * Flags can be combined to signal multiple changes at the same time.
   * These flags are used by providers to differentiate different kinds
   * of property changes in order to optimize rendering.
   */
  enum Flag {
    ADD = 4.0 ,
    NONE = 0.0 ,
    REMOVE = 8.0 ,
    SPATIAL = 2.0 ,
    VISUAL = 1.0 ,
    VOLATILITY = 32.0 ,
    Z_ORDER = 16.0 ,
  }
  type Mark = number ;
}
declare namespace H.map.provider {
  /**
   * A `LocalObjectProvider` acts as a database for map objects.
   * It provides functionality to fetch visible objects for specific geographical bounding box and zoom levels.
   * All objects are organized in a hierarchical group structure.
   * An object can be added to the provider by adding it to a group within this structure.
   * The root group of the provider can be fetched via the method
   * {@link H.map.provider.LocalObjectProvider#getRootGroup}.
   * A {@link H.Map} has its own `LocalObjectProvider` and offer a means to add and remove objects.
   * Only in advanced use cases, is there a need to create an additional `LocalObjectProvider`.
   */
  class LocalObjectProvider extends H.map.provider.ObjectProvider {
    /**
     * A `LocalObjectProvider` acts as a database for map objects.
     * It provides functionality to fetch visible objects for specific geographical bounding box and zoom levels.
     * All objects are organized in a hierarchical group structure.
     * An object can be added to the provider by adding it to a group within this structure.
     * The root group of the provider can be fetched via the method
     * {@link H.map.provider.LocalObjectProvider#getRootGroup}.
     * A {@link H.Map} has its own `LocalObjectProvider` and offer a means to add and remove objects.
     * Only in advanced use cases, is there a need to create an additional `LocalObjectProvider`.
     * @param opt_options An object containing configuration options
     */
    constructor (opt_options ? : H.map.provider.Provider.Options ) ;
    /**
     * To obtain a list of map objects which intersect the provided area.
     * @param area The polygonal geographical area where to obtain the map objects. Since the polygon's legs are not projected, for some areas covering several latitude degrees the set of objects retrieved is not guaranteed to be what is shown in the map.
     * @param callback The function to invoke when the request operation has been finished. It gets a list of all found objects as argument.
     * @param options Additional options to filter the obtained map objects
     */
    getObjectsWithin (area : H.geo.Polygon , callback : (a : H.map.Object [] ) => any , options : H.map.provider.LocalObjectProvider.GetObjectsWithinOptions ) : void ;
    /**
     * This method retrieves the root group for the given provider.
     */
    getRootGroup ( ) : H.map.Group ;
    getStyleInternal ( ) : H.map.render.Style < any > ;
    invalidateObject (mapObject : H.map.Object , flags : number ) : void ;
    providesDomMarkers ( ) : boolean ;
    providesMarkers ( ) : boolean ;
    providesOverlays ( ) : boolean ;
    providesSpatials ( ) : boolean ;
    /**
     * This method removes an object from the given provider's database.
     * It must not called directly. It is invoked by `H.map.Group` which checks beforehand
     * that it is an {@link H.map.Object} instance and its provider is the given provider.
     * @param object The object to remove
     */
    removeObject (object : H.map.Object ) : void ;
    requestDomMarkers (geoRect : H.geo.Rect , zoom : number | undefined , visiblesOnly : boolean , cacheOnly : boolean ) : H.map.DomMarker [] ;
    requestMarkers (geoRect : H.geo.Rect , zoom : number | undefined , visiblesOnly : boolean , cacheOnly : boolean ) : H.map.Marker [] ;
    requestOverlays (geoRect : H.geo.Rect , zoom : number | undefined , visiblesOnly : boolean , cacheOnly : boolean ) : H.map.Overlay [] ;
    requestSpatials (geoRect : H.geo.Rect , zoom : number | undefined , visiblesOnly : boolean , cacheOnly : boolean ) : H.map.Spatial [] ;
    setStyleInternal (style : H.map.render.Style < any > , opt_suppressChangeEvent ? : boolean ) : void ;
  }
}
declare namespace H.map.provider.LocalObjectProvider {
  type GetObjectsWithinOptions = { types ? : number , visiblesOnly ? : boolean , zoom : number } ;
}
declare namespace H.map.provider {
  /**
   * A `MarkerTileProvider` uses a network service to provide markers on a tile basis.
   */
  class MarkerTileProvider extends H.map.provider.RemoteTileProvider {
    /**
     * A `MarkerTileProvider` uses a network service to provide markers on a tile basis.
     * @param options An object containing the configuration for the tile provider
     */
    constructor (options : H.map.provider.MarkerTileProvider.Options ) ;
    /**
     * This method signals to the provider that a map object has changed.
     * The method marks the tile that contains that object as invalid and triggers `dispatchUpdate()`.
     * @param marker The map object to be invalidated
     * @param flags The flags indicating the types of occurred changes
     */
    invalidateObject (marker : H.map.AbstractMarker , flags : number ) : void ;
    providesDomMarkers ( ) : boolean ;
    requestInternal (x : number , y : number , z : number , onResponse : (a : null | HTMLImageElement | HTMLCanvasElement | ArrayBuffer | GlobalObject , b ? : any ) => any , onError : (a : Error ) => any , f ? : number ) : H.util.ICancelable ;
  }
}
declare namespace H.map.provider.MarkerTileProvider {
  type Options = { max ? : number , min ? : number , providesDomMarkers ? : boolean , requestData : (a : number , b : number , c : number , d : (a : H.map.AbstractMarker [] ) => any , e : Function ) => H.util.ICancelable } ;
}
declare namespace H.map.provider {
  /**
   * This is an abstract class to manage and provide map objects (Marker, Polyline, Polygon).
   */
  abstract class ObjectProvider extends H.map.provider.Provider {
    /**
     * This is an abstract class to manage and provide map objects (Marker, Polyline, Polygon).
     * @param opt_options An object containing configuration options
     */
    constructor (opt_options ? : H.map.provider.Provider.Options ) ;
    /**
     * This method retrieves the accumulated invalidations of the given provider's objects.
     * @param opt_type The type of objects to consider for the invalidations. If undefined, all types are taken into account.
     */
    getInvalidations (opt_type ? : H.map.Object.Type ) : H.map.provider.Invalidations ;
    /**
     * This method signals to the provider that a map object has changed.
     * The method updates the `Invalidations` of the given provider and
     * the specified map object and triggers `dispatchUpdate()`.
     * @param mapObject The map object to be invalidated
     * @param changes The flags indicating the types of changes that have occurred
     */
    invalidateObject (mapObject : H.map.Object , changes : number ) : void ;
    /**
     * This method retrieves all `DomMarker` map objects which intersect
     * with the provided rectangular area.
     * @param geoRect A rectangular area defined in terms of the geographic coordinates of its top-left and bottom-right corners
     * @param zoomLevel The zoom level for which the objects are requested, or `undefined` to retrieve all objects for any zoom level
     * @param visiblesOnly Indicates whether only objects that are effectively visible are requested
     * @param cacheOnly A value indicating whether only cached objects are to be considered (`true`) or not (`false`)
     */
    abstract requestDomMarkers (geoRect : H.geo.Rect , zoomLevel : number | undefined , visiblesOnly : boolean , cacheOnly : boolean ) : H.map.DomMarker [] ;
    /**
     * This method retrieves all `Marker` map objects which intersect with the provided rectangular area.
     * @param geoRect A rectangular area defined in terms of the geographic coordinates of its top-left and bottom-right corners
     * @param zoomLevel The zoom level for which the objects are requested, or `undefined` to retrieve all objects for any zoom level
     * @param visiblesOnly Indicates whether only objects that are effectively visible are requested
     * @param cacheOnly A value indicating whether only cached objects are to be considered (`true`) or not (`false`)
     */
    abstract requestMarkers (geoRect : H.geo.Rect , zoomLevel : number | undefined , visiblesOnly : boolean , cacheOnly : boolean ) : H.map.Marker [] ;
    /**
     * This method retrieves all overlay objects which intersect with the specified area.
     * @param geoRect A rectangular area defined in terms of the geographic coordinates of its top-left and bottom-right corners
     * @param zoomLevel The zoom level for which the objects are requested, or `undefined` to retrieve all objects for any zoom level
     * @param visiblesOnly Indicates whether only objects that are effectively visible are requested
     * @param cacheOnly A value indicating whether only cached objects are to be considered (`true`) or not (`false`)
     */
    abstract requestOverlays (geoRect : H.geo.Rect , zoomLevel : number | undefined , visiblesOnly : boolean , cacheOnly : boolean ) : H.map.Overlay [] ;
    /**
     * This method retrieves all polyline, polygon, circle and rectangle objects
     * which intersect with the provided area.
     * @param geoRect A rectangular area defined in terms of the geographic coordinates of its top-left and bottom-right corners
     * @param zoomLevel The zoom level for which the objects are requested, or `undefined` to retrieve all objects for any zoom level
     * @param visiblesOnly Indicates whether only objects that are effectively visible are requested
     * @param cacheOnly A value indicating whether only cached objects are to be considered (`true`) or not (`false`)
     */
    abstract requestSpatials (geoRect : H.geo.Rect , zoomLevel : number | undefined , visiblesOnly : boolean , cacheOnly : boolean ) : H.map.Spatial [] ;
  }
}
declare namespace H.map.provider {
  /**
   * A Provider defines an object which works as a database for the map.
   * Providers can exists in different forms in that they can implement
   * client-side object storage or they can request data from a remote service.
   */
  class Provider extends H.util.EventTarget {
    /**
     * A Provider defines an object which works as a database for the map.
     * Providers can exists in different forms in that they can implement
     * client-side object storage or they can request data from a remote service.
     * @param opt_options An object containing configuration options
     */
    constructor (opt_options ? : H.map.provider.Provider.Options ) ;
    /**
     * This method retrieves the copyrights for the provided content for a certain geographical area and zoom level.
     *
     * Note: This function may be overridden by {@link H.map.provider.Provider.Options} `getCopyrights` property.
     * The default implementation returns `null`.
     * @param boundingBox The rectangular area for which to retrieve the copyright information
     * @param level The zoom level for which to retrieve the copyright information
     */
    getCopyrights (boundingBox : H.geo.Rect , level : number ) : H.map.ICopyright [] | null ;
    /**
     * This methods returns the style used to render the provider data.
     */
    getStyleInternal ( ) : H.map.render.Style < any > ;
    /**
     * This property holds a value indicating the maximum zoom level at which the
     * given provider can serve data. The value is set at construction time.
     */
    max : number ;
    /**
     * This property holds a value indicating the minimum zoom level at which the
     * given provider can serve data. The value is set at construction time.
     */
    min : number ;
    /**
     * This method checks whether this provider will provide `DomMarker` map objects.
     * A concrete implementation of `Provider` must override it if it will provide `DomMarker`s.
     */
    providesDomMarkers ( ) : boolean ;
    /**
     * This method checks whether this provider will provide data in `GeoJSON` format.
     * A concrete implementation of `Provider` must override it if it will provide `GeoJSON` data.
     */
    providesGeoJSON ( ) : boolean ;
    /**
     * This method checks whether this provider will provide `Marker` map objects.
     * A concrete implementation of `Provider` must override it if it will provide `Marker`s.
     */
    providesMarkers ( ) : boolean ;
    /**
     * This method checks whether this provider will provide data in `OMV` format.
     * A concrete implementation of `Provider` must override it if it will provide `OMV` data.
     */
    providesOMV ( ) : boolean ;
    /**
     * This method checks whether this provider will provide overlay map objects.
     * A concrete implementation of `Provider` must override it if it will provide overlays.
     */
    providesOverlays ( ) : boolean ;
    /**
     * This method checks whether this provider will provide bitmap images as tiles.
     * A concrete implementation of `Provider` must override it if it will provide raster tiles.
     */
    providesRasters ( ) : boolean ;
    /**
     * This method checks whether this provider will provide spatial map objects.
     * A concrete implementation of `Provider` must override it if it will provide `Spatial`s.
     */
    providesSpatials ( ) : boolean ;
    /**
     * This method sets the style to be used to render the provider data.
     * @param style The style to use for rendering the provider data.
     * @param opt_suppressChangeEvent Flag to suppress firing of config change event.
     */
    setStyleInternal (style : H.map.render.Style < any > , opt_suppressChangeEvent ? : boolean ) : void ;
    /**
     * This property holds the unique identifier for the provider instance.
     * The value is generated at construction time.
     */
    uid : string ;
    /**
     * This property holds the provider's unique resource identifier.
     * If it is not provided at construction time, it defaults to provider's `uid`.
     */
    uri : string ;
  }
}
declare namespace H.map.provider.Provider {
  type Options = { engineType ? : H.Map.EngineType , getCopyrights ? : (a : H.geo.Rect , b : number ) => any , max ? : number , min ? : number , uri ? : string } ;
}
declare namespace H.map.provider {
  /**
   * `RemoteTileProvider` is an abstract class which should be used by
   * classes implementing data provision on a tile basis. Every child class needs
   * to implement the method `requestInternal` (to request a remote tile)
   * and `getCache` (to provide configured cache object were tiled data is being cached).
   */
  abstract class RemoteTileProvider extends H.map.provider.TileProvider {
    /**
     * `RemoteTileProvider` is an abstract class which should be used by
     * classes implementing data provision on a tile basis. Every child class needs
     * to implement the method `requestInternal` (to request a remote tile)
     * and `getCache` (to provide configured cache object were tiled data is being cached).
     * @param options The options to instantiate a `TileProvider` instance
     */
    constructor (options : H.map.provider.TileProvider.Options ) ;
    cancelTile (x : number , y : number , z : number ) : void ;
    cancelTileByKey (tileKey : string ) : void ;
    createTileInternal (x : number , y : number , z : number , data : HTMLImageElement | HTMLCanvasElement | GlobalObject , opt_options ? : H.service.ServiceParameters ) : H.map.provider.Tile ;
    /**
     * This method retrieves a tile cache of this provider.
     */
    getCache ( ) : H.util.ICache ;
    /**
     * This method instructs the provider to reload data from its source.
     *
     * Two reload modes are possible:
     *
     * - `hard`: This mode immediately removes tiles from
     * the tile cache and forces the provider to re-fetch them. Currently
     * cached tiles are not used for rendering.
     * - `soft`: This mode only marks tiles as invalid and requests
     * the tiles to be re-fetched as soon as possible. The provider does
     * not invalidate the cache immediately. This means that cached
     * tiles can still be rendered while the updated tiles are fetched.
     * @param hard A Boolean flag indicating whether to invalidate in `hard` mode (`true`) or in `soft` mode (`false`);
     */
    reload (hard : boolean ) : void ;
    /**
     * To request a tile from a remote service.
     * This method must be implemented by deriving classes.
     * @param x The row number of the tile
     * @param y The column number of the tile
     * @param z The zoom level for which the tile is requested
     * @param onResponse A function which is called when a response arrives
     * @param onError A function which is called on a communication error
     * @param opt_priority An optional request priority level
     */
    abstract requestInternal (x : number , y : number , z : number , onResponse : (a : null | HTMLImageElement | HTMLCanvasElement | ArrayBuffer | GlobalObject , b ? : any ) => any , onError : (a : Error ) => any , opt_priority ? : number ) : H.util.ICancelable ;
    requestTile (x : number , y : number , z : number , cacheOnly : boolean ) : H.map.provider.Tile | undefined ;
  }
}
declare namespace H.map.provider {
  /**
   * This class defines a generic tile object which represents a part of the world
   * that fits into the tile area represented by the tile coordinates (x - row, y - column)
   * and the zoom level (z). The number of tiles at a particular zoom level (which means
   * number of areas into which world is divided) equals
   * `numberOfRows = numberOfColumns = 2^zoomlevel`.
   */
  class Tile {
    /**
     * This class defines a generic tile object which represents a part of the world
     * that fits into the tile area represented by the tile coordinates (x - row, y - column)
     * and the zoom level (z). The number of tiles at a particular zoom level (which means
     * number of areas into which world is divided) equals
     * `numberOfRows = numberOfColumns = 2^zoomlevel`.
     * @param x The x tile coordinate (row)
     * @param y The y tile coordinate (column)
     * @param z The tile zoom level
     * @param data A generic data object which corresponds to the supplied coordinates
     */
    constructor (x : number , y : number , z : number , data : any ) ;
    /**
     * This property holds the tile data (for example an image).
     */
    data : any ;
    /**
     * This property holds a unique tile key generated by provider.
     */
    key : string ;
    /**
     * This property holds a Boolean flag indicating whether the tile is
     * still valid (`true`) or whether it should be re-fetched (`false`).
     */
    valid : boolean ;
    /**
     * This property holds the tile column.
     */
    x : number ;
    /**
     * This property holds the tile row.
     */
    y : number ;
    /**
     * This property holds the tile zoom level.
     */
    z : number ;
  }
}
declare namespace H.map.provider {
  /**
   * `TileProvider` is an abstract class to provide tile data.
   */
  abstract class TileProvider extends H.map.provider.Provider {
    /**
     * `TileProvider` is an abstract class to provide tile data.
     * @param options The options to instantiate the given `TileProvider`
     */
    constructor (options : H.map.provider.TileProvider.Options ) ;
    /**
     * This method cancels a tile request, using the caller-supplied tile coordinates.
     * @param x The tile coordinate on x-axis (column index)
     * @param y The tile coordinate on y-axis (row index)
     * @param z The tile zoom level
     */
    abstract cancelTile (x : number , y : number , z : number ) : void ;
    /**
     * This method cancels a tile request, using a tile key.
     * @param tileKey The key identifying the tile
     */
    abstract cancelTileByKey (tileKey : string ) : void ;
    /**
     * The internal method to create a tile. It must be overridden by sub-classes.
     * @param x The tile coordinate on x-axis (column index)
     * @param y The tile coordinate on y-axis (row index)
     * @param z The tile zoom level
     * @param data A data that represents the tile
     * @param opt_options The options to configure the tile-specific rendering
     */
    abstract createTileInternal (x : number , y : number , z : number , data : HTMLImageElement | HTMLCanvasElement | GlobalObject , opt_options ? : H.service.ServiceParameters ) : H.map.provider.Tile ;
    /**
     * This method creates a tile key consisting of the provider's URI, and the x, y and z coordinates
     * of the tile, separated by underscores, for example "4711_7_42_23".
     * @param x The x tile coordinate (column)
     * @param y The y tile coordinate (row)
     * @param z The tile zoom level
     */
    getTileKey (x : number , y : number , z : number ) : string ;
    /**
     * This method requests data for a tile.
     * @param x The tile coordinate on x-axis (column index)
     * @param y The tile coordinate on y-axis (row index)
     * @param z The zoom level for which the tile is requested
     * @param cacheOnly A value indicating whether only cached tiles are to be considered (`true`) or not (`false`)
     */
    abstract requestTile (x : number , y : number , z : number , cacheOnly : boolean ) : H.map.provider.Tile | undefined ;
    /**
     * This property holds the size of a tile representing edge length in pixels.
     * Its value must be `2^n` where n is in range `[0…30]`, default is `256`.
     */
    tileSize : number ;
  }
}
declare namespace H.map.provider.TileProvider {
  type Options = { engineType ? : H.Map.EngineType , getCopyrights ? : (a : H.geo.Rect , b : number ) => any , max ? : number , min ? : number , tileSize ? : number , uri ? : string } ;
}
declare namespace H.map.render {
  /**
   * This interface describes render engine capabilities, such as the minimum and
   * maximum zoom level, camera angles, etc.
   */
  interface ICapabilities {
    /**
     * This property holds a value indicating whether capturing is supported.
     */
    capture : boolean ;
    /**
     * This property defines the supported interaction modifiers. See
     * {@link H.map.render.RenderEngine.InteractionModifiers}.
     */
    interaction : GlobalObject | boolean ;
    /**
     * The capabilities to modify a look-at point. If the value is
     * `null` then look-at point modifications are unsupported at all.
     */
    lookAt : H.map.render.ICapabilities.LookAt ;
  }
}
declare namespace H.map.render.ICapabilities {
  type LookAt = { heading : H.math.Range , incline : H.math.Range , tilt : H.math.Range , zoom : H.math.Range } ;
}
declare namespace H.map.render {
  /**
   * This is an abstract class representing a render engine.
   * Render engines are used to render the geographical position from a view model on the screen (viewport element).
   * The rendered result may be different for different engines,
   * because every engine uses its own capabilities and specific implementation
   * to present the current view model data in best possible way.
   * For example, P2D engine creates a two-dimensional flat map composed of raster tiles,
   * while WEBGL engine can render 3D scene based on vector tiles.
   *
   * A `RenderEngine` is responsible for managing the rendering loop
   * as well as for synchronizing rendered data with the view model and the data model.
   * It manages what is rendered inside the current viewport and how.
   */
  abstract class RenderEngine extends H.util.EventTarget implements H.util.animation.IAnimatable {
    /**
     * This is an abstract class representing a render engine.
     * Render engines are used to render the geographical position from a view model on the screen (viewport element).
     * The rendered result may be different for different engines,
     * because every engine uses its own capabilities and specific implementation
     * to present the current view model data in best possible way.
     * For example, P2D engine creates a two-dimensional flat map composed of raster tiles,
     * while WEBGL engine can render 3D scene based on vector tiles.
     *
     * A `RenderEngine` is responsible for managing the rendering loop
     * as well as for synchronizing rendered data with the view model and the data model.
     * It manages what is rendered inside the current viewport and how.
     * @param viewPort An object representing the map viewport
     * @param viewModel An object representing a view of the map
     * @param dataModel An object encapsulating the data to be rendered on the map (layers and objects)
     * @param options An object containing the render engine initialization options
     */
    constructor (viewPort : H.map.ViewPort , viewModel : H.map.ViewModel , dataModel : H.map.DataModel , options : H.map.render.RenderEngine.Options ) ;
  }
}
declare namespace H.map.render.RenderEngine {
  /**
   * This object defines the modifiers to use for {@link H.map.ViewPort#startInteraction}.
   */
  enum InteractionModifiers {
    COORD = 16.0 ,
    HEADING = 2.0 ,
    INCLINE = 8.0 ,
    TILT = 4.0 ,
    ZOOM = 1.0 ,
  }
  type Options = { pixelRatio : number } ;
}
declare namespace H.map.render {
  /**
   * The rendering states of the layer.
   */
  /**
   * The rendering states of the layer.
   */
  enum RenderState {
    ACTIVE = 1.0 ,
    DONE = 2.0 ,
    PENDING = 0.0 ,
  }
}
declare namespace H.map.render {
  /**
   * An object containing rendering parameters.
   */
  type RenderingParams = { boundingBox : H.geo.Rect , cacheOnly : boolean , pixelRatio : number , priorityCenter : H.math.Point , projection : H.geo.PixelProjection , screenCenter : H.math.Point , size : H.math.Size , zoom : number } ;
}
declare namespace H.map.render {
  /**
   * Instances of this class hold style configuration for rendering data on the map.
   * It also provides utility methods for operating with the style.
   *
   * This is a generic class and type of the style configuration is `T`.
   */
  abstract class Style < T = any > extends H.util.EventTarget {
    /**
     * Instances of this class hold style configuration for rendering data on the map.
     * It also provides utility methods for operating with the style.
     *
     * This is a generic class and type of the style configuration is `T`.
     * @param config Either a URL to load the style from, encoded style configuration as string or object describing the style configuration. See {@link H.map.render.webgl.StyleConfig}.
     * @param opt_baseUrl The base URL to use for resolving relative URLs in the style like textures, fonts. When URL is passed as a `config`, it is used as a default base URL, unless defined base URL is specified. Otherwise resources with the relative paths are resolved relative to the page location.
     */
    constructor (config : string | T , opt_baseUrl ? : string ) ;
    /**
     * Returns the style base URL.
     */
    getBaseUrl ( ) : string | undefined ;
    /**
     * To get the current style configuration as a JavaScript Object, or `null` if there was an
     * error loading/parsing the style configuration.
     *
     * Note that the copy of the configuration is returned.
     */
    getConfig ( ) : T | null ;
    /**
     * Returns the state of the current style.
     */
    getState ( ) : H.map.render.Style.State ;
    /**
     * Starts loading the style configuration if it was specified as a URL or
     * parsing the style configuration if it was passed encoded string or object.
     */
    abstract load ( ) : void ;
  }
}
declare namespace H.map.render.Style {
  /**
   * The state of the style.
   */
  enum State {
    ERROR = -1.0 ,
    INIT = 0.0 ,
    LOADING = 1.0 ,
    READY = 2.0 ,
  }
}
declare namespace H.map.render.p2d {
  /**
   * This class implements a map render engine. It presents a geographic
   * location (look-at data from a view model) and renders all map layers in the
   * order in which they are provided in a single 2D canvas element.
   */
  class RenderEngine extends H.map.render.RenderEngine {
    /**
     * This class implements a map render engine. It presents a geographic
     * location (look-at data from a view model) and renders all map layers in the
     * order in which they are provided in a single 2D canvas element.
     * @param viewPort An object representing the map viewport
     * @param viewModel An object representing a view of the map
     * @param dataModel An object encapsulating the data to be rendered on the map (layers and objects)
     * @param options An object containing the render engine initialization options
     */
    constructor (viewPort : H.map.ViewPort , viewModel : H.map.ViewModel , dataModel : H.map.DataModel , options : H.map.render.RenderEngine.Options ) ;
    /**
     * This method retrieves the current setting indicating the length of
     * animations (duration) run by the the render engine.
     */
    getAnimationDuration ( ) : number ;
    /**
     * This method retrieves the current setting representing the easing to be
     * applied to animations.
     */
    getAnimationEase ( ) : (a : number ) => number ;
    /**
     * This method resets animation settings on the render engine to defaults.
     * The `duration` is set to 300 ms and `easing` to {@link H.util.animation.ease.EASE_OUT_QUAD|EASE_OUT_QUAD}.
     */
    resetAnimationDefaults ( ) : void ;
    /**
     * This method sets the length (duration) for all animations run by the render engine.
     * @param duration A value indicating the duration of animations
     */
    setAnimationDuration (duration : number ) : void ;
    /**
     * This method sets a value indicating the easing to apply to animations run by the render engine.
     * @param easeFunction A function that alters the progress ratio of an animation. It receives an argument indicating animation progress as a numeric value in the range between 0 and 1 and must return a numeric value in the same range.
     */
    setAnimationEase (easeFunction : (a : number ) => number ) : void ;
  }
}
declare namespace H.map.render.p2d.RenderEngine {
  type Options = { enableSubpixelRendering ? : boolean , pixelRatio : number , renderBaseBackground ? : GlobalObject } ;
}
declare namespace H.map.render.webgl {
  /**
   * Interface describing expected style configuration interface supported
   * by the {@link H.map.render.webgl.RenderEngine}.
   */
  type StyleConfig = { globals ? : GlobalObject , layers ? : GlobalObject , scene ? : GlobalObject , sources ? : GlobalObject , textures ? : GlobalObject } ;
}
declare namespace H.map.render.webgl {
  /**
   * This class is an implementation of WebGL render engine. It presents
   * a geo position (from a view model) in a 3D scene, where
   * all layers are rendered in the order in which they are provided.
   */
  class RenderEngine extends H.map.render.RenderEngine {
    /**
     * This class is an implementation of WebGL render engine. It presents
     * a geo position (from a view model) in a 3D scene, where
     * all layers are rendered in the order in which they are provided.
     * @param viewPort An object representing the map viewport
     * @param viewModel An object representing a view of the map
     * @param dataModel An object encapsulating the data to be rendered on the map (layers and objects)
     * @param options An object containing the render engine initialization options
     */
    constructor (viewPort : H.map.ViewPort , viewModel : H.map.ViewModel , dataModel : H.map.DataModel , options : H.map.render.RenderEngine.Options ) ;
    /**
     * This method retrieves the projected world coordinates corresponding
     * to the geographical coordinates supplied by the caller.
     * @param geoPoint An object containing the geographical coordinates.
     */
    geoToMeters (geoPoint : H.geo.IPoint ) : { x : number , y : number , z : number | null } ;
    /**
     * This method was previously retrieving the current animation duration.
     * Now it's deprecated and always returns `undefined`.
     */
    getAnimationDuration ( ) : void ;
    /**
     * This method was previously retrieving the current animation easing.
     * Now it's deprecated and always returns `undefined`.
     */
    getAnimationEase ( ) : void ;
    /**
     * This method retrieves the geographical coordinates corresponding
     * to the projected world coordinates supplied by the caller.
     * @param point An object defining a location in meters.
     */
    metersToGeo (point : { x : number , y : number , z ? : number } ) : H.geo.IPoint ;
    /**
     * This method was previously used to reset animation settings on the render engine to defaults.
     * Now it's deprecated and doesn't change animation behavior.
     */
    resetAnimationDefaults ( ) : void ;
    /**
     * This method was previously setting the duration for all animations run by the render engine.
     * Now it's deprecated and doesn't change animation behavior.
     */
    setAnimationDuration ( ) : void ;
    /**
     * This method was previously setting a value indicating the easing to apply to animations run by the render engine.
     * Now it's deprecated and doesn't change animation behavior.
     */
    setAnimationEase ( ) : void ;
  }
}
declare namespace H.map.render.webgl.RenderEngine {
  type Options = { enableSubpixelRendering ? : boolean , pixelRatio : number , renderBaseBackground ? : GlobalObject } ;
}
declare namespace H.map.render.webgl {
  /**
   * Instances of this class hold style configuration for rendering provider data using
   * {@link H.map.render.webgl.RenderEngine}. It also provides utility methods for operating with the style.
   *
   * Specify a URL as a `config` parameter value to load the [YAML](https://en.wikipedia.org/wiki/YAML)
   * formatted style configuration.
   * Note that all relative paths within that configuration (textures, imported sub-styles, fonts, etc.) are resolved
   * relative to the hosting location of the main style. The styles are loaded automatically if a layer with the provider
   * using the style is added to the map. Alternatively `load()` method can be called explicitly to start the loading when
   * needed. Resulting style configuration can be obtain using the `getConfig()` method of the class.
   *
   * #### `import`
   * The YAML configuration can contain an optional top-level `import` element, declaring an import parameter.
   * The value can be a single URL like `import: colors.yaml`, or an array of URLs `import: [a.yaml, b.yaml]`.
   *
   * The `import` block allows to import one or more additional files (which can then in turn recursively
   * import others). It works by **deep-merging** each imported scene into the current one: the "child" (imported)
   * file is merged first, with the "parent" file merged after, overwriting any properties shared with the child.
   *
   * The final style configuration is a JavaScript object as a result of merging the master style on top of all
   * the imported styles following the order in which they are listed in the `import`.
   *
   * #### Objects vs. Arrays
   * One important aspect of the merge behavior is that it applies to all YAML maps/JS objects, but not to
   * YAML sequences/JS arrays. While key/value objects are merged (with new keys inserted, and existing keys overwriting
   * the previous value), arrays are treated as scalar values that entirely overwrite the previous value
   * (rather than merging the array contents).
   *
   * #### Relative URLs
   * The relative URLs of the resources of the imported files are resolved relatively to the hosting location of that
   * file. The optional `opt_baseUrl` is applied to the master file only.
   */
  class Style extends H.map.render.Style < any > {
    /**
     * Instances of this class hold style configuration for rendering provider data using
     * {@link H.map.render.webgl.RenderEngine}. It also provides utility methods for operating with the style.
     *
     * Specify a URL as a `config` parameter value to load the [YAML](https://en.wikipedia.org/wiki/YAML)
     * formatted style configuration.
     * Note that all relative paths within that configuration (textures, imported sub-styles, fonts, etc.) are resolved
     * relative to the hosting location of the main style. The styles are loaded automatically if a layer with the provider
     * using the style is added to the map. Alternatively `load()` method can be called explicitly to start the loading when
     * needed. Resulting style configuration can be obtain using the `getConfig()` method of the class.
     *
     * #### `import`
     * The YAML configuration can contain an optional top-level `import` element, declaring an import parameter.
     * The value can be a single URL like `import: colors.yaml`, or an array of URLs `import: [a.yaml, b.yaml]`.
     *
     * The `import` block allows to import one or more additional files (which can then in turn recursively
     * import others). It works by **deep-merging** each imported scene into the current one: the "child" (imported)
     * file is merged first, with the "parent" file merged after, overwriting any properties shared with the child.
     *
     * The final style configuration is a JavaScript object as a result of merging the master style on top of all
     * the imported styles following the order in which they are listed in the `import`.
     *
     * #### Objects vs. Arrays
     * One important aspect of the merge behavior is that it applies to all YAML maps/JS objects, but not to
     * YAML sequences/JS arrays. While key/value objects are merged (with new keys inserted, and existing keys overwriting
     * the previous value), arrays are treated as scalar values that entirely overwrite the previous value
     * (rather than merging the array contents).
     *
     * #### Relative URLs
     * The relative URLs of the resources of the imported files are resolved relatively to the hosting location of that
     * file. The optional `opt_baseUrl` is applied to the master file only.
     * @param config Either a URL to load the style from, `YAML` formatted string or an object describing the rendering style. The URL can be absolute or relative, but should end with either `.yaml` or `.yml` extension.
     * @param opt_baseUrl The base URL to use for resolving relative URLs in the style like textures, fonts. When URL is passed as a `config`, it is used as a default base URL. Otherwise resources with the relative paths are resolved relative to the page location.
     */
    constructor (config : string | H.map.render.webgl.StyleConfig , opt_baseUrl ? : string ) ;
    /**
     * Extracts the style configuration of the data layers with the specified ids. By default extracted layers are
     * removed from the current layer, however that behavior can be changed by passing `true` as `opt_preserving` flag.
     * Returned configuration object represents the extracted layers and can be used for creating a new
     * {@link H.map.render.webgl.Style} with only that data layers.
     *
     * Note that the copy of the configuration is returned.
     * @param layerIds The IDs of the layers to extract. IDs of nesting parent layers must be placed in front using dot as a delimiter like `landuse.park`.
     * @param opt_preserving Indicates whether the extracted layer are preserved in the given layer.
     * @param opt_excludeParentDraws Indicates whether the "draw" properties in parent layers are excluded during extraction.
     */
    extractConfig (layerIds : string [] , opt_preserving ? : boolean , opt_excludeParentDraws ? : boolean ) : H.map.render.webgl.StyleConfig ;
    getBaseUrl ( ) : string | undefined ;
    getConfig ( ) : H.map.render.webgl.StyleConfig ;
    /**
     * Returns the value of the property specified by the `.` delimited path.
     *
     * Note that the copy of the configuration is returned.
     * @param path The `.` delimited property path within the style configuration.
     */
    getProperty (path : string ) : any ;
    load ( ) : void ;
    /**
     * Merges the specified style configuration with the current one.
     * @param config An object describing the rendering style.
     */
    mergeConfig (config : H.map.render.webgl.StyleConfig ) : void ;
    /**
     * Removes the property specified by the `.` delimited path.
     * @param path The `.` delimited property path within the style configuration.
     */
    removeProperty (path : string ) : void ;
    /**
     * Enables or disables object picking on objects from the data layers with the specified ids.
     * @param layerIds Either a single id or array of ids of the layers to enable/disable object picking. Nested layers ids should be specified using dot as a delimiter like `landuse.park`.
     * @param interactive Pass `true` to make layer objects interactive, and `false` otherwise.
     * @param opt_recursive A Boolean value indicating whether sub-layers should be traversed recursively. Default value is `true`. Pass `false` to only affect topmost layers, i.e. directly accessible by `layerIds`.
     */
    setInteractive (layerIds : string | string [] , interactive : boolean , opt_recursive ? : boolean ) : void ;
    /**
     * Sets the specified value to the property specified by the `.` delimited path. If property by the specified path
     * does not exist, it is created according to the nesting levels.
     * @param path The `.` delimited property path within config to set the value. If the resulting path points to a primitive type value, error will be thrown to prevent incidental overrides unless `opt_force` parameter is set.
     * @param value The value to set. Note that for performance reasons the value is set by reference.
     * @param opt_force Forces overriding of a primitive value (if such is found) along the specified `path`. For example if the style has a property `foo.bar=1`, calling style.setProperty('foo.bar.x', 1) will throw an error, whereas `style.setProperty('foo.bar.x', 1, true)` will override the `foo.bar` with the value `{x: 1}`.
     */
    setProperty (path : string , value : string | number | GlobalObject | boolean , opt_force ? : boolean ) : void ;
    /**
     * Normalize properties which can potentially hold relative URLs with the specified style config
     * For example when `A.yaml` imports `B.yaml`, relative URLs in B should be resolved
     * from the location of the `B.yaml`, rather then `A.yaml`.
     * @param config The YAML config
     * @param baseUrl The base URL to use for resolving relative resources
     */
    static normalize (config : H.map.render.webgl.StyleConfig , baseUrl : string ) : void ;
  }
}
declare namespace H.mapevents {
  /**
   * This class encapsulates map behavior functionality. It uses map events and
   * adds functionality such as panning and zooming to the map.
   *
   * By default the behavior will use {@link H.util.animation.ease.EASE_OUT_QUAD} animation with
   * `600ms` duration during interactions with the map.
   *
   * This can be modified by specifying `options`.
   */
  class Behavior extends H.util.Disposable {
    /**
     * This class encapsulates map behavior functionality. It uses map events and
     * adds functionality such as panning and zooming to the map.
     *
     * By default the behavior will use {@link H.util.animation.ease.EASE_OUT_QUAD} animation with
     * `600ms` duration during interactions with the map.
     *
     * This can be modified by specifying `options`.
     * @param mapEvents An object representing a previously initialized map events instance
     * @param options An object defining additional options (kinetics)
     */
    constructor (mapEvents : H.mapevents.MapEvents , options ? : H.mapevents.Behavior.Options ) ;
    /**
     * To disable the specified behavior feature(s) for the map.
     * @param opt_features The feature(s) to disable. If omitted all behavior features are disabled. To disable multiple features combine them with bitwise OR operator ` | ` (e.g. `H.mapevents.Behavior.Feature.PANNING | H.mapevents.Behavior.Feature.HEADING`).
     */
    disable (opt_features ? : number ) : void ;
    /**
     * To discontinue the handling of all map interaction. It should be used
     * when the behavior functionality is disposed of. The `Behavior` object
     * is disposed of (this function is called) when the attached
     * {@link H.mapevents.MapEvents} object is disposed of.
     */
    dispose : ( ) => void ;
    /**
     * This method enables the specified behavior feature(s) for the map.
     * @param opt_features The feature(s) to enable. If omitted all behavior features are enabled. To enable multiple features combine them with bitwise OR operator ` | ` (e.g. `H.mapevents.Behavior.Feature.PANNING | H.mapevents.Behavior.Feature.HEADING`).
     */
    enable (opt_features ? : number ) : void ;
    /**
     * This method checks if certain behavior feature(s) are enabled.
     * @param features The feature(s) to check. To check against multiple features combine them with bitwise OR operator ` | ` (e.g. `H.mapevents.Behavior.Feature.PANNING | H.mapevents.Behavior.Feature.HEADING`).
     */
    isEnabled (features : number ) : boolean ;
  }
}
declare namespace H.mapevents.Behavior {
  /**
   * The feature types that can be enabled or disabled.
   * See also {@link H.mapevents.Behavior#enable}, {@link H.mapevents.Behavior#disable}
   * and the `enable` property in the {@link H.mapevents.Behavior.Options}.
   */
  enum Feature {
    DBL_TAP_ZOOM ,
    FRACTIONAL_ZOOM ,
    HEADING ,
    PANNING ,
    PINCH_ZOOM ,
    TILT ,
    WHEEL_ZOOM ,
  }
  type Options = { enabled ? : number , kinetics ? : H.util.kinetics.IKinetics , modifierKey ? : string } ;
}
declare namespace H.mapevents {
  /**
   * This class represents an event to be fired when a user right-clicks or
   * longpresses on a map object.
   */
  class ContextMenuEvent extends H.util.Event {
    /**
     * This class represents an event to be fired when a user right-clicks or
     * longpresses on a map object.
     * @param viewportX The x coordinate of the event location in the viewport
     * @param viewportY The y coordinate of the event location in the viewport
     * @param target The target element of the event
     * @param originalEvent An object representing the original event
     */
    constructor (viewportX : number , viewportY : number , target : H.Map | H.map.Object , originalEvent : GlobalEvent ) ;
    /**
     * This property contains `ContextItems` that be used to create context
     * menu entries and set by listeners of the "contextmenu" event.
     */
    items : H.util.ContextItem [] ;
    /**
     * This property holds the original event.
     */
    originalEvent : GlobalEvent ;
    /**
     * This property holds the target for the event.
     */
    target : H.map.Object | H.Map ;
    /**
     * This property holds the x-position in the map viewport.
     */
    viewportX : number ;
    /**
     * This property holds the y-position in the map viewport.
     */
    viewportY : number ;
  }
}
declare namespace H.mapevents {
  /**
   * This class represents a custom map event. It contains a list of pointers on
   * the map, a list of changed pointers, and the original event.
   */
  class Event extends H.util.Event {
    /**
     * This class represents a custom map event. It contains a list of pointers on
     * the map, a list of changed pointers, and the original event.
     * @param type type of event
     * @param pointers An array of pointers currently on the screen
     * @param changedPointers An array of pointers which changed during event
     * @param targetPointers An array of pointers on the event target
     * @param currentPointer A pointer that triggered the event
     * @param target The target map object which triggered event
     * @param originalEvent The original DOM event
     */
    constructor (type : string , pointers : H.mapevents.Pointer [] , changedPointers : H.mapevents.Pointer [] , targetPointers : H.mapevents.Pointer [] , currentPointer : H.mapevents.Pointer , target : H.Map | null | H.map.Object , originalEvent : GlobalEvent ) ;
    /**
     * This property holds an array of pointers that have changed in course of event.
     */
    changedPointers : H.mapevents.Pointer [] ;
    /**
     * This property holds the current pointer.
     */
    currentPointer : H.mapevents.Pointer ;
    /**
     * This property holds the original event fired by the browser.
     */
    originalEvent : GlobalEvent ;
    /**
     * This property holds an array of pointers that are currently on the screen.
     */
    pointers : H.mapevents.Pointer [] ;
    /**
     * This property holds the object which triggered the event.
     * It can be a map object (for example a marker or a polyline) or the map itself.
     */
    target : H.map.Object | null | H.Map ;
    /**
     * This property holds an array of pointers that are on same target as the current pointer.
     */
    targetPointers : H.mapevents.Pointer [] ;
  }
}
declare namespace H.mapevents {
  /**
   * `MapEvents` enables the events functionality on the map and on map
   * objects. The class makes it possible to listen to events on map objects such
   * as markers, polylines, polygons, circles and on the map object itself.
   * Events are triggered by user interaction, for example clicking or tapping on
   * the map. Please check the Events Summary section for the list of events fired
   * by this class and by the map objects.
   */
  class MapEvents extends H.util.Disposable {
    /**
     * `MapEvents` enables the events functionality on the map and on map
     * objects. The class makes it possible to listen to events on map objects such
     * as markers, polylines, polygons, circles and on the map object itself.
     * Events are triggered by user interaction, for example clicking or tapping on
     * the map. Please check the Events Summary section for the list of events fired
     * by this class and by the map objects.
     * @param map An object representing the map used for firing events
     */
    constructor (map : H.Map ) ;
    /**
     * This method destroys the `MapEvents` instance by removing all handlers from the map object.
     * After calling this method, `mapEvents` and map objects do not trigger any events.
     * This object is disposed of automatically when the corresponding map object is
     * disposed of.
     */
    dispose : ( ) => void ;
    /**
     * This method retrieves the map object to which events are attached.
     */
    getAttachedMap ( ) : H.Map ;
  }
}
declare namespace H.mapevents {
  /**
   * This class represents a pointer on the map surface. A pointer
   * in a platform-specific definition can refer to the mouse,
   * touch, pen or any pointing device which can trigger browser events.
   */
  class Pointer {
    /**
     * This class represents a pointer on the map surface. A pointer
     * in a platform-specific definition can refer to the mouse,
     * touch, pen or any pointing device which can trigger browser events.
     * @param viewportX The pointer position on x-axis
     * @param viewportY The pointer position on y-axis
     * @param id unique The pointer identifier among currently available pointers
     * @param type The identifier of the pointer type, which can be mouse', 'touch', 'pen'
     * @param opt_button The identifier of the pointing device button that was used (whose state has changed)
     * @param opt_buttons The pointing device buttons that is being pressed.
     */
    constructor (viewportX : number , viewportY : number , id : number , type : string , opt_button ? : H.mapevents.Pointer.Button , opt_buttons ? : number ) ;
    /**
     * This property indicates which pointing device button has changed.
     */
    button : H.mapevents.Pointer.Button ;
    /**
     * This property indicates which pointer device buttons are being pressed.
     */
    buttons : number ;
    /**
     * This property holds the object which is currently dragged by the pointer.
     */
    dragTarget : H.map.Object | null | H.Map ;
    /**
     * This property holds the unique identifier of the pointer.
     */
    id : number ;
    /**
     * This property holds the map object directly under the pointer.
     * Its value can be `null` if the pointer is outside the map viewport.
     */
    target : H.map.Object | null | H.Map ;
    /**
     * This property holds the identifier of the pointer type, which can be 'mouse', 'touch' or 'pen'.
     */
    type : string ;
    /**
     * This property holds the x-coordinate of the pointer in the map viewport.
     */
    viewportX : number ;
    /**
     * This property holds the y-coordinate of the pointer in the map viewport.
     */
    viewportY : number ;
  }
}
declare namespace H.mapevents.Pointer {
  /**
   * This enumeration defines identifiers for MouseEvent.button values
   */
  enum Button {
    LEFT = 0.0 ,
    MIDDLE = 1.0 ,
    NONE = -1.0 ,
    RIGHT = 2.0 ,
  }
  type Buttons = number ;
}
declare namespace H.mapevents {
  /**
   * This class represents an event fired when the mouse wheel is turned, with the
   * mouse pointer on the map. It contains information about the cursor position
   * and the map object directly under the mouse pointer.
   */
  class WheelEvent extends H.util.Event {
    /**
     * This class represents an event fired when the mouse wheel is turned, with the
     * mouse pointer on the map. It contains information about the cursor position
     * and the map object directly under the mouse pointer.
     * @param deltaY The wheel move delta on the y-axis
     * @param viewportX The x-coordinate of the event in the viewport
     * @param viewportY The y-coordinate of the event in the viewport
     * @param target The target element of the event
     * @param originalEvent An object representing the original event
     */
    constructor (deltaY : number , viewportX : number , viewportY : number , target : H.Map | null | H.map.Object , originalEvent : GlobalEvent ) ;
    /**
     * This property holds a value indicating the wheel move delta.
     */
    delta : number ;
    /**
     * This property holds the original mouse wheel event object.
     */
    originalEvent : GlobalEvent ;
    /**
     * This property holds the target for the event.
     */
    target : H.map.Object | null | H.Map ;
    /**
     * This property holds a value indicating map viewport x-position.
     */
    viewportX : number ;
    /**
     * This property holds a value indicating map viewport y-position.
     */
    viewportY : number ;
  }
}
declare namespace H.math {
  /**
   * This type represents a mask for 32 bits with a range of `[0x00000000 ... 0x7FFFFFFF]`.
   */
  type BitMask = number ;
  /**
   * This property holds the definition of a range (an object with min/max values).
   */
  type Range = { max : number , min : number } ;
}
declare namespace H.math {
  /**
   * This interface represents a two-dimensional point defined in terms of its x
   * and y coordinates (screen coordinate values).
   */
  interface IPoint {
    /**
     * This property represents the x-coordinate of the point.
     */
    x : number ;
    /**
     * This property represents the y-coordinate of the point.
     */
    y : number ;
  }
}
declare namespace H.math {
  /**
   * This interface represents a two-dimensional size consisting a with and a height.
   */
  interface ISize {
    /**
     * This property represents the height attribute.
     */
    h : number ;
    /**
     * This property represents the width attribute.
     */
    w : number ;
  }
}
declare namespace H.math {
  /**
   * This class represents a two-dimensional point, defined by its x and y coordinates.
   */
  class Point implements H.math.IPoint {
    /**
     * This class represents a two-dimensional point, defined by its x and y coordinates.
     * @param x coordinate of the point
     * @param y coordinate of the point
     */
    constructor (x : number , y : number ) ;
    x : number ;
    y : number ;
    /**
     * This method adds the coordinates of the point supplied by the caller to the
     * coordinates of the given point.
     * @param other An object whose coordinates are to be added to those of the given point
     */
    add (other : H.math.IPoint ) : H.math.Point ;
    /**
     * This method rounds the x and y coordinates of the given point up to the next
     * greater integer values.
     */
    ceil ( ) : H.math.Point ;
    /**
     * This method this creates a copy of the current point.
     * @param opt_out An optional point object to store the copied values
     */
    clone (opt_out ? : H.math.Point ) : H.math.Point ;
    /**
     * This method calculates the distance to a point supplied by the caller.
     * @param other An object representing the point to which the distance is to be calculated
     */
    distance (other : H.math.IPoint ) : number ;
    /**
     * This method compares two points by checking if their coordinates are equal.
     * @param other An object representing the point to which to compare the given point
     */
    equals (other : H.math.IPoint ) : boolean ;
    /**
     * This method rounds the x and y coordinates of the given point down to the next
     * smaller integer values.
     */
    floor ( ) : H.math.Point ;
    /**
     * This method calculates the closest point on the line specified by the caller
     * to the given point.
     * @param start A an object representing the start point of the line
     * @param end A an object representing the end point of the line
     */
    getNearest (start : H.math.IPoint , end : H.math.IPoint ) : H.math.IPoint ;
    /**
     * This method rounds the x and y coordinates of the given point.
     */
    round ( ) : H.math.Point ;
    /**
     * This method scales the coordinates of the given point by the factor(s)
     * provided by the caller.
     * @param factor A value indicating the multiplication factor
     * @param opt_factorY An optional value indicating the multiplication factor for the y-coordinate; if omitted, only `factor` is used
     */
    scale (factor : number , opt_factorY ? : number ) : H.math.Point ;
    /**
     * This method sets the x and y coordinate of the point.
     * @param x A value indicating the x-coordinate
     * @param y A value indicating the y-coordinate
     */
    set (a : number , b : number ) : any ;
    /**
     * This method subtract the coordinates of the point supplied by the caller
     * from the coordinates from the given point.
     * @param other An object representing the point whose coordinates are to be subtracted from those of the given point
     */
    sub (other : H.math.IPoint ) : H.math.Point ;
    /**
     * This method creates a `Point` instance from the `IPoint` object
     * provided by the caller.
     * @param iPoint An object implementing `IPoint`
     */
    static fromIPoint (iPoint : H.math.IPoint ) : H.math.Point ;
  }
}
declare namespace H.math {
  /**
   * This class defines a rectangle in two-dimensional geometric space. It is used
   * to represent the area in projected space.
   */
  class Rect {
    /**
     * This class defines a rectangle in two-dimensional geometric space. It is used
     * to represent the area in projected space.
     * @param left An x-value indicating the left edge of the rectangle
     * @param top A y-value indicating the top edge of the rectangle
     * @param right An x-value indicating the right edge of the rectangle
     * @param bottom A y-value indicating the bottom edge of the rectangle
     */
    constructor (left : number , top : number , right : number , bottom : number ) ;
    /**
     * This property holds a y-value indicating the bottom edge of the rectangle.
     */
    bottom : number ;
    /**
     * This method clones the given rectangle.
     */
    clone ( ) : H.math.Rect ;
    /**
     * This method checks if the provided coordinates lie within the rectangle.
     * @param x The value of the x-coordinate to check
     * @param y The value of the y-coordinate to check
     */
    containsXY (x : number , y : number ) : boolean ;
    /**
     * This method retrieves the bottom-right vertex of the rectangle.
     */
    getBottomRight ( ) : H.math.Point ;
    /**
     * This method retrieves the top-left vertex of the rectangle.
     */
    getTopLeft ( ) : H.math.Point ;
    /**
     * This property holds an x-value indicating the left edge of the rectangle.
     */
    left : number ;
    /**
     * This property holds an x-value indicating the right edge of the rectangle.
     */
    right : number ;
    /**
     * This method sets the values of the edges of the rectangle.
     * @param left An x-value indicating the left edge of the rectangle
     * @param top A y-value indicating the top edge of the rectangle
     * @param right An x-value indicating the right edge of the rectangle
     * @param bottom A y-value indicating the bottom edge of the rectangle
     */
    set (a : number , b : number , c : number , d : number ) : any ;
    /**
     * This property holds a y-value indicating the top edge of the rectangle.
     */
    top : number ;
    /**
     * This method creates a rectangle from a top-left and bottom-right point pair.
     * @param topLeft The top-left vertex of the rectangle
     * @param bottomRight The bottom-right vertex of the rectangle
     */
    static fromPoints (topLeft : H.math.IPoint , bottomRight : H.math.IPoint ) : H.math.Rect ;
  }
}
declare namespace H.math {
  /**
   * This class represents a size defines in terms of width and height.
   */
  class Size implements H.math.ISize {
    /**
     * This class represents a size defines in terms of width and height.
     * @param width A value indicating width
     * @param height A value indicating height
     */
    constructor (width : number , height : number ) ;
    /**
     * This property represents the height attribute.
     */
    h : number ;
    /**
     * This property represents the width attribute.
     */
    w : number ;
  }
}
declare namespace H.service {
  /**
   * This type encapsulates URL parameters to be sent to a HERE platform service.
   *
   * When calling HERE REST APIs, additional URL parameters can be sent by providing
   * an object parameter which contains URL parameters in key-value format,
   * where keys are URL parameter names and the values are the parameter values.
   *
   * Note: The object assumes that values are in string format.
   */
  type ServiceParameters = { [ key: string ]: any } ;
  /**
   * This type encapsulates a response object provider by a HERE platform service.
   * The structure of a service response object is specific to each service.
   */
  type ServiceResult = GlobalObject ;
  /**
   * This type represents a handle object.
   */
  type JsonpRequestHandle = GlobalObject ;
  /**
   * This type defines options which are used to initialize a tile provider.
   */
  type TileProviderOptions = { crossOrigin ? : string | null , headers ? : GlobalObject } ;
}
declare namespace H.service {
  /**
   * This service is no longer being actively developed.
   * The {@link H.service.SearchService} could be used instead.
   *
   * This class encapsulates the Geocoding REST API in a service stub, providing
   * methods to access its resources.
   *
   * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
   * Instead an instance of this Service can be retrieved by calling the factory method
   * {@link H.service.Platform#getGeocodingService} on a platform instance.
   */
  class GeocodingService extends H.service.Service {
    /**
     * This service is no longer being actively developed.
     * The {@link H.service.SearchService} could be used instead.
     *
     * This class encapsulates the Geocoding REST API in a service stub, providing
     * methods to access its resources.
     *
     * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
     * Instead an instance of this Service can be retrieved by calling the factory method
     * {@link H.service.Platform#getGeocodingService} on a platform instance.
     * @param opt_options Configuration options for geocoding service
     */
    constructor (opt_options ? : H.service.GeocodingService.Options ) ;
    /**
     * This method sends a geocoding request to the Geocoder REST API and
     * calls the `onResult` callback function once the service response
     * becomes available (providing a {@link H.service.ServiceResult} object)
     * or the `onError` callback if a communication error occurs.
     *
     * Please refer to the
     * [Geocoder REST API documentation](https://developer.here.com/documentation/geocoder)
     * for information on available parameters and the response object structure.
     * @param geocodingParams Contains service parameters to be sent with the geocoding request.
     * @param onResult A callback function to be called once the Geocoder REST API provides a response to the request.
     * @param onError A callback function to be called if a communication error occurs during the request
     */
    geocode (geocodingParams : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * This method sends a reverse geocoding request to Geocoder REST API and
     * calls the `onResult` callback function once the service response
     * becomes available (providing a {@link H.service.ServiceResult} object)
     * or the `onError` callback if a communication error occurs.
     *
     * Please refer to the
     * [Geocoder REST API documentation](https://developer.here.com/documentation/geocoder)
     * for information on available parameters and the response object structure.
     * @param reverseGeocodingParams Contains the service parameters to be sent with the reverse geocoding request
     * @param onResult A callback function to be called once the Geocoder REST API provides a response to the request
     * @param onError A callback function to be called if a communication error occurs during the request
     */
    reverseGeocode (reverseGeocodingParams : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * This method sends a landmark search request to the Geocoder REST API and
     * calls the `onResult` callback function once the service response
     * becomes available (providing a {@link H.service.ServiceResult} object)
     * or the `onError` callback if a communication error occurs.
     *
     * Please refer to the
     * [Geocoder REST API documentation](https://developer.here.com/documentation/geocoder)
     * for information on available parameters and the response object structure.
     * @param searchParams Contains the service parameters to be sent with the landmark search request
     * @param onResult A callback function to be called once the Geocoder REST API provides a response to the request
     * @param onError A callback function to be called if a communication error occurs during the request
     */
    search (searchParams : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * The property name to use when specifying options for this service
     * within the {@link H.service.Platform.Options#servicesConfig}.
     */
    static CONFIG_KEY : string ;
  }
}
declare namespace H.service.GeocodingService {
  type Options = { baseUrl ? : H.service.Url , headers ? : H.service.ServiceParameters , path ? : string , reverseSubDomain ? : string , subDomain ? : string } ;
}
declare namespace H.service {
  /**
   * This class encapsulates a map tile end point of the
   * [HERE Map Tile API](https://developer.here.com/documentation/map-tile).
   *
   * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
   * Instead an instance of this Service can be retrieved by calling the factory method
   * {@link H.service.Platform#getMapTileService} on a platform instance.
   */
  class MapTileService extends H.service.Service {
    /**
     * This class encapsulates a map tile end point of the
     * [HERE Map Tile API](https://developer.here.com/documentation/map-tile).
     *
     * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
     * Instead an instance of this Service can be retrieved by calling the factory method
     * {@link H.service.Platform#getMapTileService} on a platform instance.
     * @param opt_options Configuration options for map tile service
     */
    constructor (opt_options ? : H.service.MapTileService.Options ) ;
    /**
     * This method creates a tile layer. This layer can be used as a layer on the map data model.
     * @param tileType An identifier of the tile type
     * @param scheme An identifier of the tile scheme
     * @param tileSize A value indicating the tile size
     * @param format An identifier of the tile image format
     * @param opt_additionalParameters A hash of additional parameters to be sent to [HERE Map Tile API](https://developer.here.com/documentation/map-tile) with each tile request.
     * @param opt_opacity The opacity of the map tiles in range `[0...1]`, the default is `1.0`.
     * @param opt_dark Indicates whether the content of this layer is mainly dark, the default is `false`. See also {@link H.Map.Options#autoColor}.
     * @param opt_options An additional set of options for the provider
     */
    createTileLayer (tileType : string , scheme : string , tileSize : number , format : string , opt_additionalParameters ? : H.service.ServiceParameters , opt_opacity ? : number , opt_dark ? : boolean , opt_options ? : H.service.TileProviderOptions ) : H.map.layer.TileLayer ;
    /**
     * This method creates a tile provider which uses the specified map tiles. This
     * provider can be used as a data source for an `ImageTileLayer`.
     * @param tileType An identifier of the tile type
     * @param scheme An identifier of the tile scheme
     * @param tileSize A value indicating the tile size
     * @param format An identifier of the tile image format
     * @param opt_additionalParameters a hash of additional parameters to be sent to the [HERE Map Tile API](https://developer.here.com/documentation/map-tile) with each tile request
     * @param opt_options Contains a set of options for the tile provider object
     */
    createTileProvider (tileType : string , scheme : string , tileSize : number , format : string , opt_additionalParameters ? : H.service.ServiceParameters , opt_options ? : H.service.TileProviderOptions ) : H.map.provider.ImageTileProvider ;
    /**
     * This method retrieves meta information for the map tile service. It returns
     * an object if the data associated with the given map tile service has been fetched.
     */
    getInfo ( ) : H.service.metaInfo.Service.Info | undefined ;
    /**
     * This method retrieves the map tile type provided by this service.
     */
    getType ( ) : string ;
    /**
     * This method retrieves a hash representing the newest version of the given map
     * tile service.
     */
    getVersion ( ) : string ;
    /**
     * The property name to use when specifying options for this service
     * within the {@link H.service.Platform.Options#servicesConfig}.
     */
    static CONFIG_KEY : string ;
  }
}
declare namespace H.service.MapTileService {
  type Info = { formats : { [ key: string ]: GlobalObject } , languages : { [ key: string ]: GlobalObject } , maps : { [ key: string ]: GlobalObject } , resolutions : { [ key: string ]: GlobalObject } , schemes : { [ key: string ]: GlobalObject } , tiletypes : { [ key: string ]: GlobalObject } } ;
  type Options = { baseUrl ? : H.service.Url , headers ? : GlobalObject , path ? : string , shards ? : string [] , subDomain ? : string , type ? : string , version ? : string } ;
}
declare namespace H.service {
  /**
   * This type encapsulates configuration (initialization) options for an instance of a service.
   */
  type Options = { baseUrl ? : H.service.Url , headers ? : GlobalObject , path ? : string , subDomain ? : string } ;
}
declare namespace H.service {
  /**
   * This service is no longer being actively developed.
   * The {@link H.service.SearchService} could be used instead.
   *
   * This service implements a low-level Places REST API access.
   * Please refer to [Restful API documentation](https://developer.here.com/documentation/places)
   * for providing parameters and handling response objects.
   *
   * Entry point parameters are specified as key:value pairs which are transformed into URL parameters.
   * Request headers can be specified along with entry point parameters.
   *
   * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
   * Instead an instance of this Service can be retrieved by calling the factory method
   * {@link H.service.Platform#getPlacesService} on a platform instance.
   */
  class PlacesService extends H.service.Service {
    /**
     * This service is no longer being actively developed.
     * The {@link H.service.SearchService} could be used instead.
     *
     * This service implements a low-level Places REST API access.
     * Please refer to [Restful API documentation](https://developer.here.com/documentation/places)
     * for providing parameters and handling response objects.
     *
     * Entry point parameters are specified as key:value pairs which are transformed into URL parameters.
     * Request headers can be specified along with entry point parameters.
     *
     * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
     * Instead an instance of this Service can be retrieved by calling the factory method
     * {@link H.service.Platform#getPlacesService} on a platform instance.
     * @param opt_options Configuration options for places service
     */
    constructor (opt_options ? : H.service.Options ) ;
    /**
     * This method triggers the Places API 'around' entry point. Please refer to
     * [documentation](https://developer.here.com/documentation/places/dev_guide/topics_api/resource-around.html)
     * for parameter specification and response handling.
     * @param aroundParams Contains Places API 'around' entry point parameters, please refer to Places API documentation
     * @param onResult A callback which is called when result is available
     * @param onError A callback which is called when an error occurs
     */
    around (aroundParams : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * This method triggers the Places API 'categories' entry point. Please refer to
     * [documentation](https://developer.here.com/documentation/places/dev_guide/topics_api/resource-place-categories.html)
     * for parameter specification and response handling.
     * @param categoriesParams Contains Places API 'categories' entry point parameters, please refer to Places API documentation
     * @param onResult A callback which is called when result is available
     * @param onError A callback which is called when an error occurs
     */
    categories (categoriesParams : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * This method triggers the Places API 'explore' entry point. Please refer to
     * [documentation](https://developer.here.com/documentation/places/dev_guide/topics_api/resource-explore.html)
     * for parameter specification and response handling.
     * @param exploreParams Contains Places API 'explore' entry point parameters, please refer to Places API documentation
     * @param onResult A callback which is called when result is available
     * @param onError A callback which is called when an error occurs
     */
    explore (exploreParams : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * This method is used to follow hyperlinks in the results returned by discovery queries.
     * @param hyperlink A string containing a hyperlink to follow
     * @param onResult A callback which is called when result is available
     * @param onError A callback which is called when an error occurs
     * @param opt_additionalParameters Contains additional parameters to send with the request
     */
    follow (hyperlink : string , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any , opt_additionalParameters ? : GlobalObject ) : H.util.ICancelable ;
    /**
     * This method triggers the Places API 'here' entry point. Please refer to
     * [documentation](https://developer.here.com/documentation/places/dev_guide/topics_api/resource-here.html)
     * for parameter specification and response handling.
     * @param hereParams Contains Places API 'here' entry point parameters, please refer to Places API documentation
     * @param onResult A callback which is called when result is available
     * @param onError A callback which is called when an error occurs
     */
    here (hereParams : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * This method implements a generic means of querying the Places REST API.
     * @param entryPoint An identifier indicating one of the available entry points ({@link H.service.PlacesService.EntryPoint}), for example, `H.service.PlacesService.EntryPoint.SEARCH`
     * @param entryPointParams Contains map key value pairs to be transformed into the URL parameters. For entry point parameters description, please refer to Places RESTful API [documentation](https://developer.here.com/documentation/places)
     * @param onResult A callback which is called when result is available
     * @param onError A callback which is called when an error occurs (for example request timeout)
     */
    request (entryPoint : string , entryPointParams : GlobalObject , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * This method triggers the Places API 'search' entry point. Please refer to
     * [documentation](https://developer.here.com/documentation/places/dev_guide/topics_api/resource-search.html)
     * for parameter specification and response handling.
     * @param searchParams Contains Places API search entry point parameters, please refer to Places API documentation
     * @param onResult A callback which is called when result is available
     * @param onError A callback which is called when an error occurs
     */
    search (searchParams : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * This method triggers the Places API 'suggestions' entry point. Please refer to
     * [documentation](https://developer.here.com/documentation/places/dev_guide/topics_api/resource-suggest.html)
     * for parameter specification and response handling.
     * @param suggestParams Contains Places API 'suggest' entry point parameters, please refer to Places API documentation
     * @param onResult A callback which is called when result is available
     * @param onError A callback which is called when an error occurs
     */
    suggest (suggestParams : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * The property name to use when specifying options for this service
     * within the {@link H.service.Platform.Options#servicesConfig}.
     */
    static CONFIG_KEY : string ;
  }
}
declare namespace H.service.PlacesService {
  /**
   * This object contains a list of available entry points.
   */
  enum EntryPoint {
    AROUND = 'discover\/around' ,
    CATEGORIES = 'categories\/places' ,
    EXPLORE = 'discover\/explore' ,
    HERE = 'discover\/here' ,
    SEARCH = 'discover\/search' ,
    SUGGEST = 'suggest' ,
  }
}
declare namespace H.service {
  /**
   * `Platform` is a central class from which all other service stubs are created.
   * It contains the shared settings to be passed to the individual service stubs,
   * for example the root URL of the platform, application credentials, etc.
   */
  class Platform {
    /**
     * `Platform` is a central class from which all other service stubs are created.
     * It contains the shared settings to be passed to the individual service stubs,
     * for example the root URL of the platform, application credentials, etc.
     * @param options Contains configuration options
     */
    constructor (options : H.service.Platform.Options ) ;
    /**
     * This method creates a pre-configured set of HERE layers for convenient use with the map.
     * More details about the used map content services can be found at:
     * - [HERE Vector Tile API](https://developer.here.com/documentation/vector-tiles-api)
     * - [HERE Traffic API v6](https://developer.here.com/documentation/traffic)
     * - [HERE Traffic API v7](https://developer.here.com/documentation/traffic-api)
     * - [HERE Map Tile API v2](https://developer.here.com/documentation/map-tile/)
     * - [HERE Raster Tile API v3](https://developer.here.com/documentation/raster-tile-api/)
     * @param opt_tileSize If this parameter is a number, it indicates the tile size to be queried from the "HERE Map Tile API v2" or "HERE Raster Tile API v3" (the default value is `512`); if this parameter is an object, it represents configuration options for the layer and all the remaining parameters (below) should be omitted
     * @param opt_ppi An optional `ppi` parameter to use when querying tiles, the default is not specified. See [Base Map Tile – Optional Query Parameters](https://developer.here.com/documentation/map-tile/dev_guide/topics/resource-base-basetile.html#resource-base-basetile__includes-query-parameters) for more details. For layers with raster tiles from HERE Raster Tile API v3 a value > 72 means, that tiles designed for 400 ppi are used, otherwise 100 ppi.
     * @param opt_lang An identifier of the primary language parameter, the default is not specified
     * @param opt_secondaryLang An identifier of the secondary language parameter, the default is not specified
     * @param opt_style An optional 'style' parameter to use when querying map tiles, the default is not specified
     * @param opt_pois A Boolean value indicating if POIs are displayed on the map (`true`), valid for the "HERE Vector Tile API", "HERE Map Tile API v2" and "HERE Raster Tile API v3". For layers from HERE Map Tile API v2, a string for the POI Categories can be provided as described in the documentation for [POI Categories](https://developer.here.com/documentation/map-tile/dev_guide/topics/resource-meta-pois.html). By default POIs are disabled.
     */
    createDefaultLayers (opt_tileSize ? : H.service.Platform.DefaultLayersOptions | number , opt_ppi ? : number , opt_lang ? : string , opt_secondaryLang ? : string , opt_style ? : string , opt_pois ? : string | boolean ) : GlobalObject ;
    /**
     * This method creates hybrid map layers. A hybrid map consists of raster satellite base layer and
     * vector layers on top. Layers created by this method can be used only when the Map is instantiated
     * with {@link H.Map.EngineType.HARP} engineType. See: {@link H.Map.Options}.
     * @param styleConfig The hybrid style configuration. Can be either a configuration object or URL to the configuration. The URL can be absolute or relative, but should end with `.json` extension.
     * @param onSuccess A callback function to be called once layers are successfully created. A callback accepts an object with 3 layers: `raster`, `vector` and `traffic`.
     * @param onError A callback function to be called if an error occurs during the layers creation.
     */
    createHybridLayers (styleConfig : GlobalObject | string , onSuccess : (a : { [ key: string ]: H.map.layer.TileLayer } ) => any , onError : (a : Error ) => any ) : void ;
    /**
     * This method creates an instance of a given service class,
     * configured with options that are based on defaults and supplied overrides.
     * @param Service The constructor of the service to instantiate
     * @param opt_options Contains configuration options for a given service
     */
    createService (Service : { new (a ? : GlobalObject ) : GlobalObject } , opt_options ? : GlobalObject ) : H.service.Service ;
    /**
     * To obtain the currently used base URL.
     */
    getBaseUrl ( ) : H.service.Url ;
    /**
     * To obtain a new instance of {@link H.service.extension.customLocation.Service} to query the
     * [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/index.html)
     * endpoints related to creation, modification and retrieval of the custom data layers.
     * @param opt_options Configuration options of the service
     */
    getCustomLocationService (opt_options ? : H.service.Options ) : H.service.extension.customLocation.Service ;
    /**
     * To obtain a new instance of {@link H.service.extension.customRoute.Service} to query the
     * custom route endpoint of the [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/index.html).
     * @param opt_options Configuration options of the service
     */
    getCustomRoutingService (opt_options ? : H.service.Options ) : H.service.extension.customRoute.Service ;
    /**
     * To create a new instance of {@link H.service.GeocodingService} to query the
     * [Geocoder API](https://developer.here.com/documentation/geocoder/dev_guide/topics/what-is.html).
     * @param opt_options Configuration options for geocoding service
     */
    getGeocodingService (opt_options ? : H.service.GeocodingService.Options ) : H.service.GeocodingService ;
    /**
     * Returns a new instance of {@link H.service.extension.geofencing.Service} to query the
     * [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/index.html).
     * @param opt_options Configuration options for geofencing service
     */
    getGeofencingService (opt_options ? : H.service.Options ) : H.service.extension.geofencing.Service ;
    /**
     * This method returns an instance of {@link H.service.iml.Service} to query the
     * [HERE Interactive Map Layer Data API](https://developer.here.com/documentation/data-api/data_dev_guide/rest/getting-data-interactive.html).
     * @param opt_options Configuration options for the IML service.
     */
    getIMLService (opt_options ? : H.service.iml.Service.Options ) : H.service.iml.Service ;
    /**
     * To create a new instance of {@link H.service.MapTileService} to query the
     * [Map Tile API](https://developer.here.com/documentation/map-tile).
     * @param opt_options Configuration options for map tile service
     */
    getMapTileService (opt_options ? : H.service.MapTileService.Options ) : H.service.MapTileService ;
    /**
     * This method returns an instance of {@link H.service.metaInfo.Service} to query the
     * [Map Tile API](https://developer.here.com/documentation/map-tile)
     * [Metainfo Tiles](https://developer.here.com/documentation/map-tile/dev_guide/topics/tile-metainfo.html)
     * @param opt_options Configuration options for meta info service
     */
    getMetaInfoService (opt_options ? : H.service.metaInfo.Service.Options ) : H.service.metaInfo.Service ;
    /**
     * To create a new instance of {@link H.service.omv.Service}
     * to query data from the HERE Optimized Map Visualization (OMV) endpoint.
     * @param opt_options Configuration options for OMV service
     */
    getOMVService (opt_options ? : H.service.omv.Service.Options ) : H.service.omv.Service ;
    /**
     * To create a new instance of {@link H.service.PlacesService} to query the
     * [Places API](https://developer.here.com/documentation/places).
     * @param opt_options Configuration options for places service
     */
    getPlacesService (opt_options ? : H.service.omv.Service.Options ) : H.service.PlacesService ;
    /**
     * This method returns an instance of {@link H.service.extension.platformData.Service} to query the
     * [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/index.html).
     * @param opt_options Configuration options of the service
     */
    getPlatformDataService (opt_options ? : H.service.Options ) : H.service.extension.platformData.Service ;
    /**
     * This method returns an instance of {@link H.service.publicTransit.Service} to query the
     * [HERE Public Transit API](https://developer.here.com/documentation/public-transit/dev_guide/index.html).
     * @param opt_options Configuration options for Public Transit service.
     */
    getPublicTransitService (opt_options ? : H.service.Options ) : H.service.publicTransit.Service ;
    /**
     * To create a new instance of {@link H.service.rasterTile.Service}
     * to query data from the HERE Raster Tile API endpoint.
     * @param opt_options Configuration options for Raster Tile Service
     */
    getRasterTileService (opt_options ? : H.service.rasterTile.Service.Options ) : H.service.rasterTile.Service ;
    /**
     * To create a new instance of {@link H.service.RoutingService} to query the selected Routing API.
     * For compatibility reasons the class defaults to the deprecated
     * [Routing API v7](https://developer.here.com/documentation/routing/), new applications should provide
     * the optional `opt_version` parameter to get access to the new
     * [Routing API v8](https://developer.here.com/documentation/routing-api/)
     *
     * For China, `opt_version` is ignored and this method returns an instance of {@link H.service.RoutingService8}.
     * @param opt_options Configuration options for routing service
     * @param opt_version Indicates the version of the Routing API to use, allowed values are `7` for the [Routing API v7](https://developer.here.com/documentation/routing/) and `8` for the [Routing API v8](https://developer.here.com/documentation/routing-api/). Default is `7`.
     */
    getRoutingService (opt_options ? : H.service.Options , opt_version ? : number ) : H.service.RoutingService | H.service.RoutingService8 ;
    /**
     * To create a new instance of {@link H.service.SearchService}
     * to query the Geocoding and Search API endpoints.
     * @param opt_options Configuration options for the Search service
     */
    getSearchService (opt_options ? : H.service.Options ) : H.service.SearchService ;
    /**
     * This method returns either an instance of {@link H.service.traffic.Service} or
     * {@link H.service.traffic.Service7} to query the selected Traffic API.
     *
     * For compatibility reasons the class defaults to the deprecated
     * [HERE Traffic API](https://developer.here.com/documentation/traffic/dev_guide/topics/resources.html) and
     * [HERE Traffic Incident Data](https://developer.here.com/documentation/traffic/dev_guide/topics/incident-data.html),
     * new applications should provide the optional `opt_version` parameter to get
     * access to the new [Traffic API v7](https://developer.here.com/documentation/traffic-api/).
     * @param opt_options Configuration options for traffic service
     * @param opt_version Indicates the version of the Traffic API to use, allowed values are `6` for the [Traffic API v6](https://developer.here.com/documentation/traffic/) and `7` for the [Traffic API v7](https://developer.here.com/documentation/traffic-api/). Default is `6`.
     */
    getTrafficService (opt_options ? : H.service.traffic.Service.Options , opt_version ? : number ) : H.service.traffic.Service | H.service.traffic.Service7 ;
    /**
     * Creates a new instance of {@link H.service.trafficVectorTile.Service}
     * to query data from the HERE Traffic Vector Tile API.
     * @param opt_options Configuration options for service
     */
    getTrafficVectorTileService (opt_options ? : H.service.trafficVectorTile.Service.Options ) : H.service.trafficVectorTile.Service ;
    /**
     * To set the base URL to be used when creating service stubs.
     * @param baseUrl The new base URL to use
     */
    setBaseUrl (baseUrl : H.service.Url ) : void ;
  }
}
declare namespace H.service.Platform {
  type DefaultLayersOptions = { crossOrigin ? : string | null , engineType ? : number , lg ? : string , lg2 ? : string , pois ? : boolean | string , politicalView ? : string , ppi ? : number , style ? : string , tileSize ? : number } ;
  type Options = { apikey : string , baseUrl ? : H.service.Url , headers ? : GlobalObject , servicesConfig ? : GlobalObject } ;
}
declare namespace H.service {
  /**
   * This service is no longer being actively developed.
   * The {@link H.service.RoutingService8} could be used instead.
   *
   * This class encapsulates the [Routing API v7](https://developer.here.com/documentation/routing/)
   * as a service stub.
   *
   * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
   * Instead an instance of this Service can be retrieved by calling the factory method
   * {@link H.service.Platform#getRoutingService} on a platform instance.
   */
  class RoutingService extends H.service.Service {
    /**
     * This service is no longer being actively developed.
     * The {@link H.service.RoutingService8} could be used instead.
     *
     * This class encapsulates the [Routing API v7](https://developer.here.com/documentation/routing/)
     * as a service stub.
     *
     * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
     * Instead an instance of this Service can be retrieved by calling the factory method
     * {@link H.service.Platform#getRoutingService} on a platform instance.
     * @param opt_options Configuration options for routing service
     */
    constructor (opt_options ? : H.service.Options ) ;
    /**
     * This method sends a "calculateisoline" request to the Routing REST API and
     * calls the `onResult` callback function once the service response
     * becomes available (providing a {@link H.service.ServiceResult} object)
     * or the `onError` callback if a communication error occurred.
     *
     * Please refer to the
     * [Routing API v7](https://developer.here.com/documentation/routing) documentation
     * for information on available parameters and the response object structure.
     * @param params Contains service parameters to be sent with the request.
     * @param onResult A callback function to be called once the API provides a response to the request.
     * @param onError A callback function to be called if a communication error occurs during the request.
     */
    calculateIsoline (params : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * This method sends a "calculateroute" request to the Routing REST API and
     * calls the `onResult` callback function once the service response
     * becomes available (providing a {@link H.service.ServiceResult} object)
     * or the `onError` callback if a communication error occurred.
     *
     * Please refer to the
     * [Routing API v7](https://developer.here.com/documentation/routing) documentation
     * for information on available parameters and the response object structure.
     * @param params Contains service parameters to be sent with the request.
     * @param onResult A callback function to be called once the API provides a response to the request.
     * @param onError A callback function to be called if a communication error occurs during the request.
     */
    calculateRoute (params : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * The property name to use when specifying options for this service
     * within the {@link H.service.Platform.Options#servicesConfig}.
     */
    static CONFIG_KEY : string ;
  }
}
declare namespace H.service {
  /**
   * This class encapsulates the [Routing API v8](https://developer.here.com/documentation/routing-api/)
   * as a service stub.
   *
   * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
   * Instead an instance of this Service can be retrieved by calling the factory method
   * {@link H.service.Platform#getRoutingService} on a platform instance.
   */
  class RoutingService8 extends H.service.Service {
    /**
     * This class encapsulates the [Routing API v8](https://developer.here.com/documentation/routing-api/)
     * as a service stub.
     *
     * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
     * Instead an instance of this Service can be retrieved by calling the factory method
     * {@link H.service.Platform#getRoutingService} on a platform instance.
     * @param opt_options Configuration options for routing service
     */
    constructor (opt_options ? : H.service.Options ) ;
    /**
     * This method sends a "Calculate Isoline" request to
     * the [HERE Isoline Routing API v8](https://developer.here.com/documentation/isoline-routing-api/) and
     * calls the `onResult` callback function once the service response
     * becomes available (providing a {@link H.service.ServiceResult} object)
     * or the `onError` callback if a communication error occurred.
     *
     * Please refer to the
     * [HERE Isoline Routing API v8](https://developer.here.com/documentation/isoline-routing-api/) documentation
     * for information on available parameters and the response object structure.
     * @param params Contains service parameters to be sent with the request.
     * @param onResult A callback function to be called once the API provides a response to the request.
     * @param onError A callback function to be called if a communication error occurs during the request.
     */
    calculateIsoline (params : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * This method sends a request to the [Routing API v8](https://developer.here.com/documentation/routing-api/)
     * to calculate a route and calls the `onResult` callback function once the service response
     * becomes available (providing a {@link H.service.ServiceResult} object)
     * or the `onError` callback if a communication error occurred.
     *
     * Please refer to the
     * [Routing API v8](https://developer.here.com/documentation/routing-api/) documentation
     * for information on available parameters and the response object structure.
     * @param params Contains service parameters to be sent with the request.
     * @param onResult A callback function to be called once the API provides a response to the request.
     * @param onError A callback function to be called if a communication error occurs during the request.
     */
    calculateRoute (params : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * The property name to use when specifying options for this service
     * within the {@link H.service.Platform.Options#servicesConfig}.
     */
    static CONFIG_KEY : string ;
  }
}
declare namespace H.service {
  /**
   * This class encapsulates the [Geocoding and Search API](https://developer.here.com/documentation/geocoding-search-api/)
   * as a service stub.
   *
   * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
   * Instead an instance of this Service can be retrieved by calling the factory method
   * {@link H.service.Platform#getSearchService} on a platform instance.
   */
  class SearchService extends H.service.Service {
    /**
     * This class encapsulates the [Geocoding and Search API](https://developer.here.com/documentation/geocoding-search-api/)
     * as a service stub.
     *
     * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
     * Instead an instance of this Service can be retrieved by calling the factory method
     * {@link H.service.Platform#getSearchService} on a platform instance.
     * @param opt_options Configuration options for the Search service
     */
    constructor (opt_options ? : H.service.Options ) ;
    /**
     * This method improves the user's search experience by allowing submittal of free-form,
     * incomplete and misspelled addresses or place names to the endpoint of the
     * [Geocoding and Search API](https://developer.here.com/documentation/geocoding-search-api/).
     *
     * Please refer to the
     * [`/autosuggest` endpoint documentation](https://developer.here.com/documentation/geocoding-search-api/dev_guide/topics/endpoint-autosuggest-brief.html)
     * for information on available parameters and the response object structure.
     * @param params Contains service parameters to be sent with the request.
     * @param onResult A callback function to be called once the API provides a response to the request.
     * @param onError A callback function to be called if a communication error occurs during the request.
     */
    autosuggest (params : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * This method uses the `/browse` endpoint of the
     * [Geocoding and Search API](https://developer.here.com/documentation/geocoding-search-api/) and returns a
     * structured search result by filtering items by category and name at a given geo-position in a radius of 250km.
     * Items returned are places, streets or localities, ranked by increasing distance.
     *
     * Please refer to the
     * [`/browse` endpoint documentation](https://developer.here.com/documentation/geocoding-search-api/dev_guide/topics/endpoint-browse-brief.html)
     * for information on available parameters and the response object structure.
     * @param params Contains service parameters to be sent with the request.
     * @param onResult A callback function to be called once the API provides a response to the request.
     * @param onError A callback function to be called if a communication error occurs during the request.
     */
    browse (params : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * This method simplifies searching for places. The user submits a free-form text request that returns
     * candidate items (places and addresses related) in the order of intent matching relevance.
     *
     * Please refer to the
     * [`/discover` endpoint documentation](https://developer.here.com/documentation/geocoding-search-api/dev_guide/topics/endpoint-discover-brief.html)
     * for information on available parameters and the response object structure.
     * @param params Contains service parameters to be sent with the request.
     * @param onResult A callback function to be called once the API provides a response to the request.
     * @param onError A callback function to be called if a communication error occurs during the request.
     */
    discover (params : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * This method can be used  to find the geographic coordinates of a known address, place, locality
     * or administrative area, even if the query is incomplete or partly incorrect. It also returns a complete postal
     * address string and address details. It sends a geocoding request to the `/geocode` endpoint of the
     * [Geocoding and Search API](https://developer.here.com/documentation/geocoding-search-api/).
     *
     * Please refer to the
     * [`/geocode` endpoint documentation](https://developer.here.com/documentation/geocoding-search-api/dev_guide/topics/endpoint-geocode-brief.html)
     * for information on available parameters and the response object structure.
     * @param params Contains service parameters to be sent with the request.
     * @param onResult A callback function to be called once the API provides a response to the request.
     * @param onError A callback function to be called if a communication error occurs during the request.
     */
    geocode (params : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * Every place or location object known by HERE has a location identifier or "ID".
     * This method sends a lookup request by `ID` to the `/lookup` endpoint of the
     * [Geocoding and Search API](https://developer.here.com/documentation/geocoding-search-api/).
     *
     * Please refer to the
     * [`/lookup` endpoint documentation](https://developer.here.com/documentation/geocoding-search-api/dev_guide/topics/endpoint-lookup-brief.html)
     * for information on available parameters and the response object structure.
     * @param params Contains service parameters to be sent with the request.
     * @param onResult A callback function to be called once the API provides a response to the request.
     * @param onError A callback function to be called if a communication error occurs during the request.
     */
    lookup (params : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * This method can be used to find the nearest address to specific geographic coordinates.
     * It sends a reverse geocoding request to the `/revgeocode` endpoint of the
     * [Geocoding and Search API](https://developer.here.com/documentation/geocoding-search-api/).
     *
     * Please refer to the
     * [`/revgeocode` endpoint documentation](https://developer.here.com/documentation/geocoding-search-api/dev_guide/topics/endpoint-reverse-geocode-brief.html)
     * for information on available parameters and the response object structure.
     * @param params Contains service parameters to be sent with the request.
     * @param onResult A callback function to be called once the API provides a response to the request.
     * @param onError A callback function to be called if a communication error occurs during the request.
     */
    reverseGeocode (params : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * The property name to use when specifying options for this service
     * within the {@link H.service.Platform.Options#servicesConfig}.
     */
    static CONFIG_KEY : string ;
  }
}
declare namespace H.service {
  /**
   * This class is an abstract service with a basic functionality of requesting the url configured
   * by the passed options and configured default options implemented by the subclasses.
   */
  abstract class Service extends H.util.EventTarget {
    /**
     * This class is an abstract service with a basic functionality of requesting the url configured
     * by the passed options and configured default options implemented by the subclasses.
     * @param constructor Reference to the child class constructor
     * @param opt_options Optional configuration options.
     */
    constructor (constructor : Function , opt_options ? : GlobalObject ) ;
    /**
     * This method returns the configured service URL.
     */
    getUrl ( ) : H.service.Url ;
  }
}
declare namespace H.service {
  /**
   * This class represents a URL with elements such as the scheme, host/domain, path, etc.
   * Use the static parse method to populate a new URL object from a URL string.
   * Be aware that URLs with user and password are not supported.
   */
  class Url {
    /**
     * This class represents a URL with elements such as the scheme, host/domain, path, etc.
     * Use the static parse method to populate a new URL object from a URL string.
     * Be aware that URLs with user and password are not supported.
     * @param scheme The URL scheme (e.g. "http" or "https" or "mailto")
     * @param host The host (or domain) part of the URL
     * @param opt_path The path following the host, pointing to a resource
     * @param opt_params The query string parameters of the URL
     * @param opt_port The port on the host on which the host listens (if the value is provided as a string, it must be convertible to an integer)
     * @param opt_anchor An optional anchor part of the URL (usually preceded by '#');
     */
    constructor (scheme : string , host : string , opt_path ? : string , opt_params ? : H.service.ServiceParameters , opt_port ? : number , opt_anchor ? : string ) ;
    /**
     * This method adds a subdomain to the host in the given `Url` object.
     * @param subDomain The sub domain (a non-empty string) to be added
     */
    addSubDomain (subDomain : string ) : H.service.Url ;
    /**
     * This method adds a sub-path to the given `Url`'s path.
     * @param subPath The path to be added
     */
    addSubPath (subPath : string ) : H.service.Url ;
    /**
     * This method clones the given URL object. Optionally, mutations can be passed to this method
     * to modify properties of the cloned object.
     * Note that URL parameters are not replaced but merged with the parameters of the given instance.
     */
    clone ( ) : H.service.Url ;
    /**
     * This method retrieves the anchor from the given `Url` object.
     */
    getAnchor ( ) : string | undefined ;
    /**
     * This method retrieves the host name from the given `Url` object.
     */
    getHost ( ) : string ;
    /**
     * This method retrieves the path part of the given `Url` object.
     */
    getPath ( ) : string | undefined ;
    /**
     * This method retrieves the query object of the given `Url` object.
     */
    getQuery ( ) : H.service.ServiceParameters ;
    /**
     * This method retrieves the scheme for the given `Url` object.
     */
    getScheme ( ) : string ;
    /**
     * This method retrieves a Boolean value indicating whether there are any query string
     * parameter associated with the given `Url`.
     */
    hasQuery ( ) : boolean ;
    /**
     * This method merges the provided parameters into the given `Url`'s
     * existing parameters. The key-value pairs which are defined in the argument
     * are used to overwrite the existing URL parameters with matching keys.
     * The key-value pairs which are defined in the argument and are not defined in
     * the given `Url` object as URL parameters are added.
     * Prototype properties and function properties are not be merged.
     * @param other The parameters to be merged into the existing query string parameters
     */
    mergeQuery (other : H.service.ServiceParameters ) : H.service.Url ;
    /**
     * This method sets the anchor for the given `Url` object.
     * @param anchor The new anchor or undefined to clear the anchor
     */
    setAnchor (anchor : string | undefined ) : H.service.Url ;
    /**
     * This method sets the host for the given `Url` object.
     * @param host The new host
     */
    setHost (host : string ) : H.service.Url ;
    /**
     * This method sets the path for the given `Url` object.
     * @param path A string containing the new path or `undefined` to clear the path
     */
    setPath (path : string | undefined ) : H.service.Url ;
    /**
     * This method sets the specified parameters for the given `Url` object. Keys in this object, which
     * are associated with undefined values, are treated as query string
     * parameters with no value.
     * @param params A hash of query string parameters specifying the parameters to be set or a undefined to clear the parameters
     */
    setQuery (params : H.service.ServiceParameters | undefined ) : H.service.Url ;
    /**
     * This method sets the scheme of the given URL object.
     * @param scheme The new scheme
     */
    setScheme (scheme : string ) : H.service.Url ;
    /**
     * This method retrieves a string representation of the given `Url` object.
     */
    toString ( ) : string ;
    /**
     * This method parses a URL string and returns a `Url` object.
     * The URL string must contain at least a scheme and a host.
     * @param url The URL string to parse
     * @param opt_baseURL The base URL to use to resolve relative URLs. If omitted, the method uses the base URL of the document which loaded the API
     */
    static parse (url : string , opt_baseURL ? : string ) : H.service.Url ;
  }
}
declare namespace H.service.Url {
  class DelimitedQuerySubValues {
    /**
     * This class represents a query parameter value that contains multiple sub-values which are delimited by a given
     * character.
     * According to RFC 3986 this subset of sub-delims is allowed: `["!", "$", "(", ")", "*", "+", ",", ";"]`.
     * The specified delimiter character will be not URI-encoded when used as query parameter for an Url instance.
     * @param values The list of values to be associated to a key in a query string. The order of the values in the list will be preserved to build the query string.
     * @param delimiter The character to use as delimiter
     */
    constructor (values : ( string | number ) [] , delimiter : string ) ;
  }
  class MultiValueQueryParameter {
    /**
     * This class represents the set of values to be associated to a key in cases where it is required to be
     * repeated multiple times in a query string.
     * @param values The list of values to be associated to a key in a query string. The order of the values in the list will be preserved to build the query string.
     */
    constructor (values : ( string | number ) [] ) ;
    /**
     * Returns the array of values.
     */
    getValues ( ) : ( string | number ) [] ;
  }
}
declare namespace H.service.extension {
  /**
   * This function is a predicate, to test each {@link H.service.extension.dataView.IRow}.<*>
   * from the HERE Fleet Telematics API response. The ID of the according layer is passed as second argument.
   * Return `true` to keep the row, otherwise `false`.
   *
   * It must not modify the row! It must be a pure JavaScript function.
   */
  type RowFilter = (a : H.service.extension.dataView.IRow < any , any > , b : string ) => boolean ;
}
declare namespace H.service.extension {
  /**
   * This is an abstract provider for continuous fetching of data provided by the
   * [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/index.html).
   * Check specific implementations at {@link H.service.extension.customLocation.TileProvider} or
   * {@link H.service.extension.platformData.TileProvider}.
   */
  abstract class TileProvider extends H.map.provider.RemoteTileProvider {
    /**
     * This is an abstract provider for continuous fetching of data provided by the
     * [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/index.html).
     * Check specific implementations at {@link H.service.extension.customLocation.TileProvider} or
     * {@link H.service.extension.platformData.TileProvider}.
     * @param options An object containing configuration options
     */
    constructor (options : H.service.extension.TileProvider.Options ) ;
    providesDomMarkers ( ) : boolean ;
    providesMarkers ( ) : boolean ;
    providesSpatials ( ) : boolean ;
    requestTile (x : number , y : number , z : number , cacheOnly : boolean ) : H.map.provider.Tile | undefined ;
  }
}
declare namespace H.service.extension.TileProvider {
  type Options = { engineType ? : H.Map.EngineType , max ? : number , min ? : number , pixelRatio ? : number , resultType : H.service.extension.TileProvider.ResultType , styleCallback ? : H.service.extension.TileProvider.StyleCallback , tileCacheSize ? : number , tileSize ? : number , uri ? : string } ;
  /**
   * The supported types of map objects.
   * See also {@link H.service.extension.TileProvider.Options#resultType}.
   */
  enum ResultType {
    DOM_MARKER ,
    MARKER ,
    POLYGON ,
    POLYLINE ,
  }
  type StyleCallback = (a : H.service.extension.dataView.IRow < any , any > ) => H.map.Icon | H.map.DomIcon | H.map.SpatialStyle.Options ;
}
declare namespace H.service.extension.customLocation {
  /**
   * A `LayerConfig` is an object that contains a configuration for a custom data layer.
   */
  type LayerConfig = { columns : string [] | null , layerId : string , rowFilter ? : H.service.extension.RowFilter , rowFilterContext ? : GlobalObject } ;
}
declare namespace H.service.extension.customLocation {
  /**
   * An object that contains access permissions for a data layer that are granted for a specified `app_id`.
   */
  type Grant = { grantedAppId : string , permissions : H.service.extension.customLocation.Permission [] } ;
}
declare namespace H.service.extension.customLocation {
  /**
   * An object that contains meta information of a data layer.
   */
  type MetaInfo = { columnNames : string [] , grants ? : H.service.extension.customLocation.Grant [] , lastUpdateTimestamp ? : number , layerId : string , level ? : number , storage ? : H.service.extension.customLocation.Storage } ;
}
declare namespace H.service.extension.customLocation {
  /**
   * The access permissions types which can be granted to other `app_id`s.
   */
  /**
   * The access permissions types which can be granted to other `app_id`s.
   */
  enum Permission {
    EXPORT = 'export' ,
    READ = 'read' ,
    WRITE = 'write' ,
  }
}
declare namespace H.service.extension.customLocation {
  /**
   * This class provides methods for creation, modification and fetching of the custom data layers
   * using [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/index.html).
   * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
   * Instead an instance of this Service can be retrieved by calling the factory method
   * {@link H.service.Platform#getCustomLocationService} on a platform instance.
   */
  class Service extends H.service.Service {
    /**
     * This class provides methods for creation, modification and fetching of the custom data layers
     * using [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/index.html).
     * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
     * Instead an instance of this Service can be retrieved by calling the factory method
     * {@link H.service.Platform#getCustomLocationService} on a platform instance.
     * @param opt_options Configuration options of the service
     */
    constructor (opt_options ? : H.service.Options ) ;
    /**
     * To append rows to the data layers.
     * @param rows The data rows to append. All rows must have a `GEOMETRY_ID` cell whose value is `null` or an empty string.
     * @param onResult The callback to invoke when a chunk is processed. The following arguments are passed: <ul> <li> The list of processed rows. </li> <li>An indicator whether it's the last chunk.</li> </ul>
     * @param onError The callback to invoke when an error occurred. The following arguments are passed: <ul> <li> The occurred error. </li> <li> The list of rows of the chunk which caused the error. </li> <li>An indicator whether it's the last chunk.</li> </ul>
     */
    appendRows (rows : H.service.extension.customLocation.Table.Row [] , onResult : (a : H.service.extension.customLocation.Table.Row [] , b : boolean ) => any , onError : (a : Error , b : H.service.extension.customLocation.Table.Row [] , c : boolean ) => any ) : H.util.ICancelable ;
    /**
     * To create a new custom data layer on the
     * [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/index.html).
     * Provides a `Table` instance in response, that represents the created layer.
     * The operation fails (`onError` is triggered) if the layer already exists or the provided meta information contains
     * invalid properties.
     * @param metaInfo The meta information for the layer
     * @param onResult The callback to invoke when the layer could be created.
     * @param onError The callback to invoke if an error occurs.
     */
    createLayer (metaInfo : H.service.extension.customLocation.MetaInfo , onResult : (a : H.service.extension.customLocation.Table ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * To create a tile layer which can be added to the map in order to visualize data from the specified
     * custom data layer.
     * @param layerConfig The configuration for the data layer to load.
     * @param options The options to configure the tile provider.
     */
    createTileLayer (layerConfig : H.service.extension.customLocation.LayerConfig , options : H.service.extension.TileProvider.Options ) : H.map.layer.TileLayer | H.map.layer.MarkerTileLayer ;
    /**
     * To delete an existing custom data layer from the
     * [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/index.html).
     * @param layerId The ID of the data layer to delete.
     * @param onResult The callback to invoke if the layer could be deleted.
     * @param onError The callback to invoke if an error occurs.
     */
    deleteLayer (layerId : string , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * To delete rows from the data layer.
     * @param rows The data rows to delete. All rows must have a defined GEOMETRY_ID cell.
     * @param onResult The callback to invoke when a chunk is processed. The following arguments are passed: <ul> <li> The list of processed rows. </li> <li>An indicator whether it's the last chunk.</li> </ul>
     * @param onError The callback to invoke when an error occurred. The following arguments are passed: <ul> <li> The occurred error. </li> <li> The list of rows of the chunk which caused the error. </li> <li>An indicator whether it's the last chunk.</li> </ul>
     */
    deleteRows (rows : H.service.extension.customLocation.Table.Row [] , onResult : (a : H.service.extension.customLocation.Table.Row [] , b : boolean ) => any , onError : (a : Error , b : H.service.extension.customLocation.Table.Row [] , c : boolean ) => any ) : H.util.ICancelable ;
    /**
     * To fetch the meta information for a custom data layer from the
     * [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/index.html)
     * and create a `Table` instance, that represents the requested layer, to work with.
     * @param layerId The ID of the requested layer.
     * @param onResult The callback to invoke if the meta information could be fetched. It gets a `Table`, that represents the requested data layer, as argument.
     * @param onError The callback to invoke if an error occurs.
     */
    getLayer (layerId : string , onResult : (a : H.service.extension.customLocation.Table ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * To set the rights for other APP-IDs to access a data layer.
     * @param layerId The ID of the layer.
     * @param grants The grants for other App-IDs to access the layer.
     * @param onResult The callback to invoke if the access is granted.
     * @param onError The callback to invoke if an error occurs.
     */
    grantAccess (layerId : string , grants : H.service.extension.customLocation.Grant [] , onResult : (a : H.service.extension.customLocation.Table ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * This method sends a request to a resource with the provided name and type from the
     * [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/index.html).
     * @param entryPoint The entry point of the API.
     * @param entryPointType The response type for the entry point.
     * @param params A key-value map of query parameters to use for the request.
     * @param onResult The callback which is called when result is returned.
     * @param onError The callback which is called when error occurred (i.e request timeout, or server error)
     */
    request (entryPoint : H.service.extension.customLocation.Service.EntryPoint , entryPointType : H.service.extension.customLocation.Service.EntryPointType , params : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * To search for custom geometries by attribute filter, or download a complete layer.
     * It's possible to limit the resulting entries by different query parameters (see `opt_params` argument).
     * for more details).
     * @param layerId The ID of the data layer to download.
     * @param onResult The callback to invoke when a chunk of data is received. The following arguments are passed: <ol> <li> The list of received entries of the data layer. </li> <li>An indicator whether it's the last chunk.</li> </ol>
     * @param onError The callback to invoke when an error occurred.
     * @param opt_params A key-value map of query parameters to use for the search. A query parameter has a higher priority than a value provided by an according method argument.
     */
    searchAll (layerId : string , onResult : (a : H.service.extension.customLocation.Table.Row [] , b : boolean ) => any , onError : (a : Error ) => any , opt_params ? : H.service.ServiceParameters ) : H.util.ICancelable ;
    /**
     * To search for data layer entries within a rectangular geographical area.
     * See bounding box search details in the [API Reference](https://developer.here.com/documentation/fleet-telematics/api-reference.html).
     * for more details.
     * @param layerIds The IDs of the layers to search in.
     * @param boundingBox The geographical area where to search.
     * @param onResult The callback to invoke when a chunk of data is received. The following arguments are passed: <ol> <li> The list of received entries of the data layer. </li> <li>An indicator whether it's the last chunk.</li> </ol>
     * @param onError The callback to invoke when an error occurred.
     * @param opt_params A key-value map of query parameters to use for the search. A query parameter has a higher priority than a value provided by an according method argument.
     */
    searchByBoundingBox (layerIds : string [] , boundingBox : H.geo.Rect , onResult : (a : H.service.extension.customLocation.Table.Row [] , b : boolean ) => any , onError : (a : Error ) => any , opt_params ? : H.service.ServiceParameters ) : H.util.ICancelable ;
    /**
     * To search for data layer entries that are within a given radius along a polyline.
     * See corridor polygon search details in the [API Reference](https://developer.here.com/documentation/fleet-telematics/api-reference.html).
     * for more details.
     * @param layerIds The IDs of the layers to search in.
     * @param corridor The center line of the corridor. Either defined as a {@link H.geo.LineString} or as a `RouteId` string that was obtained from a previous Router call. See {@link H.service.RoutingService#calculateRoute} or [Routing API CalculateRouteResponseType](https://developer.here.com/documentation/routing/dev_guide/topics/resource-type-calculate-route.html).
     * @param radius The radius of the corridor in meters.
     * @param onResult The callback to invoke when a chunk of data is received. The following arguments are passed: <ol> <li> The list of received entries of the data layer. </li> <li>An indicator whether it's the last chunk.</li> </ol>
     * @param onError The callback to invoke when an error occurred.
     * @param opt_params A key-value map of query parameters to use for the search. A query parameter has a higher priority than a value provided by an according method argument.
     */
    searchByCorridor (layerIds : string [] , corridor : H.geo.LineString | string , radius : number , onResult : (a : H.service.extension.customLocation.Table.Row [] , b : boolean ) => any , onError : (a : Error ) => any , opt_params ? : H.service.ServiceParameters ) : H.util.ICancelable ;
    /**
     * To search for data layer entries that are within a given radius around a specified geographical center.
     * See proximity search details in the [API Reference](https://developer.here.com/documentation/fleet-telematics/api-reference.html).
     * @param layerIds The IDs of the layers to search in.
     * @param center The geographical point to search around.
     * @param radius The search radius in meters.
     * @param onResult The callback to invoke when a chunk of data is received. The following arguments are passed: <ol> <li> The list of received entries of the data layer. </li> <li>An indicator whether it's the last chunk.</li> </ol>
     * @param onError The callback to invoke when an error occurred.
     * @param opt_params A key-value map of query parameters to use for the proximity search. A query parameter has a higher priority than a value provided by an according method argument.
     */
    searchByProximity (layerIds : string [] , center : H.geo.Point , radius : number , onResult : (a : H.service.extension.customLocation.Table.Row [] , b : boolean ) => any , onError : (a : Error ) => any , opt_params ? : H.service.ServiceParameters ) : H.util.ICancelable ;
    /**
     * To update rows of the data layers.
     * @param rows The data rows to update. All rows must have an defined `GEOMETRY_ID` cell.
     * @param onResult The callback to invoke when a chunk is processed. The following arguments are passed: <ul> <li> The list of processed rows. </li> <li>An indicator whether it's the last chunk.</li> </ul>
     * @param onError The callback to invoke when an error occurred. The following arguments are passed: <ul> <li> The occurred error. </li> <li> The list of rows of the chunk which caused the error. </li> <li>An indicator whether it's the last chunk.</li> </ul>
     */
    updateRows (rows : H.service.extension.customLocation.Table.Row [] , onResult : (a : H.service.extension.customLocation.Table.Row [] , b : boolean ) => any , onError : (a : Error , b : H.service.extension.customLocation.Table.Row [] , c : boolean ) => any ) : H.util.ICancelable ;
    /**
     * The property name to use when specifying options for this service
     * within the {@link H.service.Platform.Options#servicesConfig}.
     */
    static CONFIG_KEY : string ;
  }
}
declare namespace H.service.extension.customLocation.Service {
  /**
   * List of available entry points scoped to the custom layer creation, modification, fetching and search.
   */
  enum EntryPoint {
    LAYERS_DELETE = 'layers\/delete' ,
    LAYERS_GRANT = 'layers\/access\/grant' ,
    LAYERS_IMPORT = 'layers\/import' ,
    LAYERS_LIST = 'layers\/list' ,
    LAYERS_MODIFY = 'layers\/modify' ,
    LAYERS_UPLOAD = 'layers\/upload' ,
    SEARCH_ALL = 'search\/all' ,
    SEARCH_BBOX = 'search\/bbox' ,
    SEARCH_CORRIDOR = 'search\/corridor' ,
    SEARCH_PROXIMITY = 'search\/proximity' ,
    SEARCH_QUADKEY = 'search\/quadkey' ,
    SEARCH_TILE = 'tiled\/tile' ,
  }
  /**
   * The available response type formats of the [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/index.html).
   * Not all entry points support all types, see [API Reference](https://developer.here.com/documentation/fleet-telematics/api-reference.html)
   * for more details.
   */
  enum EntryPointType {
    JSON = 'json' ,
    TXT = 'txt' ,
  }
}
declare namespace H.service.extension.customLocation {
  /**
   * The storage type of a custom data layer.
   */
  /**
   * The storage type of a custom data layer.
   */
  enum Storage {
    READONLY = 'readonly' ,
    UPDATABLE = 'updatable' ,
  }
}
declare namespace H.service.extension.customLocation {
  /**
   * This class represents a data layer as a table.
   * It implements the {@link H.service.extension.dataView.ITable}
   * <*, {@link H.service.extension.customLocation.MetaInfo}> interface.
   *
   * Instances of this class must not be created directly via `new` operator. Instead a new instance can be
   * created via {@link H.service.extension.customLocation.Service#createLayer} method.
   */
  class Table implements H.service.extension.dataView.ITable < any , any > {
    /**
     * To add cells at the bottom of the table. Use this method to create rows for already existing bulk data.
     * @param cells The cell values of the row(s) in the order of the table's column names.
     */
    addCells (cells : ( string | H.geo.AbstractGeometry ) [] ) : number ;
    /**
     * To add a new row at the bottom of the table.
     * All cells of the row are initialized with a `null` value.
     */
    addRow ( ) : H.service.extension.customLocation.Table.Row ;
    concat ( ...var_args : H.service.extension.dataView.ITable < any , any > [] ) : H.service.extension.dataView.ITable < any , any > ;
    getCell (rowIndex : number , columnName : string ) : any | undefined ;
    getColumn (columnName : string ) : H.service.extension.dataView.IColumn < any > | undefined ;
    getColumnNames ( ) : string [] ;
    getMeta ( ) : any ;
    getRow (rowIndex : number ) : H.service.extension.dataView.IRow < any , any > | undefined ;
    getRowCount ( ) : number ;
    /**
     * Returns a collection of all existing rows of the table.
     */
    getRows ( ) : H.service.extension.customLocation.Table.Row [] ;
    /**
     * To set the value of the cell at the specified row and column.
     *
     * `GEOMETRY_ID` cell of an existing row should not be modified to not cause data inconsistency.
     * @param rowIndex The zero-based index of the cell's row.
     * @param columnName The name of the cell's column.
     * @param value The cell's value to set
     */
    setCell (rowIndex : number , columnName : string , value : any ) : void ;
  }
}
declare namespace H.service.extension.customLocation.Table {
  /**
   * This class represents values of a specific attribute within a data layer as a table column.
   * It implements the {@link H.service.extension.dataView.IColumn}.<*> interface.
   */
  class Column implements H.service.extension.dataView.IColumn < any > {
    /**
     * This class represents values of a specific attribute within a data layer as a table column.
     * It implements the {@link H.service.extension.dataView.IColumn}.<*> interface.
     * @param table The containing table of this column.
     * @param columnName The name of this column.
     */
    constructor (table : H.service.extension.customLocation.Table , columnName : string ) ;
    getCell (rowIndex : number ) : any | undefined ;
    /**
     * To set the value of the cell at the specified row.
     *
     * `GEOMETRY_ID` cell of an existing row should not be modified to not cause data inconsistency.
     * @param rowIndex The index of the cell's row
     * @param value The cell's value to set
     */
    setCell (rowIndex : number , value : any ) : void ;
  }
}
declare namespace H.service.extension.customLocation.Table {
  /**
   * This class represents a record within a data layer as a table row.
   * It implements the {@link H.service.extension.dataView.IRow}.<*> interface.
   */
  class Row implements H.service.extension.dataView.IRow < any , any > {
    /**
     * This class represents a record within a data layer as a table row.
     * It implements the {@link H.service.extension.dataView.IRow}.<*> interface.
     * @param table The containing table of this row.
     * @param rowIndex The index of this row.
     */
    constructor (table : H.service.extension.customLocation.Table , rowIndex : number ) ;
    getCell (columnName : string ) : any | undefined ;
    getColumnNames ( ) : string [] ;
    getTable ( ) : H.service.extension.dataView.ITable < any , any > ;
    /**
     * To set the value of the cell at the specified column.
     *
     * `GEOMETRY_ID` cell of an existing row should not be modified to not cause data inconsistency.
     * @param columnName The name of the cell's column
     * @param value The cell's value to set
     */
    setCell (columnName : string , value : any ) : void ;
  }
}
declare namespace H.service.extension.customLocation {
  /**
   * This class represents a provider for continuous fetching of data by tiles from a custom data layer of the
   * [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/index.html).
   *
   * Caused by asynchronous behavior of this provider there might be cases when an "error" event is fired,
   * for example when no data layer with the specified ID exists.
   *
   * Each map object provided by this class has data associated with it which is of type
   * {@link H.service.extension.dataView.IRow} and can be retrieved by calling
   * {@link H.map.Object#getData} method.
   */
  class TileProvider extends H.service.extension.TileProvider {
    /**
     * This class represents a provider for continuous fetching of data by tiles from a custom data layer of the
     * [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/index.html).
     *
     * Caused by asynchronous behavior of this provider there might be cases when an "error" event is fired,
     * for example when no data layer with the specified ID exists.
     *
     * Each map object provided by this class has data associated with it which is of type
     * {@link H.service.extension.dataView.IRow} and can be retrieved by calling
     * {@link H.map.Object#getData} method.
     * @param service An object representing the service
     * @param layerConfig The configuration options of the data layer
     * @param options Contains configuration options. By default 'min' option is `12`. If the data layer is stored on higher storage levels, decreasing minimum zoom level might slow down the browser due to the enormous amount of necessary requests to load all tiles of the data layer that intersects with the visible geographic area. For example if storage level is 10, in order to load an area covering North America on zoom level 4 more than 200.000 requests are required. More information about storage levels can be found in the [documentation](https://developer.here.com/documentation/fleet-telematics/dev_guide/topics/here-map-content.html#custom-map-tile-size).
     */
    constructor (service : H.service.extension.customLocation.Service , layerConfig : H.service.extension.customLocation.LayerConfig , options : H.service.extension.TileProvider.Options ) ;
    requestInternal (x : number , y : number , z : number , onSuccess : (a : null | HTMLImageElement | HTMLCanvasElement | ArrayBuffer | GlobalObject , b ? : any ) => any , onError : (a : Error ) => any , f ? : number ) : H.util.ICancelable ;
  }
}
declare namespace H.service.extension.customRoute {
  /**
   * This class provides a functionality for the route calculation using custom data powered by the
   * [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/index.html)
   *
   * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
   * Instead an instance of this Service can be retrieved by calling the factory method
   * {@link H.service.Platform#getCustomRoutingService} on a platform instance.
   */
  class Service extends H.service.Service {
    /**
     * This class provides a functionality for the route calculation using custom data powered by the
     * [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/index.html)
     *
     * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
     * Instead an instance of this Service can be retrieved by calling the factory method
     * {@link H.service.Platform#getCustomRoutingService} on a platform instance.
     * @param opt_options Configuration options for the service
     */
    constructor (opt_options ? : H.service.Options ) ;
    /**
     * This method sends a route calculation request to the
     * [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/index.html)
     * and calls the `onResult` callback function once the service response
     * becomes available (providing a {@link H.service.ServiceResult} object)
     * or the `onError` callback if a communication error occurred.
     *
     * Please refer to the
     * [API Documentation](https://developer.here.com/documentation/fleet-telematics/api-reference.html)
     * for information on available parameters and the response object structure.
     * @param params Contains the service parameters to be sent with the routing request.
     * @param onResult The callback which is called when result is returned
     * @param onError The callback which is called when error occurred (i.e request timeout, or server error)
     */
    calculateRoute (params : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * The property name to use when specifying options for this service
     * within the {@link H.service.Platform.Options#servicesConfig}.
     */
    static CONFIG_KEY : string ;
  }
}
declare namespace H.service.extension.dataView {
  /**
   * An interface to provide access to a table's column.
   * It uses the generic type `C` as the type for all cell values.
   */
  interface IColumn < C = any > {
    /**
     * To get the cell value at the given row index
     * @param rowIndex The zero-based index of the cell's row
     */
    getCell (rowIndex : number ) : C | undefined ;
  }
}
declare namespace H.service.extension.dataView {
  /**
   * An interface to provide access to a table's row.
   * It uses two generic types:
   * <ul>
   * <li><code>C</code>: The type for all cell values</li>
   * <li><code>M</code>: The type for the table's meta information</li>
   * </ul>
   */
  interface IRow < C = any , M = any > {
    /**
     * To get the cell value at the specified column
     * @param columnName The name of the column
     */
    getCell (columnName : string ) : C | undefined ;
    /**
     * To get a ordered list of all column names.
     */
    getColumnNames ( ) : string [] ;
    /**
     * To get the reference to the table this row belongs to
     */
    getTable ( ) : H.service.extension.dataView.ITable < any , any > ;
  }
}
declare namespace H.service.extension.dataView {
  /**
   * An interface to provide access to two-dimensional rectangular data structures such as
   * [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/index.html)
   * text formatted response data.
   * It uses two generic types:
   * <ul>
   * <li><code>C</code>: The type for all cell values</li>
   * <li><code>M</code>: The type for the meta information</li>
   * </ul>
   */
  interface ITable < C = any , M = any > {
    /**
     * To merge two ore more tables. It doesn't change the existing table, but instead returns a new one.
     * The concat method creates a new ITable consisting of the rows in the object on which it is called, followed in
     * order by, for each argument, the rows of that argument.
     * in the arguments list.
     * @param var_args Tables to concatenate into a new table.
     */
    concat ( ...var_args : H.service.extension.dataView.ITable < any , any > [] ) : H.service.extension.dataView.ITable < any , any > ;
    /**
     * To get the cell value at the given row index and named column
     * @param rowIndex The zero-based index of the cell's row.
     * @param columnName The name of the cell's column.
     */
    getCell (rowIndex : number , columnName : string ) : C | undefined ;
    /**
     * To get the column with the given name.
     * @param columnName The name of the column.
     */
    getColumn (columnName : string ) : H.service.extension.dataView.IColumn < C > | undefined ;
    /**
     * To get a ordered list of all column names.
     */
    getColumnNames ( ) : string [] ;
    /**
     * To get meta information of the table.
     */
    getMeta ( ) : M ;
    /**
     * To get the row at the given index.
     * @param rowIndex The zero-based index of the row.
     */
    getRow (rowIndex : number ) : H.service.extension.dataView.IRow < C , any > | undefined ;
    /**
     * To get the number of rows
     */
    getRowCount ( ) : number ;
  }
}
declare namespace H.service.extension.geofencing {
  /**
   * This class provides a functionality for the geofencing use case of the
   * [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/index.html)
   *
   * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
   * Instead an instance of this Service can be retrieved by calling the factory method
   * {@link H.service.Platform#getGeofencingService} on a platform instance.
   */
  class Service extends H.service.Service {
    /**
     * This class provides a functionality for the geofencing use case of the
     * [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/index.html)
     *
     * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
     * Instead an instance of this Service can be retrieved by calling the factory method
     * {@link H.service.Platform#getGeofencingService} on a platform instance.
     * @param opt_options Configuration options for the service
     */
    constructor (opt_options ? : H.service.Options ) ;
    /**
     * This method fetches resource with the provided name from the
     * [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/index.html)
     * @param entryPoint The entry point of the [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/index.html).
     * @param params A key-value map of query parameters to use for the request.
     * @param onResult The callback which is called when result is returned
     * @param onError The callback which is called when error occurred (i.e request timeout, or server error)
     */
    request (entryPoint : H.service.extension.geofencing.Service.EntryPoint , params : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * The property name to use when specifying options for this service
     * within the {@link H.service.Platform.Options#servicesConfig}.
     */
    static CONFIG_KEY : string ;
  }
}
declare namespace H.service.extension.geofencing.Service {
  /**
   * List of available entry points.
   * At the moment only proximity search entry point is available.
   */
  enum EntryPoint {
    SEARCH_PROXIMITY = 'search\/proximity' ,
  }
}
declare namespace H.service.extension.platformData {
  /**
   * The map data layer configuration options from the
   * [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/index.html).
   */
  type LayerConfig = { columns : string [] | null , layerId : string , level : number , rowFilter ? : H.service.extension.RowFilter , rowFilterContext ? : GlobalObject } ;
}
declare namespace H.service.extension.platformData {
  /**
   * This class encapsulates the
   * [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/topics/here-map-content.html)
   * in a service stub, providing methods to access its resources related to
   * HERE map data and customers' private map data.
   *
   * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
   * Instead an instance of this Service can be retrieved by calling the factory method
   * {@link H.service.Platform#getPlatformDataService} on a platform instance.
   */
  class Service extends H.service.Service {
    /**
     * This class encapsulates the
     * [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/topics/here-map-content.html)
     * in a service stub, providing methods to access its resources related to
     * HERE map data and customers' private map data.
     *
     * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
     * Instead an instance of this Service can be retrieved by calling the factory method
     * {@link H.service.Platform#getPlatformDataService} on a platform instance.
     * @param opt_options Configuration options of the service
     */
    constructor (opt_options ? : H.service.Options ) ;
    /**
     * This method creates a tile layer which can be added to the map in order to
     * continuously fetch and render data for the specified layer from the
     * [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/index.html).
     * @param layerConfig The configuration for the layer to load.
     * @param options The options to use when creating the tile provider.
     */
    createTileLayer (layerConfig : H.service.extension.platformData.LayerConfig , options : H.service.extension.TileProvider.Options ) : H.map.layer.TileLayer | H.map.layer.MarkerTileLayer ;
    /**
     * This method sends a request to a resource with the provided name and type from the
     * [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/index.html).
     * @param entryPoint The entry point of the API.
     * @param entryPointType The response type for the entry point.
     * @param params A key-value map of query parameters to use for the request.
     * @param onResult The callback which is called when result is returned.
     * @param onError The callback which is called when error occurred (i.e request timeout)
     */
    request (entryPoint : H.service.extension.platformData.Service.EntryPoint , entryPointType : H.service.extension.platformData.Service.EntryPointType , params : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * To search for data layer entries within a rectangular geographical area.
     * See bounding box search details in the [API Reference](https://developer.here.com/documentation/fleet-telematics/api-reference.html).
     * for more details.
     * @param layerIds The IDs of the layers to search in.
     * @param keyAttributes The list of the key columns, one for each layer, ordered according to the order of the layers in the `layerIds` argument. The key column is used to identify all entry fragments (stored on different tiles within the database) that belong to an identical entry.
     * @param boundingBox The geographical area where to search.
     * @param onResult The callback to invoke when a chunk of data is received. The following arguments are passed: <ol> <li> The list of received entries of the data layer. </li> <li>An indicator whether it's the last chunk.</li> </ol>
     * @param onError The callback to invoke when an error occurred.
     * @param opt_params A key-value map of query parameters to use for the search. A query parameter has a higher priority than a value provided by an according method argument.
     */
    searchByBoundingBox (layerIds : string [] , keyAttributes : string [] , boundingBox : H.geo.Rect , onResult : (a : H.service.extension.dataView.IRow < any , any > [] , b : boolean ) => any , onError : (a : Error ) => any , opt_params ? : H.service.ServiceParameters ) : H.util.ICancelable ;
    /**
     * To search for data layer entries that are within a given radius along a polyline.
     * See corridor polygon search details in the [API Reference](https://developer.here.com/documentation/fleet-telematics/api-reference.html).
     * for more details.
     * @param layerIds The IDs of the layers to search in.
     * @param keyAttributes The list of the key columns, one for each layer, ordered according to the order of the layers in the `layerIds` argument. The key column is used to identify all entry fragments (stored on different tiles within the database) that belong to an identical entry.
     * @param corridor The center line of the corridor. Either defined as a {@link H.geo.LineString} or as a `RouteId` string that was obtained from a previous Router call. See {@link H.service.RoutingService#calculateRoute} or [Routing API CalculateRouteResponseType](https://developer.here.com/documentation/routing/dev_guide/topics/resource-type-calculate-route.html).
     * @param radius The radius of the corridor in meters.
     * @param onResult The callback to invoke when a chunk of data is received. The following arguments are passed: <ol> <li> The list of received entries of the data layer. </li> <li>An indicator whether it's the last chunk.</li> </ol>
     * @param onError The callback to invoke when an error occurred.
     * @param opt_params A key-value map of query parameters to use for the search. A query parameter has a higher priority than a value provided by an according method argument.
     */
    searchByCorridor (layerIds : string [] , keyAttributes : string [] , corridor : H.geo.LineString | string , radius : number , onResult : (a : H.service.extension.dataView.IRow < any , any > [] , b : boolean ) => any , onError : (a : Error ) => any , opt_params ? : H.service.ServiceParameters ) : H.util.ICancelable ;
    /**
     * To search for data layer entries that are within a given radius around a specified geographical center.
     * See proximity search details in the [API Reference](https://developer.here.com/documentation/fleet-telematics/api-reference.html).
     * @param layerIds The IDs of the layers to search in.
     * @param keyAttributes The list of the key columns, one for each layer, ordered according to the order of the layers in the `layerIds` argument. The key column is used to identify all entry fragments (stored on different tiles within the database) that belong to an identical entry.
     * @param center The geographical point to search around.
     * @param radius The search radius in meters.
     * @param onResult The callback to invoke when a chunk of data is received. The following arguments are passed: <ol> <li> The list of received entries of the data layer. </li> <li>An indicator whether it's the last chunk.</li> </ol>
     * @param onError The callback to invoke when an error occurred.
     * @param opt_params A key-value map of query parameters to use for the search. A query parameter has a higher priority than a value provided by an according method argument.
     */
    searchByProximity (layerIds : string [] , keyAttributes : string [] , center : H.geo.Point , radius : number , onResult : (a : H.service.extension.dataView.IRow < any , any > [] , b : boolean ) => any , onError : (a : Error ) => any , opt_params ? : H.service.ServiceParameters ) : H.util.ICancelable ;
    /**
     * The property name to use when specifying options for this service
     * within the {@link H.service.Platform.Options#servicesConfig}.
     */
    static CONFIG_KEY : string ;
  }
}
declare namespace H.service.extension.platformData.Service {
  /**
   * List of available entry points.
   */
  enum EntryPoint {
    DOC_ATTRIBUTES = 'doc\/attributes' ,
    DOC_INDEXES = 'doc\/indexes' ,
    DOC_LAYER = 'doc\/layer' ,
    DOC_LAYERS = 'doc\/layers' ,
    DOC_MAPS = 'doc\/maps' ,
    FILE = 'file' ,
    INDEX = 'index' ,
    SEARCH_BBOX = 'search\/bbox' ,
    SEARCH_CORRIDOR = 'search\/corridor' ,
    SEARCH_PROXIMITY = 'search\/proximity' ,
    SEARCH_QUADKEY = 'search\/quadkey' ,
    SERVICE_CONFIGURATION = 'serviceconfiguration' ,
    STATIC = 'static' ,
    TILE = 'tile' ,
    TILES = 'tiles' ,
  }
  /**
   * List of available entry point response types.
   * Not all entry points support all types, see [API Reference](https://developer.here.com/documentation/fleet-telematics/api-reference.html)
   * for more details.
   */
  enum EntryPointType {
    BIN = 'bin' ,
    HTML = 'html' ,
    JSON = 'json' ,
    TXT = 'txt' ,
  }
}
declare namespace H.service.extension.platformData {
  /**
   * An object to provide read access to the rows, columns and cells of a HERE Fleet Telematics API data layer.
   * The type definition implements {@link H.service.extension.dataView.ITable} interface
   */
  type Table = H.service.extension.dataView.ITable < string | ( Uint16Array | GlobalFloat32Array ) [] | null , H.service.ServiceParameters | undefined > | null ;
}
declare namespace H.service.extension.platformData {
  /**
   * This class represents a provider for continuous fetching and rendering of data by tiles from a data layer of the
   * [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/index.html).
   *
   * Caused by asynchronous behavior of this provider there might be cases when an "error" event is fired, for example
   * when the execution of the {@link H.service.extension.platformData.LayerConfig#rowFilterContext} fails.
   *
   * Each map object provided by this class has data associated with it which is of type
   * {@link H.service.extension.dataView.IRow} and can be retrieved by calling
   * {@link H.map.Object#getData} method.
   */
  class TileProvider extends H.service.extension.TileProvider {
    /**
     * This class represents a provider for continuous fetching and rendering of data by tiles from a data layer of the
     * [HERE Fleet Telematics API](https://developer.here.com/documentation/fleet-telematics/dev_guide/index.html).
     *
     * Caused by asynchronous behavior of this provider there might be cases when an "error" event is fired, for example
     * when the execution of the {@link H.service.extension.platformData.LayerConfig#rowFilterContext} fails.
     *
     * Each map object provided by this class has data associated with it which is of type
     * {@link H.service.extension.dataView.IRow} and can be retrieved by calling
     * {@link H.map.Object#getData} method.
     * @param service An object representing the service
     * @param layerConfig The configuration of the data layer to load
     * @param options The options for the tile provider. By default the value of the 'min' property is `12`.
     */
    constructor (service : H.service.extension.platformData.Service , layerConfig : H.service.extension.platformData.LayerConfig , options : H.service.extension.TileProvider.Options ) ;
    requestInternal (x : number , y : number , z : number , onSuccess : (a : null | HTMLImageElement | HTMLCanvasElement | ArrayBuffer | GlobalObject , b ? : any ) => any , onError : (a : Error ) => any , f ? : number ) : H.util.ICancelable ;
  }
}
declare namespace H.service.extension.platformData.TileProvider {
  //!! ResultType aliases enum H.service.extension.TileProvider.ResultType
  export import ResultType = H.service.extension.TileProvider.ResultType ;
}
declare namespace H.service.iml {
  /**
   * This class represents a provider for fetching data
   * from [HERE Interactive Map Layer Data API](https://developer.here.com/documentation/data-api/data_dev_guide/rest/getting-data-interactive.html).
   * The provider could be used only with the `H.Map.EngineType.WEBGL` rendering engine.
   */
  class Provider extends H.map.provider.RemoteTileProvider {
    /**
     * This class represents a provider for fetching data
     * from [HERE Interactive Map Layer Data API](https://developer.here.com/documentation/data-api/data_dev_guide/rest/getting-data-interactive.html).
     * The provider could be used only with the `H.Map.EngineType.WEBGL` rendering engine.
     * @param service The IML Data service instance.
     * @param catalogHrn A HERE Resource Name (HRN) for the catalog.
     * @param layerId An identifier for the layer in the catalog.
     * @param opt_options The configuration options for the provider.
     */
    constructor (service : H.service.iml.Service , catalogHrn : string , layerId : string , opt_options ? : H.service.iml.Provider.Options ) ;
    /**
     * To obtain the style used for rendering the provider data.
     */
    getStyle ( ) : H.map.render.Style < any > ;
    requestInternal (x : number , y : number , z : number , onResponse : (a : null | HTMLImageElement | HTMLCanvasElement | ArrayBuffer | GlobalObject , b ? : any ) => any , onError : (a : Error ) => any , f ? : number ) : H.util.ICancelable ;
    /**
     * Sets the style to be used for rendering the provider data.
     * The style MUST reference a `{catalogHrn}:{layerId}` as a layer in order to match data correctly, e.g.:
     */
    setStyle (style : H.map.render.Style < any > ) : void ;
  }
}
declare namespace H.service.iml.Provider {
  type Options = { engineType ? : H.Map.EngineType , max ? : number , min ? : number , parameters ? : GlobalObject } ;
}
declare namespace H.service.iml {
  /**
   * This class encapsulates the [HERE Interactive Map Layer Data API](https://developer.here.com/documentation/data-api/data_dev_guide/rest/getting-data-interactive.html)
   * in a service stub, providing methods to access its resources.
   *
   * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
   * Instead an instance of this Service can be retrieved by calling the factory method
   * {@link H.service.Platform#getIMLService} on a platform instance.
   */
  class Service extends H.service.Service {
    /**
     * This class encapsulates the [HERE Interactive Map Layer Data API](https://developer.here.com/documentation/data-api/data_dev_guide/rest/getting-data-interactive.html)
     * in a service stub, providing methods to access its resources.
     *
     * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
     * Instead an instance of this Service can be retrieved by calling the factory method
     * {@link H.service.Platform#getIMLService} on a platform instance.
     * @param options Configuration options for the service.
     */
    constructor (options : H.service.iml.Service.Options ) ;
    /**
     * To delete an individual feature from the layer.
     * Creates a `DELETE` request that returns an empty response with `204` (No Content) status code in case of success.
     * @param featureId A feature identifier.
     * @param catalogHrn A HERE Resource Name (HRN) for the catalog.
     * @param layerId An identifier for the layer in the catalog.
     * @param onResult A callback function to be called with an empty response.
     * @param onError A callback function to be called in case of failed request.
     */
    deleteFeature (featureId : string , catalogHrn : string , layerId : string , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * To delete features from the layer.
     * @param featureIds An array of feature identifiers.
     * @param catalogHrn A HERE Resource Name (HRN) for the catalog.
     * @param layerId An identifier for the layer in the catalog.
     * @param onResult A callback function to be called with a FeatureCollection object.
     * @param onError A callback function to be called in case of failed request.
     */
    deleteFeatures (featureIds : string [] , catalogHrn : string , layerId : string , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * To retrieve an individual feature in the layer, by feature ID.
     * @param featureId A feature identifier.
     * @param catalogHrn A HERE Resource Name (HRN) for the catalog.
     * @param layerId An identifier for the layer in the catalog.
     * @param onResult A callback function to be called with an object containing individual feature.
     * @param onError A callback function to be called in case of failed request.
     * @param opt_params Optional service parameters to be added to the request.
     */
    getFeatureById (featureId : string , catalogHrn : string , layerId : string , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any , opt_params ? : H.service.ServiceParameters ) : H.util.ICancelable ;
    /**
     * To retrieve a list of features in the layer, by bounding box.
     * @param params An object with either `bbox` or a full set of `north`+`east`+`south`+`west` values specifying a bounding box, together with other (optional) service parameters.
     * @param catalogHrn A HERE Resource Name (HRN) for the catalog.
     * @param layerId An identifier for the layer in the catalog.
     * @param onResult A callback function to be called with a FeatureCollection object.
     * @param onError A callback function to be called in case of failed request.
     */
    getFeaturesByBoundingBox (params : H.service.ServiceParameters , catalogHrn : string , layerId : string , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * To retrieve a list of features in the layer, by geometry and radius.
     * Creates a `POST` request with a given GeoJSON geometry as its body.
     * @param params An object with `radius` and other (optional) service parameters.
     * @param geojsonObject A GeoJSON [Geometry object](https://tools.ietf.org/html/rfc7946#section-3.1) (e.g. `Point`, `Polygon`, ...) to calculate an origin point.
     * @param catalogHrn A HERE Resource Name (HRN) for the catalog.
     * @param layerId An identifier for the layer in the catalog.
     * @param onResult A callback function to be called with a FeatureCollection object.
     * @param onError A callback function to be called in case of failed request.
     */
    getFeaturesByGeometryAndRadius (params : H.service.ServiceParameters , geojsonObject : GlobalObject , catalogHrn : string , layerId : string , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * To retrieve a list of features in the layer, by their IDs.
     * @param featureIds An array of feature identifiers.
     * @param catalogHrn A HERE Resource Name (HRN) for the catalog.
     * @param layerId An identifier for the layer in the catalog.
     * @param onResult A callback function to be called with a FeatureCollection object.
     * @param onError A callback function to be called in case of failed request.
     * @param opt_params Optional service parameters to be added to the request.
     */
    getFeaturesById (featureIds : string [] , catalogHrn : string , layerId : string , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any , opt_params ? : H.service.ServiceParameters ) : H.util.ICancelable ;
    /**
     * To retrieve a list of features in the layer, by center point and radius.
     * A center point could be either specified directly or by referencing a feature (which could be from another layer).
     * @param params An object with `radius` and either `lat`+`lng` or `refCatalogHrn`+`refLayerId`+`refFeatureId` combination, together with other (optional) service parameters.
     * @param catalogHrn A HERE Resource Name (HRN) for the catalog.
     * @param layerId An identifier for the layer in the catalog.
     * @param onResult A callback function to be called with a FeatureCollection object.
     * @param onError A callback function to be called in case of failed request.
     */
    getFeaturesByPointAndRadius (params : H.service.ServiceParameters , catalogHrn : string , layerId : string , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * To request layer data by tile coordinates.
     * @param x Tile column number.
     * @param y Tile row number.
     * @param z Zoom level.
     * @param catalogHrn A HERE Resource Name (HRN) for the catalog.
     * @param layerId An identifier for the layer in the catalog.
     * @param onResult A callback function to be called with either MVT or GeoJSON tile data, depending on the `opt_geojsonFormat` argument (MVT by default).
     * @param onError A callback function to be called in case of failed request.
     * @param opt_params Optional service parameters to be added to the request. The `clip` parameter is set to `true` by default.
     * @param opt_geojsonFormat Defines whether to request features in GeoJSON (`true`) or MVT (`false`) format. Default value is `false`.
     */
    getFeaturesByTile (x : number , y : number , z : number , catalogHrn : string , layerId : string , onResult : (a : ArrayBuffer | GlobalObject ) => any , onError : (a : Error ) => any , opt_params ? : H.service.ServiceParameters , opt_geojsonFormat ? : boolean ) : H.util.ICancelable ;
    /**
     * To retrieve a statistical information about the layer.
     * @param catalogHrn A HERE Resource Name (HRN) for the catalog.
     * @param layerId An identifier for the layer in the catalog.
     * @param onResult A callback function to be called with an object containing statistical information about the layer.
     * @param onError A callback function to be called in case of failed request.
     * @param opt_params Optional service parameters to be added to the request.
     */
    getStatistics (catalogHrn : string , layerId : string , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any , opt_params ? : H.service.ServiceParameters ) : H.util.ICancelable ;
    /**
     * To retrieve all features in the layer, in a paginated manner.
     * @param catalogHrn A HERE Resource Name (HRN) for the catalog.
     * @param layerId An identifier for the layer in the catalog.
     * @param onResult A callback function to be called with a FeatureCollection object.
     * @param onError A callback function to be called in case of failed request.
     * @param opt_params Optional service parameters to be added to the request.
     */
    iterateFeatures (catalogHrn : string , layerId : string , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any , opt_params ? : H.service.ServiceParameters ) : H.util.ICancelable ;
    /**
     * To update specific fields of an individual feature in the layer, preserving untouched fields.
     * Creates a `PATCH` request with a given GeoJSON payload as its body.
     * @param featureId A feature identifier.
     * @param geojsonObject A GeoJSON `Feature` object to patch.
     * @param catalogHrn A HERE Resource Name (HRN) for the catalog.
     * @param layerId An identifier for the layer in the catalog.
     * @param onResult A callback function to be called with a FeatureCollection object.
     * @param onError A callback function to be called in case of failed request.
     * @param opt_params Optional service parameters to be added to the request.
     */
    patchFeature (featureId : string , geojsonObject : GlobalObject , catalogHrn : string , layerId : string , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any , opt_params ? : H.service.ServiceParameters ) : H.util.ICancelable ;
    /**
     * To create or update features in the layer.
     * Creates a `POST` request with a given GeoJSON payload as its body.
     * Keeps previously existing features in the layer.
     * @param geojsonObject A GeoJSON object containing features to store.
     * @param catalogHrn A HERE Resource Name (HRN) for the catalog.
     * @param layerId An identifier for the layer in the catalog.
     * @param onResult A callback function to be called with a FeatureCollection object.
     * @param onError A callback function to be called in case of failed request.
     * @param opt_params Optional service parameters to be added to the request.
     */
    postFeatures (geojsonObject : GlobalObject , catalogHrn : string , layerId : string , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any , opt_params ? : H.service.ServiceParameters ) : H.util.ICancelable ;
    /**
     * To create or replace an individual feature in the layers.
     * Creates a `PUT` request with a given GeoJSON payload as its body.
     * @param featureId A feature identifier.
     * @param geojsonObject A GeoJSON `Feature` object to store.
     * @param catalogHrn A HERE Resource Name (HRN) for the catalog.
     * @param layerId An identifier for the layer in the catalog.
     * @param onResult A callback function to be called with a FeatureCollection object.
     * @param onError A callback function to be called in case of failed request.
     * @param opt_params Optional service parameters to be added to the request.
     */
    putFeature (featureId : string , geojsonObject : GlobalObject , catalogHrn : string , layerId : string , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any , opt_params ? : H.service.ServiceParameters ) : H.util.ICancelable ;
    /**
     * To create or replace features in the layer.
     * Creates a `PUT` request with a given GeoJSON payload as its body.
     * Deletes all previously existing features in the layer.
     * @param geojsonObject A GeoJSON object containing features to store.
     * @param catalogHrn A HERE Resource Name (HRN) for the catalog.
     * @param layerId An identifier for the layer in the catalog.
     * @param onResult A callback function to be called with a FeatureCollection object.
     * @param onError A callback function to be called in case of failed request.
     * @param opt_params Optional service parameters to be added to the request.
     */
    putFeatures (geojsonObject : GlobalObject , catalogHrn : string , layerId : string , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any , opt_params ? : H.service.ServiceParameters ) : H.util.ICancelable ;
    /**
     * To search for features in the layer.
     * @param catalogHrn A HERE Resource Name (HRN) for the catalog.
     * @param layerId An identifier for the layer in the catalog.
     * @param onResult A callback function to be called with a FeatureCollection object.
     * @param onError A callback function to be called in case of failed request.
     * @param opt_params Optional service parameters to be added to the request.
     */
    searchFeatures (catalogHrn : string , layerId : string , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any , opt_params ? : H.service.ServiceParameters ) : H.util.ICancelable ;
    /**
     * The property name to use when specifying options for this service
     * within the {@link H.service.Platform.Options#servicesConfig}.
     */
    static CONFIG_KEY : string ;
  }
}
declare namespace H.service.iml.Service {
  type Options = { baseUrl ? : H.service.Url , getToken ? : ( ) => string , headers ? : GlobalObject , path ? : string , subDomain ? : string } ;
}
declare namespace H.service.metaInfo {
  /**
   * This class encapsulates a
   * [Metainfo Tile](https://developer.here.com/documentation/map-tile/dev_guide/topics/tile-metainfo.html)
   * end point of the HERE Map Tile API.
   *
   * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
   * Instead an instance of this Service can be retrieved by calling the factory method
   * {@link H.service.Platform#getMetaInfoService} on a platform instance.
   */
  class Service extends H.service.Service {
    /**
     * This class encapsulates a
     * [Metainfo Tile](https://developer.here.com/documentation/map-tile/dev_guide/topics/tile-metainfo.html)
     * end point of the HERE Map Tile API.
     *
     * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
     * Instead an instance of this Service can be retrieved by calling the factory method
     * {@link H.service.Platform#getMetaInfoService} on a platform instance.
     * @param opt_options The configuration options for the service
     */
    constructor (opt_options ? : H.service.metaInfo.Service.Options ) ;
    /**
     * This method creates a tile layer. This layer can be used as a layer on a map's data model.
     * @param tileSize The tile size
     * @param pixelRatio The tile's pixel ratio, should be aligned with base map tile
     * @param opt_categoryFilter A list of meta-info category names which should be suppressed. See [Metainfo Tile](https://developer.here.com/documentation/map-tile/dev_guide/topics/tile-metainfo.html) for valid category names.
     * @param opt_additionalParameters Additional parameters for the meta info service
     * @param opt_tileType The tile type (default is `"maptile"`)
     * @param opt_scheme The scheme for which the meta info tiles a requested (default is `"normal.day"`)
     */
    createTileLayer (tileSize : number , pixelRatio : number , opt_categoryFilter ? : string [] , opt_additionalParameters ? : H.service.ServiceParameters , opt_tileType ? : string , opt_scheme ? : string ) : H.map.layer.TileLayer ;
    /**
     * This method creates a tile provider which uses the meta info tile backend.
     * This provider can be used as a data source for an TileLayer.
     * @param tileSize The tile size
     * @param pixelRatio The pixel ratio to use for over-sampling in cases of high-resolution displays
     * @param opt_categoryFilter A list of meta-info category names which should be suppressed. See [Metainfo Tile](https://developer.here.com/documentation/map-tile/dev_guide/topics/tile-metainfo.html) for valid category names.
     * @param opt_additionalParameters Additional parameters for the meta info service
     * @param opt_tileType The tile type (default is `"maptile"`)
     * @param opt_scheme The scheme for which the meta info tiles a requested (default is `"normal.day"`)
     */
    createTileProvider (tileSize : number , pixelRatio : number , opt_categoryFilter ? : string [] , opt_additionalParameters ? : H.service.ServiceParameters , opt_tileType ? : string , opt_scheme ? : string ) : H.map.provider.TileProvider ;
    /**
     * This method returns the meta info tile service's meta information.
     * The method will return an object once the map tile service's data has been fetched.
     */
    getInfo ( ) : H.service.metaInfo.Service.Info | undefined ;
    /**
     * This method returns the meta info tile service's newest version hash.
     */
    getVersion ( ) : string ;
    /**
     * The property name to use when specifying options for this service
     * within the {@link H.service.Platform.Options#servicesConfig}.
     */
    static CONFIG_KEY : string ;
  }
}
declare namespace H.service.metaInfo.Service {
  type Info = { formats : { [ key: string ]: GlobalObject } , languages : { [ key: string ]: GlobalObject } , maps : { [ key: string ]: GlobalObject } , resolutions : { [ key: string ]: GlobalObject } , schemes : { [ key: string ]: GlobalObject } , tiletypes : { [ key: string ]: GlobalObject } } ;
  type Options = { baseUrl ? : H.service.Url , headers ? : GlobalObject , path ? : string , subDomain ? : string , type ? : string , version ? : string } ;
}
declare namespace H.service.metaInfo {
  /**
   * This class utilizes
   * [Metainfo Tiles](https://developer.here.com/documentation/map-tile/dev_guide/topics/tile-metainfo.html)
   * functionality provided by the
   * [Map Tile API](https://developer.here.com/documentation/map-tile)
   * to load meta information about map objects (buildings, labels, public transport etc.).
   */
  class TileProvider extends H.map.provider.RemoteTileProvider {
    /**
     * This class utilizes
     * [Metainfo Tiles](https://developer.here.com/documentation/map-tile/dev_guide/topics/tile-metainfo.html)
     * functionality provided by the
     * [Map Tile API](https://developer.here.com/documentation/map-tile)
     * to load meta information about map objects (buildings, labels, public transport etc.).
     * @param service the tile service which holds information from about the source of the tiles
     * @param opt_params an additional set of URL parameters
     * @param opt_options additional parameters
     */
    constructor (service : H.service.metaInfo.Service | H.service.MapTileService , opt_params ? : H.service.ServiceParameters , opt_options ? : H.service.metaInfo.TileProvider.Options ) ;
    createTileInternal (x : number , y : number , z : number , data : HTMLImageElement | HTMLCanvasElement | GlobalObject , opt_options ? : H.service.ServiceParameters ) : H.map.provider.Tile ;
    /**
     * Disposes of this map tile provider instance.
     */
    dispose : ( ) => void ;
    requestInternal (x : number , y : number , z : number , onSuccess : (a : null | HTMLImageElement | HTMLCanvasElement | ArrayBuffer | GlobalObject , b ? : any ) => any , onError : (a : Error ) => any , f ? : number ) : H.util.ICancelable ;
  }
}
declare namespace H.service.metaInfo.TileProvider {
  type Options = { categoryFilter ? : string [] , pixelRatio ? : number , scheme ? : string , tileCacheSize ? : number , tileSize ? : number , tileType ? : string } ;
}
declare namespace H.service.omv {
  /**
   * This class represents a provider for continuous fetching of HERE Optimized Map Visualization (OMV) tiles.
   *
   * Note that as this provider provides vector data, it can be used only with a vector rendering engine
   * (see {@link H.Map.Options#engineType}).
   *
   * Use one of the raster layers (e.g. `raster.normal.map`) created by
   * {@link H.service.Platform#createDefaultLayers} when using the `P2D` engine.
   */
  class Provider extends H.map.provider.RemoteTileProvider {
    /**
     * This class represents a provider for continuous fetching of HERE Optimized Map Visualization (OMV) tiles.
     *
     * Note that as this provider provides vector data, it can be used only with a vector rendering engine
     * (see {@link H.Map.Options#engineType}).
     *
     * Use one of the raster layers (e.g. `raster.normal.map`) created by
     * {@link H.service.Platform#createDefaultLayers} when using the `P2D` engine.
     * @param service An object representing the OMV service.
     * @param style The style to use for rendering data provided by the provider.
     * @param opt_options The options to instantiate the provider
     */
    constructor (service : H.service.omv.Service , style : H.map.render.Style < any > , opt_options ? : H.service.omv.Provider.Options ) ;
    getCache ( ) : H.util.ICache ;
    getCopyrights (boundingBox : H.geo.Rect , level : number ) : H.map.ICopyright [] | null ;
    /**
     * Returns geopolitical view of the map data.
     * This method is applicable only if `engineType` of the provider is set to `H.Map.EngineType.HARP`.
     */
    getPoliticalView ( ) : string | undefined ;
    /**
     * To obtain the style used for rendering the provider data.
     */
    getStyle ( ) : H.map.render.Style < any > ;
    getStyleInternal ( ) : H.map.render.Style < any > ;
    getTileKey (x : number , y : number , z : number ) : string ;
    requestInternal (x : number , y : number , z : number , onResponse : (a : null | HTMLImageElement | HTMLCanvasElement | ArrayBuffer | GlobalObject , b ? : any ) => any , onError : (a : Error ) => any , opt_priority ? : number ) : H.util.ICancelable ;
    /**
     * Sets geopolitical view of the map data.
     * This method is applicable only if `engineType` of the provider is set to `H.Map.EngineType.HARP`.
     * @param politicalView The geopolitical view in ISO 3166-1 alpha-2 standard.
     */
    setPoliticalView (politicalView : string ) : void ;
    /**
     * Sets the style to be used for rendering the provider data.
     */
    setStyle (style : H.map.render.Style < any > ) : void ;
  }
}
declare namespace H.service.omv.Provider {
  type Options = { engineType ? : H.Map.EngineType , getCopyrights ? : (a : H.geo.Rect , b : number ) => any , lg ? : string , lg2 ? : string , max ? : number , min ? : number , pois ? : boolean , politicalView ? : string , tileSize ? : number , uri ? : string } ;
}
declare namespace H.service.omv {
  /**
   * This class encapsulates HERE's Optimized Map Visualization (OMV) endpoint.
   *
   * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
   * Instead an instance of this Service can be retrieved by calling the factory method
   * {@link H.service.Platform#getOMVService} on a platform instance.
   */
  class Service extends H.service.Service {
    /**
     * This class encapsulates HERE's Optimized Map Visualization (OMV) endpoint.
     *
     * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
     * Instead an instance of this Service can be retrieved by calling the factory method
     * {@link H.service.Platform#getOMVService} on a platform instance.
     * @param opt_options Configuration options for OMV service
     */
    constructor (opt_options ? : H.service.omv.Service.Options ) ;
    /**
     * To create an OMV map layer according to the passed configuration.
     * @param style The style to use for rendering data provided by the provider.
     * @param opt_providerOptions The options to instantiate the provider.
     * @param opt_layerOptions The options to instantiate the layer.
     */
    createLayer (style : H.map.render.Style < any > , opt_providerOptions ? : H.service.omv.Provider.Options , opt_layerOptions ? : H.map.layer.ITileLayer.Options ) : H.map.layer.TileLayer ;
    /**
     * Returns the specified map version {@link H.service.omv.Service.Options#mapVersion} or the
     * version corresponding to the latest map data. Map version information is fetched automatically
     * during construction time of this service unless specific fixed `mapVersion` is specified.
     */
    getMapVersion ( ) : string | undefined ;
    /**
     * To fetch lists of available [political views](https://developer.here.com/documentation/vector-tiles-api/dev_guide/topics/geopolitical-views.html) per OMV layer.
     * The resulting values (country codes) can be used to render the map with [boundaries](https://developer.here.com/documentation/vector-tiles-api/dev_guide/topics/layers.html#boundaries)
     * based on international or local country views.
     * @param onResult A callback function to be called once the API provides a response to the request
     * @param onError A callback function to be called if an error occurs during the request
     */
    getPoliticalViews (onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * The property name to use when specifying options for this service
     * within the {@link H.service.Platform.Options#servicesConfig}.
     */
    static CONFIG_KEY : string ;
  }
}
declare namespace H.service.omv.Service {
  type Options = { baseUrl ? : H.service.Url , headers ? : GlobalObject , mapVersion ? : string , path ? : string , queryParams ? : H.service.ServiceParameters , subDomain ? : string } ;
}
declare namespace H.service.publicTransit {
  /**
   * This class encapsulates the [HERE Public Transit API](https://developer.here.com/documentation/public-transit/dev_guide/index.html)
   * in a service stub, providing methods to access its resources.
   *
   * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
   * Instead an instance of this Service can be retrieved by calling the factory method
   * {@link H.service.Platform#getPublicTransitService} on a platform instance.
   */
  class Service extends H.service.Service {
    /**
     * This class encapsulates the [HERE Public Transit API](https://developer.here.com/documentation/public-transit/dev_guide/index.html)
     * in a service stub, providing methods to access its resources.
     *
     * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
     * Instead an instance of this Service can be retrieved by calling the factory method
     * {@link H.service.Platform#getPublicTransitService} on a platform instance.
     * @param options Configuration options for Public Transit service.
     */
    constructor (options : H.service.Options ) ;
    /**
     * This method sends a request to the [Public Transit API](https://developer.here.com/documentation/public-transit/dev_guide/index.html)
     * to get subsequent departures from a given station and calls the `onResult` callback function once the
     * service response becomes available (providing a {@link H.service.ServiceResult} object)
     * or the `onError` callback if a communication error occurred.
     *
     * Please refer to the
     * [Public Transit Next Departures API](https://developer.here.com/documentation/public-transit/dev_guide/next-departures/index.html) documentation
     * for information about the supported request parameters and the response details.
     * @param params The service parameters to be sent with the request.
     * @param onResult A callback function to be called once the API provides a response to the request.
     * @param onError A callback function to be called if a communication error occurs during the request.
     */
    getDepartures (params : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * This method sends a request to the [Public Transit API](https://developer.here.com/documentation/public-transit/dev_guide/index.html)
     * to calculate a transit route and calls the `onResult` callback function once the service response
     * becomes available (providing a {@link H.service.ServiceResult} object)
     * or the `onError` callback if a communication error occurred.
     *
     * Please refer to the
     * [Public Transit Routing API](https://developer.here.com/documentation/public-transit/dev_guide/routing/index.html) documentation
     * for information about the supported request parameters and the response details.
     * @param params The service parameters to be sent with the request.
     * @param onResult A callback function to be called once the API provides a response to the request.
     * @param onError A callback function to be called if a communication error occurs during the request.
     */
    getRoutes (params : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * This method sends a request to the [Public Transit API](https://developer.here.com/documentation/public-transit/dev_guide/index.html)
     * to get transit stations within a given area and calls the `onResult` callback function once the
     * service response becomes available (providing a {@link H.service.ServiceResult} object)
     * or the `onError` callback if a communication error occurred.
     *
     * Please refer to the
     * [Public Transit Station Search API](https://developer.here.com/documentation/public-transit/dev_guide/station-search/index.html) documentation
     * for information about the supported request parameters and the response details.
     * @param params The service parameters to be sent with the request.
     * @param onResult A callback function to be called once the API provides a response to the request.
     * @param onError A callback function to be called if a communication error occurs during the request.
     */
    getStations (params : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * The property name to use when specifying options for this service
     * within the {@link H.service.Platform.Options#servicesConfig}.
     */
    static CONFIG_KEY : string ;
  }
}
declare namespace H.service.rasterTile {
  /**
   * This class represents a map tile provider which requests map tiles from the
   * HERE Raster Tile v3 service.
   */
  class Provider extends H.map.provider.ImageTileProvider {
    /**
     * This class represents a map tile provider which requests map tiles from the
     * HERE Raster Tile v3 service.
     * @param service An object representing the Raster Tile Service.
     * @param opt_options The options to instantiate the provider.
     */
    constructor (service : H.service.rasterTile.Service , opt_options ? : H.service.rasterTile.Provider.Options ) ;
    getCopyrights (boundingBox : H.geo.Rect , level : number ) : H.map.ICopyright [] | null ;
  }
}
declare namespace H.service.rasterTile.Provider {
  type Options = { engineType ? : H.Map.EngineType , max ? : number , min ? : number , style ? : H.map.render.Style < any > , tileSize ? : number , uri ? : string } ;
}
declare namespace H.service.rasterTile {
  /**
   * This class encapsulates a map tile end point of the
   * [HERE Raster Tile API v3](https://developer.here.com/documentation/raster-tile-api/dev_guide/index.html).
   *
   *
   * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
   * Instead an instance of this Service can be retrieved by calling the factory method
   * {@link H.service.Platform#getRasterTileService} on a platform instance.
   */
  class Service extends H.service.Service {
    /**
     * This class encapsulates a map tile end point of the
     * [HERE Raster Tile API v3](https://developer.here.com/documentation/raster-tile-api/dev_guide/index.html).
     *
     *
     * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
     * Instead an instance of this Service can be retrieved by calling the factory method
     * {@link H.service.Platform#getRasterTileService} on a platform instance.
     * @param opt_options Configuration options for Raster Tile Service
     */
    constructor (opt_options ? : H.service.rasterTile.Service.Options ) ;
    /**
     * To get the list of available features per style.
     * @param onResult A callback function to be called once the API provides a response to the request.
     * @param onError A callback function to be called if a communication error occurs during the request.
     */
    getFeatures (onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * To get information about accepted values of some API parameters.
     * @param onResult A callback function to be called once the API provides a response to the request.
     * @param onError A callback function to be called if a communication error occurs during the request.
     */
    getInfo (onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * To get the list of available map languages per resource.
     * @param onResult A callback function to be called once the API provides a response to the request.
     * @param onError A callback function to be called if a communication error occurs during the request.
     */
    getLanguages (onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * To get the list of available geopolitical views.
     * @param onResult A callback function to be called once the API provides a response to the request.
     * @param onError A callback function to be called if a communication error occurs during the request.
     */
    getPoliticalViews (onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * The property name to use when specifying options for this service
     * within the {@link H.service.Platform.Options#servicesConfig}.
     */
    static CONFIG_KEY : string ;
  }
}
declare namespace H.service.rasterTile.Service {
  type Options = { baseUrl ? : H.service.Url , format ? : string , headers ? : GlobalObject , path ? : string , projection ? : string , queryParams ? : H.service.ServiceParameters , resource ? : string , subDomain ? : string } ;
}
declare namespace H.service.traffic {
  /**
   * This class encapsulates the [HERE Traffic API v6](https://developer.here.com/documentation/traffic/)
   * in a service stub, providing methods to access its resources.
   *
   * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
   * Instead an instance of this Service can be retrieved by calling the factory method
   * {@link H.service.Platform#getTrafficService} on a platform instance.
   */
  class Service extends H.service.Service {
    /**
     * This class encapsulates the [HERE Traffic API v6](https://developer.here.com/documentation/traffic/)
     * in a service stub, providing methods to access its resources.
     *
     * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
     * Instead an instance of this Service can be retrieved by calling the factory method
     * {@link H.service.Platform#getTrafficService} on a platform instance.
     * @param opt_options Configuration options for traffic service
     */
    constructor (opt_options ? : H.service.traffic.Service.Options ) ;
    /**
     * To create a traffic flow tile layer.
     * @param opt_additionalParameters An object containing an additional set of URL parameters
     * @param opt_engineType The engine type used in the map to properly configure the layer's provider style Default is `H.Map.EngineType.WEBGL`.
     */
    createFlowLayer (opt_additionalParameters ? : H.service.ServiceParameters , opt_engineType ? : H.Map.EngineType ) : H.map.layer.TileLayer ;
    /**
     * To create a traffic incidents marker tile layer.
     * @param opt_additionalParameters An object containing an additional set of URL parameters
     */
    createIncidentsLayer (opt_additionalParameters ? : H.service.ServiceParameters ) : H.map.layer.MarkerTileLayer ;
    /**
     * This method requests traffic flow data by tile coordinates
     * @param x tile column number
     * @param y tile row number
     * @param z zoom level
     * @param opt_serviceParams optional service parameters to be added to the request
     */
    requestFlowByTile (x : number , y : number , z : number , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any , opt_serviceParams ? : H.service.ServiceParameters ) : GlobalObject ;
    /**
     * This method requests traffic incidents based on the service parameters provided.
     */
    requestIncidents (serviceParams : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : GlobalObject ;
    /**
     * This method requests traffic incident information by tile coordinates
     * @param x tile column number
     * @param y tile row number
     * @param z zoom level
     * @param onResult callback to handle a service response
     * @param onError callback to handle a communication error
     * @param opt_serviceParams optional service parameters to be added to the request
     */
    requestIncidentsByTile (x : number , y : number , z : number , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any , opt_serviceParams ? : H.service.ServiceParameters ) : GlobalObject ;
    /**
     * The property name to use when specifying options for this service
     * within the {@link H.service.Platform.Options#servicesConfig}.
     */
    static CONFIG_KEY : string ;
  }
}
declare namespace H.service.traffic.Service {
  type Options = { baseUrl ? : H.service.Url , callbackKey ? : string , path ? : string , subDomain ? : string } ;
}
declare namespace H.service.traffic {
  /**
   * This class encapsulates the [HERE Traffic API v7](https://developer.here.com/documentation/traffic-api/)
   * in a service stub, providing methods to access its resources.
   *
   * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
   * Instead an instance of this Service can be retrieved by calling the factory method
   * {@link H.service.Platform#getTrafficService} on a platform instance.
   */
  class Service7 extends H.service.Service {
    /**
     * This class encapsulates the [HERE Traffic API v7](https://developer.here.com/documentation/traffic-api/)
     * in a service stub, providing methods to access its resources.
     *
     * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
     * Instead an instance of this Service can be retrieved by calling the factory method
     * {@link H.service.Platform#getTrafficService} on a platform instance.
     * @param opt_options Configuration options for traffic service
     */
    constructor (opt_options ? : H.service.Options ) ;
    /**
     * This method requests traffic flow information within a specified area
     *
     * Please refer to the
     * [Traffic API v7](https://developer.here.com/documentation/traffic-api/) documentation
     * for information on available parameters and the response object structure.
     * @param params service parameters to be added to the request
     * @param onResult callback to handle a service response
     * @param onError callback to handle a communication error
     */
    requestFlowByArea (params : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * This method requests traffic incidents based on the service parameters provided.
     *
     * Please refer to the
     * [Traffic API v7](https://developer.here.com/documentation/traffic-api/) documentation
     * for information on available parameters and the response object structure.
     * @param originalId Identifier of the first traffic incident in a chain of updates
     * @param params service parameters to be added to the request
     * @param onResult callback to handle a service response
     * @param onError callback to handle a communication error
     */
    requestIncidentById (originalId : string , params : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * This method requests traffic incident information within a specified area
     *
     * Please refer to the
     * [Traffic API v7](https://developer.here.com/documentation/traffic-api/) documentation
     * for information on available parameters and the response object structure.
     * @param params service parameters to be added to the request
     * @param onResult callback to handle a service response
     * @param onError callback to handle a communication error
     */
    requestIncidentsByArea (params : H.service.ServiceParameters , onResult : (a : GlobalObject ) => any , onError : (a : Error ) => any ) : H.util.ICancelable ;
    /**
     * The property name to use when specifying options for this service
     * within the {@link H.service.Platform.Options#servicesConfig}.
     */
    static CONFIG_KEY : string ;
  }
}
declare namespace H.service.traffic.flow {
  /**
   * This class represents a provider for continuous fetching of traffic flow data from the
   * [HERE Traffic API](https://developer.here.com/documentation/traffic/dev_guide/topics/what-is.html).
   *
   * Note that as this provider provides vector data for rendering traffic flow, it can be used only
   * with the {@link H.Map.EngineType.WEBGL} engine type (see {@link H.Map.Options#engineType}).
   *
   * It allows filtering of flow items by various parameters as well as makes possible to edit the default styling.
   */
  class Provider extends H.map.provider.RemoteTileProvider {
    /**
     * This class represents a provider for continuous fetching of traffic flow data from the
     * [HERE Traffic API](https://developer.here.com/documentation/traffic/dev_guide/topics/what-is.html).
     *
     * Note that as this provider provides vector data for rendering traffic flow, it can be used only
     * with the {@link H.Map.EngineType.WEBGL} engine type (see {@link H.Map.Options#engineType}).
     *
     * It allows filtering of flow items by various parameters as well as makes possible to edit the default styling.
     * @param service The traffic service instance to use by the provider.
     * @param opt_refreshTime A value indicating an interval between provider tiles updates (in ms), defaults to 3 minutes
     * @param opt_additionalParameters Contains an additional set of URL parameters. By default both `TMC` and `DLR` data will be fetched. Shape and functional class of the flow items will be always fetched.
     * @param opt_engineType The engine type in use, it is used to return the proper format of the provider's default style. Default is `H.Map.EngineType.WEBGL`.
     */
    constructor (service : H.service.traffic.Service , opt_refreshTime ? : number , opt_additionalParameters ? : H.service.ServiceParameters , opt_engineType ? : H.Map.EngineType ) ;
    createTileInternal (x : number , y : number , z : number , data : HTMLImageElement | HTMLCanvasElement | GlobalObject , opt_options ? : H.service.ServiceParameters ) : H.map.provider.Tile ;
    /**
     * To obtain the style used for rendering the provider data.
     */
    getStyle ( ) : H.map.render.Style < any > ;
    requestInternal (x : number , y : number , z : number , onResponse : (a : null | HTMLImageElement | HTMLCanvasElement | ArrayBuffer | GlobalObject , b ? : any ) => any , onError : (a : Error ) => any , opt_priority ? : number ) : H.util.ICancelable ;
    /**
     * Sets the style to be used for rendering the provider data.
     */
    setStyle (style : H.map.render.Style < any > ) : void ;
  }
}
declare namespace H.service.traffic.incidents {
  /**
   * This class represents a traffic incidents provider which requests
   * traffic incident data from the platform traffic service and converts it to map objects.
   */
  class Provider extends H.map.provider.MarkerTileProvider {
    /**
     * This class represents a traffic incidents provider which requests
     * traffic incident data from the platform traffic service and converts it to map objects.
     * @param service The traffic service instance to use by the provider
     * @param opt_refreshTime A value indicating an interval between provider tiles updates (in ms), defaults to 3 minutes
     * @param opt_additionalParameters An object containing an additional set of URL parameters
     */
    constructor (service : H.service.traffic.Service , opt_refreshTime ? : number , opt_additionalParameters ? : H.service.ServiceParameters ) ;
    /**
     * This method disposes listeners and resources from the given instance.
     */
    dispose : ( ) => void ;
  }
}
declare namespace H.service.trafficVectorTile {
  /**
   * This class represents a provider for tiles from the
   * [HERE Traffic Vector Tile API](https://developer.here.com/documentation/traffic-vector-tiles/dev_guide/index.html)
   *
   * Note that as this provider provides vector data, it can be used only with a vector rendering engine
   * (see {@link H.Map.Options#engineType}).
   */
  class Provider extends H.map.provider.RemoteTileProvider {
    /**
     * This class represents a provider for tiles from the
     * [HERE Traffic Vector Tile API](https://developer.here.com/documentation/traffic-vector-tiles/dev_guide/index.html)
     *
     * Note that as this provider provides vector data, it can be used only with a vector rendering engine
     * (see {@link H.Map.Options#engineType}).
     * @param service An object representing the Traffic Vector Tile service.
     * @param style The style to use for rendering traffic vector tile data from the provider.
     * @param opt_options The options to instantiate the provider
     */
    constructor (service : H.service.trafficVectorTile.Service , style : H.map.render.Style < any > , opt_options ? : H.service.trafficVectorTile.Provider.Options ) ;
    getCache ( ) : H.util.ICache ;
    getCopyrights (boundingBox : H.geo.Rect , level : number ) : H.map.ICopyright [] | null ;
    /**
     * To obtain the style used for rendering the provider data.
     */
    getStyle ( ) : H.map.render.Style < any > ;
    getTileKey (x : number , y : number , z : number ) : string ;
    requestInternal (x : number , y : number , z : number , onResponse : (a : null | HTMLImageElement | HTMLCanvasElement | ArrayBuffer | GlobalObject , b ? : any ) => any , onError : (a : Error ) => any , opt_priority ? : number ) : H.util.ICancelable ;
    /**
     * Sets the style to be used for rendering the provider data.
     */
    setStyle (style : H.map.render.Style < any > ) : void ;
  }
}
declare namespace H.service.trafficVectorTile.Provider {
  type Options = { engineType ? : H.Map.EngineType , max ? : number , min ? : number , uri ? : string } ;
}
declare namespace H.service.trafficVectorTile {
  /**
   * This class encapsulates the
   * [HERE Traffic Vector Tile API](https://developer.here.com/documentation/traffic-vector-tiles/dev_guide/index.html)
   * endpoint.
   *
   * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
   * Instead an instance of this Service can be retrieved by calling the factory method
   * {@link H.service.Platform#getTrafficVectorTileService} on a platform instance.
   */
  class Service extends H.service.Service {
    /**
     * This class encapsulates the
     * [HERE Traffic Vector Tile API](https://developer.here.com/documentation/traffic-vector-tiles/dev_guide/index.html)
     * endpoint.
     *
     * It's not allowed to call the constructor directly (an `IllegalOperationError` is thrown).
     * Instead an instance of this Service can be retrieved by calling the factory method
     * {@link H.service.Platform#getTrafficVectorTileService} on a platform instance.
     * @param opt_options Configuration options for Traffic Vector Tile service
     */
    constructor (opt_options ? : H.service.trafficVectorTile.Service.Options ) ;
    /**
     * To create an Traffic Vector Tile map layer according to the passed configuration.
     * @param style The style to use for rendering data provided by the provider.
     * @param opt_providerOptions The options to instantiate the provider.
     * @param opt_layerOptions The options to instantiate the layer.
     */
    createLayer (style : H.map.render.Style < any > , opt_providerOptions ? : H.service.trafficVectorTile.Provider.Options , opt_layerOptions ? : H.map.layer.ITileLayer.Options ) : H.map.layer.TileLayer ;
    /**
     * The property name to use when specifying options for this service
     * within the {@link H.service.Platform.Options#servicesConfig}.
     */
    static CONFIG_KEY : string ;
  }
}
declare namespace H.service.trafficVectorTile.Service {
  type Options = { baseUrl ? : H.service.Url , headers ? : GlobalObject , layer ? : string , path ? : string , subDomain ? : string } ;
}
declare namespace H.ui {
  /**
   * This class represents the base class for UI controls on the map.
   */
  class Control extends H.ui.base.Container {
    /**
     * This class represents the base class for UI controls on the map.
     */
    constructor ( ) ;
    /**
     * This method retrieves a value indicating layout alignment for the given control.
     */
    getAlignment ( ) : H.ui.LayoutAlignment ;
    /**
     * This method retrieves the localization object which corresponds to the
     * current locale of the UI.
     */
    getLocalization ( ) : H.ui.i18n.Localization ;
    /**
     * This method retrieves the map object to which the given control is attached.
     *
     * Note:  This method returns `null` if called before any controls have been added
     * to a UI object.
     */
    getMap ( ) : H.Map | null ;
    /**
     * This abstract method can be overridden by deriving classes to be invoked when
     * the UI object distance measurement system changes.
     * @param unitSystem An identifier indicating the distance measurement system the UI currently uses
     */
    onUnitSystemChange (unitSystem : H.ui.UnitSystem ) : void ;
    renderInternal (element : GlobalElement , doc : Document ) : void ;
    /**
     * This method sets the layout alignment for the given control.
     *
     * The alignment within the map view port can be:
     * <pre>
     * +--------------------------------------------------------------------------------+
     * |  "top-left"  > >           &lt; &lt;  "top-center"  > >            &lt; &lt;  "top-right"  |
     * |  "left-top"                                                       "right-top"  |
     * |  v                                                                          v  |
     * |  v                                                                          v  |
     * |                                                                                |
     * |                                                                                |
     * |  ^                                                                          ^  |
     * |  ^                                                                          ^  |
     * |  "left-middle"                                                 "right-middle"  |
     * |  v                                                                          v  |
     * |  v                                                                          v  |
     * |                                                                                |
     * |                                                                                |
     * |  ^                                                                          ^  |
     * |  ^                                                                          ^  |
     * |  "left-bottom"                                                 "right-bottom"  |
     * |  "bottom-left"  > >       &lt; &lt;  "bottom-center"  > >       &lt; &lt;  "bottom-right"  |
     * +--------------------------------------------------------------------------------+
     * </pre>
     *
     * Elements with the same layout alignments are lined up in the directions of
     * the arrows in the illustration.
     * @param alignment A value indicating the new alignment of the control
     */
    setAlignment (alignment : H.ui.LayoutAlignment ) : H.ui.Control ;
  }
}
declare namespace H.ui {
  /**
   * This class represents a distance measurement control. The control helps in
   * calculate distances between geographical locations, which the user selects by
   * clicking on the map.
   *
   * This control adds direct user-interaction to the map. The user can click on
   * the map to specify the locations and build a path whose length is
   * measured. The locations are indicated by markers and the path by lines
   * connecting the markers.
   *
   * The user can remove a marker added to the map in this by by holding down the
   * ALT/CMD key and clicking on the marker. The user can also split the line
   * connecting two markers by clicking on the line between the markers.  Pass
   * {@link H.ui.DistanceMeasurement.Options} to the constructor to customize
   * the icons of the markers and the connecting lines.
   *
   * When specifying custom icons for the markers, note that you may need to
   * specify the {@link H.map.Icon.Options#anchor} option in order to
   * position the icon exactly on the location on which the user clicked.
   */
  class DistanceMeasurement extends H.ui.Control {
    /**
     * This class represents a distance measurement control. The control helps in
     * calculate distances between geographical locations, which the user selects by
     * clicking on the map.
     *
     * This control adds direct user-interaction to the map. The user can click on
     * the map to specify the locations and build a path whose length is
     * measured. The locations are indicated by markers and the path by lines
     * connecting the markers.
     *
     * The user can remove a marker added to the map in this by by holding down the
     * ALT/CMD key and clicking on the marker. The user can also split the line
     * connecting two markers by clicking on the line between the markers.  Pass
     * {@link H.ui.DistanceMeasurement.Options} to the constructor to customize
     * the icons of the markers and the connecting lines.
     *
     * When specifying custom icons for the markers, note that you may need to
     * specify the {@link H.map.Icon.Options#anchor} option in order to
     * position the icon exactly on the location on which the user clicked.
     * @param opt_options Optional parameters to be passed to this control
     */
    constructor (opt_options ? : H.ui.DistanceMeasurement.Options ) ;
    onUnitSystemChange (unitSystem : H.ui.UnitSystem ) : void ;
    renderInternal (element : GlobalElement , doc : Document ) : void ;
  }
}
declare namespace H.ui.DistanceMeasurement {
  type Options = { alignment ? : string , distanceFormatter ? : (a : number ) => string , endIcon ? : H.map.Icon , lineStyle ? : H.map.SpatialStyle.Options , splitIcon ? : H.map.Icon , startIcon ? : H.map.Icon , stopoverIcon ? : H.map.Icon } ;
}
declare namespace H.ui {
  /**
   * This class represents an information bubble bound to a geographic position on the map.
   */
  class InfoBubble extends H.ui.base.Element {
    /**
     * This class represents an information bubble bound to a geographic position on the map.
     * @param position The geographic location to which this info bubble corresponds
     * @param opt_options An object containing optional initialization parameters to be passed to the info bubble
     */
    constructor (position : H.geo.IPoint , opt_options ? : H.ui.InfoBubble.Options ) ;
    /**
     * This method closes the info bubble (setting its state to CLOSED).
     */
    close ( ) : void ;
    /**
     * This method retrieves the content element of the info bubble object.
     *
     * Note: The content element is `null` before the info bubble has been
     * added to a UI object.
     */
    getContentElement ( ) : HTMLElement | null ;
    /**
     * This method retrieves the current state of the info bubble instance.
     */
    getState ( ) : H.ui.InfoBubble.State ;
    /**
     * This method opens the info bubble (setting its state to OPEN).
     */
    open ( ) : void ;
    renderInternal (element : GlobalElement , doc : Document ) : void ;
    /**
     * This methods sets the content of the info bubble. This can either be a string
     * (applied as `innerHTML`) to the content element of the given info
     * bubble or an HTML node to be appended to the content element.
     * @param content An object representing the content for the given bubble
     */
    setContent (content : string | Node ) : void ;
    /**
     * This method sets the geographic location of the given info bubble.
     * @param position An object defining the geographic location of the bubble
     */
    setPosition (position : H.geo.IPoint ) : void ;
    /**
     * This method sets the state of the info bubble.
     * @param state A value indicating the new state of the info bubble
     */
    setState (state : H.ui.InfoBubble.State ) : void ;
  }
}
declare namespace H.ui.InfoBubble {
  type Options = { content ? : string | Node , onStateChange ? : (a : H.ui.InfoBubble.State ) => any } ;
  /**
   * This enumeration defines identifiers for the state applicable to an info bubble.
   */
  enum State {
    CLOSED = 'closed' ,
    OPEN = 'open' ,
  }
}
declare namespace H.ui {
  /**
   * This enumeration holds values indicating the possible layout alignments for
   * UI elements.
   */
  /**
   * This enumeration holds values indicating the possible layout alignments for
   * UI elements.
   */
  enum LayoutAlignment {
    BOTTOM_CENTER = 'bottom-center' ,
    BOTTOM_LEFT = 'bottom-left' ,
    BOTTOM_RIGHT = 'bottom-right' ,
    LEFT_BOTTOM = 'left-bottom' ,
    LEFT_MIDDLE = 'left-middle' ,
    LEFT_TOP = 'left-top' ,
    RIGHT_BOTTOM = 'right-bottom' ,
    RIGHT_MIDDLE = 'right-middle' ,
    RIGHT_TOP = 'right-top' ,
    TOP_CENTER = 'top-center' ,
    TOP_LEFT = 'top-left' ,
    TOP_RIGHT = 'top-right' ,
  }
}
declare namespace H.ui {
  /**
   * This class represents a menu control allowing the user to select the base map types as well as
   * add additional layers on top.
   */
  class MapSettingsControl extends H.ui.Control {
    /**
     * This class represents a menu control allowing the user to select the base map types as well as
     * add additional layers on top.
     * @param opt_options Optional initialization parameters for the given control object
     */
    constructor (opt_options ? : H.ui.MapSettingsControl.Options ) ;
    renderInternal (element : GlobalElement , doc : Document ) : void ;
  }
}
declare namespace H.ui.MapSettingsControl {
  type Entry = { label : string , layer ? : H.map.layer.Layer [] | H.map.layer.Layer } ;
  type Options = { alignment ? : string , baseLayers ? : H.ui.MapSettingsControl.Entry [] , layers ? : H.ui.MapSettingsControl.Entry [] } ;
}
declare namespace H.ui {
  /**
   * This class represents a small overview of the main map.
   */
  class Overview extends H.ui.Control {
    /**
     * This class represents a small overview of the main map.
     * @param baseLayer The layer to use to display the overview map
     * @param opt_options Optional initialization parameters
     */
    constructor (baseLayer : H.map.layer.Layer , opt_options ? : H.ui.Overview.Options ) ;
    renderInternal (element : GlobalElement , doc : Document ) : void ;
    /**
     * This method method sets the base layer of the overview map.
     * @param baseLayer An object representing the base layer
     */
    setBaseLayer (baseLayer : H.map.layer.TileLayer ) : H.ui.Overview ;
  }
}
declare namespace H.ui.Overview {
  type Options = { alignment ? : string , scaleX ? : number , scaleY ? : number , zoomDelta ? : number } ;
}
declare namespace H.ui {
  /**
   * This class represents a UI element that shows the zoom scale.
   */
  class ScaleBar extends H.ui.Control {
    /**
     * This class represents a UI element that shows the zoom scale.
     * @param opt_options Optional parameters to be passed to this scale bar object.
     */
    constructor (opt_options ? : H.ui.ScaleBar.Options ) ;
    onUnitSystemChange (unitSystem : H.ui.UnitSystem ) : void ;
    renderInternal (element : GlobalElement , doc : Document ) : void ;
  }
}
declare namespace H.ui.ScaleBar {
  type Options = { alignment ? : string } ;
}
declare namespace H.ui {
  /**
   * This class encapsulates map UI functionality.
   */
  class UI extends H.util.EventTarget implements H.util.ICapturable {
    /**
     * This class encapsulates map UI functionality.
     * @param map An object representing the map
     * @param opt_options An optional object containing the initialization parameters.
     */
    constructor (map : H.Map , opt_options ? : H.ui.UI.Options ) ;
    /**
     * This method adds an info bubble to the UI.
     * @param bubble The info bubble to be added
     */
    addBubble (bubble : H.ui.InfoBubble ) : void ;
    /**
     * This method appends a control to the UI.
     * @param name The name under which to register the control
     * @param control The control to add to the UI
     */
    addControl (name : string , control : H.ui.Control ) : void ;
    capture (canvas : HTMLCanvasElement , pixelRatio : number , callback : (a : HTMLCanvasElement ) => any , opt_errback ? : (a : string ) => any ) : void ;
    /**
     * This method retrieves a list of info bubble objects which are currently attached to the UI.
     */
    getBubbles ( ) : H.ui.InfoBubble [] ;
    /**
     * This method retrieves a UI control which was previously registered with the provided name.
     * @param name The name under which the control was registered
     */
    getControl (name : string ) : H.ui.Control | undefined ;
    /**
     * This method retrieves the root element of the user interface.
     */
    getElement ( ) : GlobalElement | undefined ;
    /**
     * This method retrieves the map instance to which the UI was added.
     */
    getMap ( ) : H.Map ;
    /**
     * This method retrieves the current distance measurement system for the given UI instance.
     */
    getUnitSystem ( ) : H.ui.UnitSystem ;
    /**
     * This method removes a previously added info bubble from the UI.
     * @param bubble The info bubble to be removed
     */
    removeBubble (bubble : H.ui.InfoBubble ) : void ;
    /**
     * This method removes a previously registered control from the UI object.
     * @param name The name under which the control was previously registered
     */
    removeControl (name : string ) : H.ui.Control | undefined ;
    /**
     * Sets the "direction" CSS property on UI DOM element for the correct rendering of the languages written
     * from right to left (like Hebrew or Arabic).
     * @param opt_direction The "direction" to use. When value is not specified, we detect it automatically from the inherited CSS property of the map container.
     */
    setDirection (opt_direction ? : string ) : void ;
    /**
     * This method sets the distance measurement system for the given UI object.
     * @param unitSystem The distance measurement system to use
     */
    setUnitSystem (unitSystem : H.ui.UnitSystem ) : void ;
    /**
     * This method toggles distance measurement system between
     * {@link H.ui.UnitSystem.METRIC} and {@link H.ui.UnitSystem.IMPERIAL}.
     */
    toggleUnitSystem ( ) : void ;
    /**
     * This function creates the default UI including the zoom control, map settings control and scalebar.
     * The default controls are assigned the following values:
     *
     * - Zoom control:
     * * id: 'zoom'
     * * alignment: 'right-middle'
     * - Map settings control:
     * * id: 'mapsettings'
     * * alignment: 'bottom-right'
     * - Scalebar:
     * * id: 'scalebar'
     * * alignment: 'bottom-right'
     * @param map The map instance to which to append the UI
     * @param defaultLayers The default layers obtained via {@link H.service.Platform#createDefaultLayers}.
     * @param opt_locale The language to use (or a full localization object).
     */
    static createDefault (map : H.Map , defaultLayers : GlobalObject , opt_locale ? : H.ui.i18n.Localization | string ) : H.ui.UI ;
  }
}
declare namespace H.ui.UI {
  type Options = { distancemeasurement ? : H.ui.DistanceMeasurement.Options | boolean , locale ? : H.ui.i18n.Localization | string , mapsettings ? : H.ui.MapSettingsControl.Options | boolean , scalebar ? : H.ui.ScaleBar.Options | boolean , unitSystem ? : H.ui.UnitSystem , zoom ? : H.ui.ZoomControl.Options | boolean , zoomrectangle ? : H.ui.ScaleBar.Options | boolean } ;
}
declare namespace H.ui {
  /**
   * This enumeration defines identifiers for the supported distance measurement
   * systems for the UI.
   */
  /**
   * This enumeration defines identifiers for the supported distance measurement
   * systems for the UI.
   */
  enum UnitSystem {
    IMPERIAL = 'imperial' ,
    METRIC = 'metric' ,
  }
}
declare namespace H.ui {
  /**
   * This class represents the UI control that allows the user to change the map
   * zoom level.
   */
  class ZoomControl extends H.ui.Control {
    /**
     * This class represents the UI control that allows the user to change the map
     * zoom level.
     * @param opt_options An object containing initialization parameters.
     */
    constructor (opt_options ? : H.ui.ZoomControl.Options ) ;
    /**
     * This method retrieves the zoom speed (in levels per millisecond) which is
     * applied when the button is pressed constantly.
     */
    getZoomSpeed ( ) : number ;
    renderInternal (element : GlobalElement , doc : Document ) : void ;
    setAlignment (alignment : H.ui.LayoutAlignment ) : H.ui.Control ;
    setDisabled (opt_disabled ? : boolean , opt_force ? : boolean ) : H.ui.base.Element ;
    /**
     * This method sets the zoom speed (in levels per millisecond) which is applied when the button is pressed constantly.
     * @param zoomSpeed A value indicating the zoom speed
     */
    setZoomSpeed (zoomSpeed : number ) : void ;
  }
}
declare namespace H.ui.ZoomControl {
  type Options = { alignment ? : string , fractionalZoom ? : boolean , slider ? : boolean , sliderSnaps ? : boolean , zoomSpeed ? : number } ;
}
declare namespace H.ui {
  /**
   * This class represents a zoom rectangle control element that allows zooming to
   * the selected area on the screen.
   */
  class ZoomRectangle extends H.ui.Control {
    /**
     * This class represents a zoom rectangle control element that allows zooming to
     * the selected area on the screen.
     * @param opt_options An object containing optional initialization parameters
     */
    constructor (opt_options ? : H.ui.ScaleBar.Options ) ;
    renderInternal (element : GlobalElement , doc : Document ) : void ;
  }
}
declare namespace H.ui.ZoomRectangle {
  type Options = { alignment ? : string } ;
}
declare namespace H.ui.base {
  /**
   * This class represents a button.
   */
  class Button extends H.ui.base.Element {
    /**
     * This class represents a button.
     * @param opt_options Optional parameters to be passed to the button instance
     */
    constructor (opt_options ? : H.ui.base.Button.Options ) ;
    /**
     * This method retrieves the label string for the given button.
     */
    getLabel ( ) : string ;
    /**
     * This method retrieves the current state of the button.
     */
    getState ( ) : H.ui.base.Button.State ;
    renderInternal (element : GlobalElement , doc : Document ) : void ;
    setDisabled (opt_disabled ? : boolean , opt_force ? : boolean ) : H.ui.base.Element ;
    /**
     * This method sets the label string for the given button object.
     * @param label The label to set on the given button object
     * @param opt_force A Boolean flag indicating if the new label should be set and propagated even if it has the same value as the current one (`true`) or not (`false`).
     */
    setLabel (label : string , opt_force ? : boolean ) : H.ui.base.Button ;
    /**
     * This method sets the state of this button.
     * @param state A value to which the button is to be set
     * @param opt_suppressEvent An optional flag indicating that the `onStateChange` callback is not to be invoked
     */
    setState (state : H.ui.base.Button.State , opt_suppressEvent ? : boolean ) : H.ui.base.Button ;
  }
}
declare namespace H.ui.base.Button {
  type Options = { data : any , disabled ? : boolean , label ? : string , onStateChange ? : (a : H.util.Event ) => any } ;
  /**
   * This enumeration represents the possible state a button can have, namely 'UP' and 'DOWN'
   */
  enum State {
    DOWN = 'down' ,
    UP = 'up' ,
  }
}
declare namespace H.ui.base {
  /**
   * This class represents an abstract base class for container UI elements such as Lists and Panels.
   */
  class Container extends H.ui.base.Element {
    /**
     * This class represents an abstract base class for container UI elements such as Lists and Panels.
     * @param opt_elementType The rendering HTML element type (the given UI element is to be rendered as this type), the default is `div`
     * @param opt_className An optional class name to be used on the given element
     * @param opt_children Optional child elements to be added to the given container element
     */
    constructor (opt_elementType ? : string , opt_className ? : string , opt_children ? : H.ui.base.Element [] ) ;
    /**
     * This method adds a child element to be rendered within the given container element.
     * @param child The child element to be added
     */
    addChild (child : H.ui.base.Element ) : H.ui.base.Container ;
    /**
     * This method retrieves the child element collection of the given container.
     */
    getChildren ( ) : H.ui.base.Element [] ;
    /**
     * This method removes a child element from the given container's child element collection.
     * @param child The child element to be removed
     */
    removeChild (child : H.ui.base.Element ) : void ;
    renderInternal (element : GlobalElement , doc : Document ) : void ;
    setDisabled (opt_disabled ? : boolean , opt_force ? : boolean ) : H.ui.base.Element ;
  }
}
declare namespace H.ui.base {
  /**
   * This class represents the base class for UI elements such as buttons and list
   * entries.
   */
  class Element extends H.util.EventTarget {
    /**
     * This class represents the base class for UI elements such as buttons and list
     * entries.
     * @param opt_elementType The rendering HTML element type (the given UI element is to be rendered as this type), the default is `div`
     * @param opt_className An optional class name to apply to the given element
     */
    constructor (opt_elementType ? : string , opt_className ? : string ) ;
    /**
     * This method adds a CSS class to the given UI element (if it is not already present).
     * @param className The name of the CSS class to add
     */
    addClass (className : string ) : H.ui.base.Element ;
    /**
     * This method retrieves previously stored arbitrary data from the given element.
     */
    getData ( ) : any ;
    /**
     * This method retrieves the HTML element that represents the given UI element.
     *
     * Note: If the UI element has not been rendered, the method retrieves `null`.
     */
    getElement ( ) : HTMLElement | null ;
    /**
     * This method retrieves a value indicating if the given element is visibile.
     */
    getVisibility ( ) : boolean ;
    /**
     * This method retrieves a value indicating if the given UI element is disabled.
     */
    isDisabled ( ) : boolean ;
    /**
     * This method removes a CSS class from the given UI element (if it is present).
     * @param className The CSS class name to add
     */
    removeClass (className : string ) : H.ui.base.Element ;
    /**
     * This method is the concrete implementation of the UI element. It receives the pre-rendered HTML
     * element which may be modified by deriving classes.
     * @param element The HTML representation of the given UI element
     * @param doc The HTML document into which the give UI element is rendered
     */
    renderInternal (element : GlobalElement , doc : Document ) : void ;
    /**
     * This method stores arbitrary data with the given UI element.
     * @param data The data to be stored
     */
    setData (data : any ) : void ;
    /**
     * This method sets a value indicating if the given UI element is disabled.
     * @param opt_disabled `true` to disable the element, `false` to enable it. Default is `false`
     * @param opt_force An optional Boolean flag indicating that the value should be set and propagated even if it is the same as the current state
     */
    setDisabled (opt_disabled ? : boolean , opt_force ? : boolean ) : H.ui.base.Element ;
    /**
     * This method sets a value indicating if the given element is visible.
     * @param visibility `true` if the given element is visible, otherwise `false`
     */
    setVisibility (visibility : boolean ) : void ;
  }
}
declare namespace H.ui.base {
  /**
   * This class represents a panel that points to a control.
   */
  class OverlayPanel extends H.ui.base.Container {
    /**
     * This class represents a panel that points to a control.
     */
    constructor ( ) ;
    /**
     * This method retrieves the current state of the panel.
     */
    getState ( ) : H.ui.base.OverlayPanel.State ;
    /**
     * This method adjusts the alignment of the overlay panel to point to the provided control.
     * @param control The control to which to point
     */
    pointToControl (control : H.ui.Control ) : void ;
    /**
     * This method sets the state of the given panel object.
     * @param state The state of the given panel object
     * @param opt_force A Boolean value indicating whether the value should be propagated even if it is the same as the current value (`true`), or not (`false`)
     */
    setState (state : H.ui.base.OverlayPanel.State , opt_force ? : boolean ) : H.ui.base.OverlayPanel ;
  }
}
declare namespace H.ui.base.OverlayPanel {
  /**
   * This enumeration defines identifiers for panel states.
   */
  enum State {
    CLOSED = 'closed' ,
    OPEN = 'open' ,
  }
}
declare namespace H.ui.base {
  /**
   * This class represents a button, which keeps its state when pressed.
   * Pressing the button once changes its state to 'down'. Pressing it again
   * changes the state to 'up'.
   */
  class PushButton extends H.ui.base.Button {
    /**
     * This class represents a button, which keeps its state when pressed.
     * Pressing the button once changes its state to 'down'. Pressing it again
     * changes the state to 'up'.
     * @param opt_options Optional parameters to be passed to the given button instance.
     */
    constructor (opt_options ? : H.ui.base.Button.Options ) ;
    renderInternal (element : GlobalElement , doc : Document ) : void ;
    /**
     * This method toggles the state of the button between the two possible button states (see
     * {@link H.ui.base.Button.State}).
     */
    toggleState ( ) : H.ui.base.PushButton ;
  }
}
declare namespace H.ui.base {
  /**
   * This class represents a group of push buttons of which only one can be active at a time.
   */
  class RadioGroup extends H.ui.base.Container {
    /**
     * This class represents a group of push buttons of which only one can be active at a time.
     * @param opt_options An optional configuration options
     */
    constructor (opt_options ? : H.ui.base.RadioGroup.Options ) ;
    /**
     * This method adds a button element to the given group.
     * @param button The button to add
     */
    addButton (button : H.ui.base.PushButton ) : H.ui.base.RadioGroup ;
    /**
     * This method retrieves the buttons currently registered with the given group.
     */
    getButtons ( ) : H.ui.base.PushButton [] ;
    /**
     * This method retrieves the current title string of the given group.
     */
    getTitle ( ) : string ;
    /**
     * This method removes a button element from the given group.
     * @param button The button to remove
     */
    removeButton (button : H.ui.base.PushButton ) : H.ui.base.RadioGroup ;
    renderInternal (element : GlobalElement , doc : Document ) : void ;
    /**
     * This method sets the active button of the given radio group.
     * @param button The button to be the active button in the radio group
     * @param opt_suppressEvent An optional Boolean flag indicating if no state change event is to be fired `true`
     */
    setActiveButton (button : H.ui.base.PushButton , opt_suppressEvent ? : boolean ) : void ;
    /**
     * This method sets the title of the given group.
     * @param title The new title of this group
     * @param opt_force An optional flag indicating that the new value is to be updated and propagated even if it has the same value as the current title
     */
    setTitle (title : string , opt_force ? : boolean ) : H.ui.base.RadioGroup ;
  }
}
declare namespace H.ui.base.RadioGroup {
  type Options = { buttonsOptions ? : H.ui.base.Button.Options [] , title ? : string } ;
}
declare namespace H.ui.i18n {
  /**
   * This class is used for internationalization of UI components.
   */
  class Localization {
    /**
     * This class is used for internationalization of UI components.
     * @param locale A locale code, for example 'en-GB'
     * @param opt_translationMap An optional translation map for this locale.  If not provided, the `Locale` is initialized with default translations, if available
     */
    constructor (locale : string , opt_translationMap ? : GlobalObject ) ;
    /**
     * This method retrieves translation keys for current
     * locale. Keys from this set can be used to get translations
     * via `translate` method.
     */
    getKeys ( ) : string [] ;
    /**
     * This method retrieves the current locale code, for example 'en-US'.
     */
    getLocale ( ) : string ;
    /**
     * This method retrieves a Boolean value indicating whether the given localization
     * object has a translation for the specified translation key.
     * @param key A transaltion key
     */
    hasKey (key : string ) : boolean ;
    /**
     * This method retrieves translation for the key provided by the caller. It
     * throws an exception if a translation is not available.
     * @param key A translation key
     */
    translate (key : string ) : string ;
  }
}
declare namespace H.ui.i18n {
  /**
   * This property holds the locales available by default. The UI provides default translations for
   * this set of locale codes.
   */
  let defaultLocales : string [] ;
}
declare namespace H.util {
  /**
   * `AsyncQueue` represents a queue of task items that are processed
   * asynchronously. Items can be added and cancelled before they are
   * processed by the queue.
   *
   * The `AsyncQueue` constructor expects to receive a task processing
   * function as an argument. The function MUST call task#done with no arguments
   * when it finishes a task. If an error occurs during the processing, the
   * `done()` function MUST be called on the task object with an error message.
   */
  class AsyncQueue {
    /**
     * `AsyncQueue` represents a queue of task items that are processed
     * asynchronously. Items can be added and cancelled before they are
     * processed by the queue.
     *
     * The `AsyncQueue` constructor expects to receive a task processing
     * function as an argument. The function MUST call task#done with no arguments
     * when it finishes a task. If an error occurs during the processing, the
     * `done()` function MUST be called on the task object with an error message.
     * @param mode The processing mode for the given queue
     * @param processFn The function implementing the actual processing of the task item (it receives the the task item and the task data as arguments).
     */
    constructor (mode : H.util.AsyncQueue.Mode , processFn : (a : H.util.AsyncQueue.Task , b : any ) => any ) ;
    /**
     * This method pushes a task item to the queue for processing.
     * @param data The task data to be passed to the process function
     * @param onDone A function to be called once the task has been processed (an optional error string can be provided for use in the even of an error or if the task is cancelled).
     */
    push (data : any , onDone : (a : H.util.AsyncQueue.Task , b : any , c : any ) => any ) : H.util.AsyncQueue.Task ;
  }
}
declare namespace H.util.AsyncQueue {
  interface Mode {
  }
  class Task implements H.util.ICancelable {
    /**
     * This method provides the default implementation for cancelling a task. It
     * has an effect only if the task is cancelled before it is processed. To implement
     * task-specific cancelation, use the method `setCancelFn()` on the
     * `AsyncQueue` object.
     */
    cancel ( ) : void ;
    /**
     * This method signals that the processing of a task is complete. The method
     * must be called from the task processing function to inform the queue that
     * further tasks can be processed.
     * @param result The result of the task processing operation
     * @param opt_error An optional error message to use in the event of an error during the processing of the task.
     */
    done (result : any , opt_error ? : any ) : void ;
    /**
     * This method sets a function to be invoked when a task-specific operation is
     * to be canceled to allow for ad-hoc canceling during the processing of the task.
     * @param cancelFn The function to be called when canceling task
     */
    setCancelFn (cancelFn : Function | null ) : H.util.AsyncQueue.Task ;
  }
}
declare namespace H.util {
  /**
   * The cache represents an in-memory LRU-cache with a fixed size. Once
   * the elements held in the cache reach the maximum permitted size, the cache
   * drops the elements with the oldest retrieval time stamp to bring the size
   * of the cached data within bounds. Data elements held in the cache are stored
   * with their IDs and size to facilitate retrieval.
   */
  class Cache implements H.util.ICache {
    /**
     * The cache represents an in-memory LRU-cache with a fixed size. Once
     * the elements held in the cache reach the maximum permitted size, the cache
     * drops the elements with the oldest retrieval time stamp to bring the size
     * of the cached data within bounds. Data elements held in the cache are stored
     * with their IDs and size to facilitate retrieval.
     * @param maxSize A value indicating the maximum size of the cache
     * @param opt_onDrop A callback to be invoked when a data element is dropped from the cache
     * @param opt_filter A function to filter data elements that are not to be cached
     */
    constructor (maxSize : number , opt_onDrop ? : (a : string , b : any , c : number ) => any , opt_filter ? : (a : string , b : any , c : number ) => boolean ) ;
    /**
     * This method adds a data element to the cache and marks it as most recently
     * used. The data element must have an identifier that allows for retrieving
     * the object at a later stage and a size which will count towards the cache's
     * maximum size.
     */
    add (id : any , data : any , size : number ) : boolean ;
    deRegisterOnDrop (onDrop : (a : string , b : any , c : number ) => any ) : void ;
    drop (id : any ) : void ;
    forEach (callback : (a : string , b : any , c : number ) => any , opt_ctx ? : GlobalObject , opt_matcher ? : (a : string , b : any , c : number ) => boolean ) : void ;
    /**
     * This method retrieves an element from the cache and marks it as 'most recently used'.
     */
    get (id : string , opt_noUpdate ? : boolean ) : any ;
    /**
     * This method retrieves the current size of this cache.
     */
    getCurrentSize ( ) : number ;
    /**
     * This method retrieves the maximum size of the cache.
     */
    getMaxSize ( ) : number ;
    /**
     * This method registers a callback to be invoked for each entry dropped from
     * the cache.
     * @param onDrop A callback to be invoked when a data element is dropped from the cache
     */
    registerOnDrop (onDrop : (a : string , b : any , c : number ) => any ) : void ;
    removeAll (opt_matcher ? : (a : string , b : any , c : number ) => boolean ) : void ;
    /**
     * This method sets the maximum size of the cache. If the existing contents
     * of the cache exceed the new size, the least recently used data elements are
     * dropped.
     * @param maxSize A value indicating the new maximum size of the cache
     */
    setMaxSize (maxSize : number ) : H.util.Cache ;
  }
}
declare namespace H.util {
  /**
   * This event indicates a change. It contains both the old and the new value.
   */
  class ChangeEvent extends H.util.Event {
    /**
     * This event indicates a change. It contains both the old and the new value.
     * @param type A value indicating the event type
     * @param newValue The new value of the property
     * @param oldValue The previous value of the property
     */
    constructor (type : string , newValue : any , oldValue : any ) ;
    /**
     * This property holds the value of the property after it changed.
     */
    newValue : any ;
    /**
     * This property holds the value of the property before it changed.
     */
    oldValue : any ;
  }
}
declare namespace H.util {
  /**
   * A class to provide stream like access to the given string's characters
   */
  class CharStream implements H.util.ICharStream {
    /**
     * A class to provide stream like access to the given string's characters
     * @param input The text to use as input. If needed, the value is converted into a string.
     */
    constructor (input : string ) ;
  }
}
declare namespace H.util {
  /**
   * This class represents contextual information/action.
   */
  class ContextItem extends H.util.EventTarget {
    /**
     * This class represents contextual information/action.
     * @param opt_options An object containing the initialization properties
     */
    constructor (opt_options ? : H.util.ContextItem.Options ) ;
    /**
     * This method retrieves the label of the context item.
     */
    getLabel ( ) : string ;
    /**
     * This method retrieves a value indicating whether the given context item is
     * disabled or not.
     */
    isDisabled ( ) : boolean ;
    /**
     * This method enables/disables the context item.
     * @param disabled `true` to disable and `false` to enabled the context item
     */
    setDisabled (disabled : boolean ) : H.util.ContextItem ;
    /**
     * This method sets the context item label.
     * @param label A new label for the context item
     */
    setLabel (label : string ) : H.util.ContextItem ;
    /**
     * This constant represents the separator for the context item.
     */
    static SEPARATOR : H.util.ContextItem ;
  }
}
declare namespace H.util.ContextItem {
  type Options = { callback ? : (a : H.util.Event ) => any , disabled ? : boolean , label ? : string } ;
}
declare namespace H.util {
  /**
   * An event which holds any kind of data.
   * It uses one generic type:
   * <ul>
   * <li><code>T</code>: The type of the data</li>
   * </ul>
   */
  class DataEvent < T = any > extends H.util.Event {
    /**
     * An event which holds any kind of data.
     * It uses one generic type:
     * <ul>
     * <li><code>T</code>: The type of the data</li>
     * </ul>
     * @param type Event Type.
     * @param data Data that should be stored on the event object.
     * @param opt_target A reference to the object that is the target of the given event. It must implement the `EventTarget` interface.
     */
    constructor (type : string , data : T , opt_target ? : GlobalObject ) ;
    /**
     * Arbitrary data stored on the event.
     */
    data : T ;
  }
}
declare namespace H.util {
  /**
   * This class represents an object that can be safely disposed.
   */
  class Disposable extends goog.Disposable {
    /**
     * This class represents an object that can be safely disposed.
     */
    constructor ( ) ;
    /**
     * This method adds a callback which to be triggered when
     * an object is disposed.
     * @param callback A callback function to add
     * @param opt_scope An object representing the scope
     */
    addOnDisposeCallback (a : Function , b ? : GlobalObject ) : any ;
    /**
     * Disposes of the object. If the object hasn't already been disposed of, calls
     * {@link H.util.Disposable#disposeInternal}. Child classes should override the
     * `disposeInternal` in order to cleanup references, resources and other disposable data.
     */
    dispose : any ;
    /**
     * Performs appropriate cleanup.
     */
    disposeInternal : any ;
  }
}
declare namespace H.util {
  /**
   * An event which holds information about an error.
   */
  class ErrorEvent extends H.util.Event {
    /**
     * An event which holds information about an error.
     * @param type Event type.
     * @param message Error message.
     * @param opt_target A reference to the object that is the target of the given event. It must implement the `EventTarget` interface.
     */
    constructor (type : string , message : string , opt_target ? : GlobalObject ) ;
    /**
     * Error message.
     */
    message : string ;
  }
}
declare namespace H.util {
  /**
   * This is a base event class which is used for all events dispatched by any
   * instance of `EventTarget` within the API.
   */
  class Event extends goog.events.Event {
    /**
     * This is a base event class which is used for all events dispatched by any
     * instance of `EventTarget` within the API.
     * @param type Event Type.
     * @param opt_target A reference to the object that is the target of the given event. It must implement the `EventTarget` interface.
     */
    constructor (a : string , b ? : GlobalObject ) ;
    /**
     * This property indicates that the event is being evaluated at the target.
     */
    AT_TARGET : number ;
    /**
     * This property identifies the current event phase as the bubbling phase.
     */
    BUBBLING_PHASE : number ;
    /**
     * This property identifies the current event phase as the capturing phase.
     */
    CAPTURING_PHASE : number ;
    /**
     * This property indicates which phase of the event flow is being evaluated.
     */
    eventPhase : number ;
    /**
     * This method stops the propagation of the event.
     */
    stopPropagation : any ;
  }
}
declare namespace H.util {
  /**
   * This class enables listening and dispatching events on all its instances and the
   * derived classes.
   */
  class EventTarget extends goog.events.EventTarget {
    /**
     * This class enables listening and dispatching events on all its instances and the
     * derived classes.
     */
    constructor ( ) ;
    /**
     * This method adds a listener for a specific event.
     *
     * Note that to prevent potential memory leaks, you must either call `removeEventListener`
     * or `dispose` on the given object when you no longer need it.
     * @param type The name of the event
     * @param handler An event handler function
     * @param opt_capture `true` indicates that the method should listen in the capture phase (bubble otherwise)
     * @param opt_scope An object defining the scope for the handler function
     */
    addEventListener (a : string , b : Function , c ? : boolean , d ? : GlobalObject ) : any ;
    /**
     * This method adds a callback which is triggered when the `EventTarget` object is being disposed.
     * @param callback The callback function.
     * @param opt_scope An optional scope for the callback function
     */
    addOnDisposeCallback (a : Function , b ? : GlobalObject ) : any ;
    /**
     * This method dispatches an event on the `EventTarget` object.
     * @param evt An object representing the event or a string with the event name
     */
    dispatchEvent (a : H.util.Event | string ) : any ;
    /**
     * This method removes listeners from the given object. Classes that extend
     * `EventTarget` may need to override this method in order to remove
     * references to DOM Elements and additional listeners.
     */
    dispose : any ;
    /**
     * This method removes a previously added listener from the `EventTarget` instance.
     * @param type The name of the event
     * @param handler A previously added event handler
     * @param opt_capture `true` indicates that the method should listen in the capture phase (bubble otherwise)
     * @param opt_scope An object defining the scope for the handler function
     */
    removeEventListener (a : string , b : Function , c ? : boolean , d ? : GlobalObject ) : any ;
  }
}
declare namespace H.util {
  /**
   * This interface provides a definition for a generic cache. A cache can store any data elements.
   * To facilitate retrieval of these data elements, each has an identifier an a
   * content size attribute.
   */
  interface ICache {
    /**
     * This method adds an element to the cache.
     * @param id The identifier of this data element, the value is converted to a string.
     * @param data the actual data to be stored
     * @param size The size of the data element
     */
    add (id : any , data : any , size : number ) : boolean ;
    /**
     * This method de-registers a callback that is called each time an entry is dropped
     * from the cache.
     * @param callback The callback that is invoked for each removed entry
     */
    deRegisterOnDrop (callback : (a : string , b : any , c : number ) => any ) : void ;
    /**
     * This method explicitly removes an element from the cache.
     * @param id the id of the item to drop
     */
    drop (id : any ) : void ;
    /**
     * This method executes a callback function on each entry in the
     * cache. If the optional match predicate is specified,
     * the callback is executed only on those entries for which the predicate
     * returns `true`.
     * @param callback The callback to be invoked for each entry
     * @param opt_ctx An optional context object to be used as `this` within the callback
     * @param opt_matcher An optional match predicate to filter the entries on which the callback operates
     */
    forEach (callback : (a : string , b : any , c : number ) => any , opt_ctx ? : GlobalObject , opt_matcher ? : (a : string , b : any , c : number ) => boolean ) : void ;
    /**
     * This method retrieves an element from the cache.
     * @param id The ID of the data element to be retrieved.
     * @param opt_noUpdate An optional flag to indicate if the retrieved object should not be marked as 'most recently used' (`true`)
     */
    get (id : string , opt_noUpdate ? : boolean ) : any ;
    /**
     * This method registers a callback to be called each time an entry is dropped
     * from the cache.
     * @param callback The callback to be invoked for each removed entry
     */
    registerOnDrop (callback : (a : string , b : any , c : number ) => any ) : void ;
    /**
     * This method removes all data elements from the cache. The caller can provide
     * an  optional match predicate to narrow down the selection of data elements to
     * be removed.
     * @param opt_matcher An optional function that receives data entry IDs, data and sizes and returns `true` or `false` to remove or leave an entry in the cache, respectively
     */
    removeAll (opt_matcher ? : (a : string , b : any , c : number ) => boolean ) : void ;
  }
}
declare namespace H.util {
  /**
   * An interface for cancelable requests and actions.
   */
  interface ICancelable {
    /**
     * This method is used to cancel the current action.
     */
    cancel ( ) : void ;
  }
}
declare namespace H.util {
  /**
   * This is an interface for capturable elements.
   */
  interface ICapturable {
    /**
     * This method is used to capture the element view.
     * @param canvas The HTML Canvas element to draw the view of the capturable element.
     * @param pixelRatio The pixel ratio to use for over-sampling for high-resolution displays, the default is `window.devicePixelRatio`.
     * @param callback A callback function to call once the result of capture is ready.
     * @param opt_errback A callback function to call if error occurred during capture.
     */
    capture (canvas : HTMLCanvasElement , pixelRatio : number , callback : (a : HTMLCanvasElement ) => any , opt_errback ? : (a : string ) => any ) : void ;
  }
}
declare namespace H.util {
  /**
   * An interface definition for the generic character stream.
   */
  interface ICharStream {
  }
}
declare namespace H.util {
  /**
   * This class represents an list of ordered entries which dispatches events
   * when the list is modified.
   */
  class OList extends H.util.EventTarget {
    /**
     * This class represents an list of ordered entries which dispatches events
     * when the list is modified.
     */
    constructor ( ) ;
    /**
     * This method inserts an entry in the list. Optionally it can
     * place the new entry at the index provided by the caller.
     * @param entry The entry to insert
     * @param opt_idx The index where the new entry should be inserted; if omitted or greater then the current size of the list, the entry is added at the end of the list; a negative index is treated as being relative from the end of the list
     */
    add (entry : any , opt_idx ? : number ) : void ;
    /**
     * This method retrieves all the entries held in the list as an array.
     */
    asArray ( ) : any [] ;
    /**
     * This method removes all entries from the list.
     */
    flush ( ) : void ;
    /**
     * This method retrieves the entry at the specified index.
     * @param idx The index of the entry to get, a negative index is treated as relative from the end of the list
     */
    get (idx : number ) : any ;
    /**
     * This method retrieves the length of the list.
     */
    getLength ( ) : number ;
    /**
     * This method retrieves the index of the first object in this list that is
     * identical to the object supplied by the caller.
     * @param entry The entry for which to return the index
     */
    indexOf (entry ? : any ) : number ;
    /**
     * This method removes the first entry which is identical with the entry
     * provided by the caller.
     * @param entry An object representing the entry to remove
     */
    remove (entry ? : any ) : boolean ;
    /**
     * This method removes an entry at the index provided by the caller.
     * @param idx The index of the entry which should be removed; a negative index is treated as being relative from the end of the list
     */
    removeAt (idx : number ) : any ;
    /**
     * This method replaces an entry at the index provided by the caller.
     * @param idx The index of the entry which should be replaced; a negative index is treated as being relative from the end of the list
     * @param entry The entry with which to replace an existing entry
     */
    set (idx : number , entry : any ) : any ;
  }
}
declare namespace H.util.OList {
  /**
   * The class represents an event dispatched by `OList`.
   */
  class Event extends H.util.Event {
    /**
     * The class represents an event dispatched by `OList`.
     * @param list The `OList` instance emitting the event
     * @param type A value indicating the event type
     * @param idx The index of the affected list entry
     * @param added The value of the entry which was added or set
     * @param removed The value of the entry which was removed or replaced
     * @param moved The value of the entry which was moved
     */
    constructor (list : H.util.OList , type : string , idx : number , added : any , removed : any , moved : any ) ;
  }
}
declare namespace H.util {
  /**
   * This is a generic class representing a handle for any kind of asynchronous request.
   */
  abstract class Request {
    /**
     * This is a generic class representing a handle for any kind of asynchronous request.
     * @param opt_onprogress A callback to invoke every time the progress state of the request changes
     * @param opt_total The total number of processing steps to complete the request, the default is `1`
     */
    constructor (opt_onprogress ? : (a : H.util.Request ) => any , opt_total ? : number ) ;
    /**
     * This method retrieves the number of failed processing steps.
     */
    getFailed ( ) : number ;
    /**
     * This method retrieves the number of completed request processing steps.
     */
    getProcessed ( ) : number ;
    /**
     * This method retrieves the state of the request.
     */
    getState ( ) : H.util.Request.State ;
    /**
     * This method retrieves the number of processing steps to complete this request.
     */
    getTotal ( ) : number ;
  }
}
declare namespace H.util.Request {
  /**
   * This enumeration defines the supported request states.
   */
  enum State {
    CANCELLED = 3.0 ,
    COMPLETE = 2.0 ,
    ERROR = 4.0 ,
    PENDING = 0.0 ,
    PROCESSING = 1.0 ,
  }
}
declare namespace H.util.animation {
  /**
   * This interface defines an animatable object - the one which is capable of running an animation by
   * invoking a given animation callback frequently, e.g. on every frame.
   */
  interface IAnimatable {
  }
}
declare namespace H.util.animation.ease {
  /**
   * This function defines easing in and out with slope.
   * @param val A value in range `[0…1]` to translate
   */
  function EASE_IN_OUT_QUINT (val : number ) : number ;
  /**
   * This function defines quadratic easing in.
   * @param val A value in range `[0…1]` to translate
   */
  function EASE_IN_QUAD (val : number ) : number ;
  /**
   * This function defines easing out with circ function.
   * @param val A value in the range `[0…1]` to translate
   */
  function EASE_OUT_CIRC (val : number ) : number ;
  /**
   * This function defines quadratic easing out.
   * @param val A value in range `[0…1]` to translate
   */
  function EASE_OUT_QUAD (val : number ) : number ;
  /**
   * This function defines linear easing.
   * @param val A value in the range `[0…1]` to translate
   */
  function LINEAR (val : number ) : number ;
}
declare namespace H.util.flexiblePolyline {
  /**
   * This object describes a structure of the object accepted by the "encode" and return by the "decode" methods.
   */
  type Data = { polyline : number [] [] , precision ? : number , thirdDim ? : number , thirdDimPrecision ? : number } ;
  /**
   * Decodes the specified encoded [Flexible Polyline](https://github.com/heremaps/flexible-polyline) string.
   * @param encodedPolyline The encoded string.
   */
  function decode (encodedPolyline : string ) : H.util.flexiblePolyline.Data ;
  /**
   * Encodes the specified number sequence as a [Flexible Polyline](https://github.com/heremaps/flexible-polyline).
   */
  function encode (data : H.util.flexiblePolyline.Data ) : string ;
}
declare namespace H.util.kinetics {
  /**
   * This interface defines kinetic move parameters used by the map
   * for kinetic drag.
   */
  interface IKinetics {
    /**
     * This property hold the value indicating the duration of the kinetic move.
     */
    duration : number ;
    /**
     * This method defines an easing function that modifies the progress of an
     * animation. For example, it can modify the animation in a way it starts
     * rapidly and then slows down towards the end.
     *
     * It is similar to [CSS transition timing function](https://developer.mozilla.org/en-US/docs/Web/CSS/single-transition-timing-function).
     *
     * Several predefined implementations of this function can be found at {@link H.util.animation.ease} namespace.
     * @param progress A value from `[0…1]` range indicating the current progress
     */
    ease (progress : number ) : number ;
    /**
     * This property hods the value of the power multiplier. It is used to increase
     * the speed of the kinetic move. By default the map uses `1`.
     */
    power : number ;
  }
}
declare namespace H.util.wkt {
  /**
   * To create a geometry according to the given [Well Known Text (WKT)
   * ](https://en.wikipedia.org/wiki/Well-known_text).
   * It supports the following geometry types:
   * - POINT (A value of `EMPTY` is not supported and results into `null`)
   * - LINESTRING
   * - POLYGON
   * - MULTIPOINT
   * - MULTILINESTRING
   * - MULTIPOLYGON
   *
   * The designator Z and M are supported but only the latitude values (Z) are taken into account, whereas the
   * measure values (M) are discarded.
   */
  function toGeometry (wkt : string ) : H.geo.AbstractGeometry ;
}
declare namespace H.map.render.harp {
  /**
   * Instances of this class hold style configuration for rendering provider data using HARP
   * rendering engine.
   */
  class Style extends H.map.render.Style < any > {
    /**
     * Instances of this class hold style configuration for rendering provider data using HARP
     * rendering engine.
     *
     * @param config
     *    Either a URL to load the style from or an object describing the rendering style.
     *    The URL can be absolute or relative, but should end with `.json` extension.
     */
    constructor (config : string | object) ;

    load ( ) : void ;
  }
}
