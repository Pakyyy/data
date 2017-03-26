var _ = require('lodash');
var fs = require('fs');
var util = require('./util');

var data = util.getExercises();
var result = [];

cont('missing name', function (obj) { return !obj.name; });
cont('missing/wrong type', function (obj) { return !/isometric|isolation|compound/.test(obj.type); }, function (obj) { return obj.id + (obj.type ? '(' + obj.type + ')' : ''); });
cont('missing primary', function (obj) { return !obj.primary; });
cont('missing secondary', function (obj) { return !obj.secondary; });
cont('missing equipment', function (obj) { return !obj.equipment; });
cont('missing steps', function (obj) { return !obj.steps; });

// output
_.each(result, function (data) {
    console.log('---');
    console.log(data.name);
    console.log(data.list.join(','));
});

function cont(name, fnFilter, fnMap) {
    var list = _.chain(data).filter(fnFilter).map(fnMap || function (data) {
        return data.id;
    }).value();

    if (!list.length) return;
    result.push({
        name: name,
        list: list
    });
}
