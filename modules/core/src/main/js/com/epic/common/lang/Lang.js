goog.provide('com.epic.common.lang.Lang');

goog.require('com.epic.common.core.m.AssetLib');


/**
 * @class
 */
var Lang = {};

/**
 * Get's a phrase based on it's ID. Caches xml parsing on first run
 * @param phraseId {String}
 * @return {String}
 */
Lang.getPhrase = function (phraseId) {
    var phrase = "!MISSING PHRASE!";

    // Check for cached phrases
    if (!Lang.parsed) {
        var xmlManifest = AssetLib.getManifest(Lang.LANGUAGE_MANIFEST);
        var xml = xmlManifest.xml[Lang.code];

        $(xml).find('phrase').each(function (index) {
            var id = $(this).attr('id');
            var text = $(this).attr('text');
            Lang.phrases[id] = text;
        });

        Lang.parsed = true;
    }

    phrase = Lang.phrases[phraseId];

    for (var i = 1; i < arguments.length; i++) {
        phrase = phrase.replace("%" + i, arguments[i]);
    }

    return phrase;
};

/**
 * Cached list of phrases
 * @type {{}}
 */
Lang.phrases = {};

Lang.parsed = false;

/**
 * Language code to use. Defaults to en
 * @type {string}
 * @static
 */
Lang.code = "en";

Lang.LANGUAGE_MANIFEST = "LanguageManifest";