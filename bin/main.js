#!/usr/bin/env node

'use strict';

var _ = require('lodash');
var colors = require('colors');
var util = require('util');
var program = require('commander');

function list(val) {
  return val.split(',');
}

//定义参数,以及参数内容的描述  
program
    .version('0.0.1')  
    .usage('[options] [value ...]')
    .option('-l, --list <items>','倍数数组',list,[1,3,8,24,50,100]) 
    .option('-b, --base <n>','下注的个数',parseInt,5) 
    .option('-x, --max <n>', '下注的一注的最大价格',parseFloat,5)  
    .option('-n, --min <n>', '下注的一注的最小价格',parseFloat,0.1)  
    .option('-ml, --length <n>', '输出字符的最大长度数', parseInt, 100);

program.on('--help', function(){
  console.log('  例如:');
  console.log('');
  console.log('    $ caipiao --help');
  console.log('    $ caipiao -h');
  console.log('    $ caipiao -x 3.0');
  console.log('    $ caipiao -n 0.2');
  console.log('    $ caipiao --length 1,3,8,24,50,100');
  console.log('');
});

program.parse(process.argv);

var level = program.list;
var base = program.base;
var max = program.max;
var min = program.min;
var max_length = program.length;
for(var i = min;i < max;i += 0.1){
  var a = parseFloat(i).toFixed(1);
  console.log(util.format('基数为：%s'.green,a));

  //star line
  
  var star_line = _.fill(Array(max_length), '*');
  star_line = star_line.join('');
  console.log(star_line.yellow);

  //per String
  var a_level = _.map(level,function(b){
    b = parseFloat(b);
    var tmp = b * a;
    return parseFloat(tmp).toFixed(2);
  });
  var per_string = '';
  per_string += a_level.join('#');
  per_string += ' $$$->Multiple';
  var spaces_num = max_length - per_string.length - 1;
  per_string += _.fill(Array(spaces_num),' ').join('');
  per_string += '+';
  console.log(per_string.cyan);

  //money String
  var money_string = '';
  var a_base_level = _.map(a_level,function(c){
    c = parseFloat(c).toFixed(1);
    var tmp = c * base;
    return parseFloat(tmp).toFixed(2);
  });

  var total = 0;
  _.forEach(a_base_level,function(d){
    d = parseFloat(d);
    total += d;
  });
  total = parseFloat(total).toFixed(2);

  money_string += a_base_level.join('#') + ' $$$->Total:' + total;
  spaces_num = max_length - money_string.length - 1;
  money_string += _.fill(Array(spaces_num),' ').join('');
  money_string += '+';
  console.log(money_string.blue);
  
  //star line
  console.log(star_line.yellow);

}