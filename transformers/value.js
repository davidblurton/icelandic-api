function convert(row) {
  return {
    head_word: row[0],
    bil_id: row[1],
    word_class: row[2],
    section: row[3],
    word_form: row[4],
    grammar_tag: row[5]
  };
}

module.exports = function(data) {
  var row = data.split(';');
  return convert(row);
}
