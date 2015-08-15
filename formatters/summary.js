import _ from 'lodash';
import translate from '../translate/translate'

export default (results, query, lang) => {
  let formattedResults = _.mapValues(results, x => `${query} ${x.wordForm}`)

  return {
    query: query,
    results: lang ? translate(formattedResults, lang) : formattedResults,
  }
}
