/**
 * GenericSync
 * ------------
 * 
 * GenericSync combines multiple types of event handling 
 * (e.g. touch, trackpad scrolling) into one standardized 
 * interface for inclusion in widgets. TouchSync and ScrollSync
 * are enabled by default.
 *
 * In this example, we create a GenericSync that listens to
 * TouchSync, ScrollSync, and MouseSync and displays the data
 * it receives to the screen.
 *
 */
define(function(require, exports, module) {
    var Engine      = require("famous/core/Engine");
    var GenericSync = require("famous/inputs/GenericSync");
    var MouseSync   = require("famous/inputs/MouseSync");
    var TouchSync   = require("famous/inputs/TouchSync");
    var ScrollSync  = require("famous/inputs/ScrollSync");
    var Surface     = require("famous/core/Surface");

    var mainContext = Engine.createContext();

    var start = 0;
    var update = 0;
    var end = 0;
    var delta = [0,0];
    var position = [0,0];

    GenericSync.register({
        mouse : MouseSync,
        touch : TouchSync,
        scroll : ScrollSync
    });

    var genericSync = new GenericSync(['mouse', 'touch', 'scroll']);

    Engine.pipe(genericSync);

    var contentTemplate = function() {
        return "<div>Start Count: " + start + "</div>" +
        "<div>End Count: " + end + "</div>" + 
        "<div>Update Count: " + update + "</div>" +
        "<div>Delta: " + delta + "</div>" +
        "<div>Distance from start: " + position + "</div>";
    };

    var surface = new Surface({
        size: [undefined, undefined],
        classes: ['grey-bg'],
        content: contentTemplate()
    });

    genericSync.on("start", function() {
        start++;
        position = [0,0];
        surface.setContent(contentTemplate());
    });

    genericSync.on("update", function(data) {
        update++;
        position = data.position;
        delta = data.delta;
        surface.setContent(contentTemplate());
    });

    genericSync.on("end", function() {
        end++;
        surface.setContent(contentTemplate());
    });

    mainContext.add(surface);
});
