//  Underscore.inflection.js
//  Pau Ramon Revilla
//  Based on the repo of Jeremy Ruppel
//  Underscore.inflection is freely distributable under the MIT license.
//  Portions of Underscore.inflection are inspired or borrowed from ActiveSupport
//  Version 1.1.0
(function (_, undefined) {

  var plurals = []
    , singulars = []
    , uncountables = []
    , Inflector = {};

  function gsub(word, rule, replacement) {
    var pattern = new RegExp(rule.source || rule, 'gi');
    return pattern.test(word) ? word.replace(pattern, replacement) : null;
  }

  function plural(rule, replacement) {
    plurals.unshift([rule, replacement]);
  }

  function singular(rule, replacement) {
    singulars.unshift([rule, replacement]);
  }

  function irregular(s, p) {
    plural('\\b' + s + '\\b', p);
    singular('\\b' + p + '\\b', s);
  }

  function uncountable(word) {
    uncountables.unshift(word);
  }

  function resetInflections() {
    plural(/$/,                         's');
    plural(/s$/,                        's');
    plural(/(ax|test)is$/,              '$1es');
    plural(/(octop|vir)us$/,            '$1i');
    plural(/(octop|vir)i$/,             '$1i');
    plural(/(alias|status)$/,           '$1es');
    plural(/(bu)s$/,                    '$1ses');
    plural(/(buffal|tomat)o$/,          '$1oes');
    plural(/([ti])um$/,                 '$1a');
    plural(/([ti])a$/,                  '$1a');
    plural(/sis$/,                      'ses');
    plural(/(?:([^f])fe|([lr])f)$/,     '$1$2ves');
    plural(/(hive)$/,                   '$1s');
    plural(/([^aeiouy]|qu)y$/,          '$1ies');
    plural(/(x|ch|ss|sh)$/,             '$1es');
    plural(/(matr|vert|ind)(?:ix|ex)$/, '$1ices');
    plural(/([m|l])ouse$/,              '$1ice');
    plural(/([m|l])ice$/,               '$1ice');
    plural(/^(ox)$/,                    '$1en');
    plural(/^(oxen)$/,                  '$1');
    plural(/(quiz)$/,                   '$1zes');

    singular(/s$/,                                                            '');
    singular(/(n)ews$/,                                                       '$1ews');
    singular(/([ti])a$/,                                                      '$1um');
    singular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/, '$1$2sis');
    singular(/(^analy)ses$/,                                                  '$1sis');
    singular(/([^f])ves$/,                                                    '$1fe');
    singular(/(hive)s$/,                                                      '$1');
    singular(/(tive)s$/,                                                      '$1');
    singular(/([lr])ves$/,                                                    '$1f');
    singular(/([^aeiouy]|qu)ies$/,                                            '$1y');
    singular(/(s)eries$/,                                                     '$1eries');
    singular(/(m)ovies$/,                                                     '$1ovie');
    singular(/(x|ch|ss|sh)es$/,                                               '$1');
    singular(/([m|l])ice$/,                                                   '$1ouse');
    singular(/(bus)es$/,                                                      '$1');
    singular(/(o)es$/,                                                        '$1');
    singular(/(shoe)s$/,                                                      '$1');
    singular(/(cris|ax|test)es$/,                                             '$1is');
    singular(/(octop|vir)i$/,                                                 '$1us');
    singular(/(alias|status)es$/,                                             '$1');
    singular(/^(ox)en/,                                                       '$1');
    singular(/(vert|ind)ices$/,                                               '$1ex');
    singular(/(matr)ices$/,                                                   '$1ix');
    singular(/(quiz)zes$/,                                                    '$1');
    singular(/(database)s$/,                                                  '$1');

    irregular('person', 'people');
    irregular('man',    'men');
    irregular('child',  'children');
    irregular('sex',    'sexes');
    irregular('move',   'moves');
    irregular('cow',    'kine');

    _('equipment information rice money species series fish sheep jeans'.split(/\s+/)).each(uncountable);

    return Inflector;
  }

  Inflector.pluralize = _.memoize(function (word, count, includeNumber) {
    var result;

    if (typeof count !== 'undefined') {
      result = (count === 1) ? Inflector.singularize(word) : Inflector.pluralize(word);
      result = (includeNumber) ? [count, result].join(' ') : result;
    } else {
      if (_(uncountables).include(word)) {
        return word;
      }

      result = word;

      _.detect(plurals, function (rule) {
        var r = gsub(word, rule[0], rule[1]);
        return r ? (result = r) : false;
      });
    }

    return result;
  });

  Inflector.singularize = _.memoize(function (word) {
    if (_(uncountables).include(word)) {
      return word;
    }

    var result = word;

    _.detect(singulars, function (rule) {
      var r = gsub(word, rule[0], rule[1]);
      return r ? (result = r) : false;
    });

    return result;
  });

  _.mixin(resetInflections());
}(_));
