function isNoun(wordClass) {
  return ['hk', 'kk', 'kvk'].includes(wordClass)
}

const featuresMap = {
  // Nouns
  'hk': ['grammarCase', 'number', 'article'],
  'kk': ['grammarCase', 'number', 'article'],
  'kvk': ['grammarCase', 'number', 'article'],
   // Numeral
  'to': ['grammarCase', 'gender', 'number'],
  // Pronoun
  'pfn': ['grammarCase', 'number'],
  // Adjective
  'lo': ['grammarCase', 'definite', 'gender', 'number'],
  // Verb
  'so': ['person', 'number', 'tense', 'voice', 'mood', 'impersonal', 'pronoun'],
}

const parser = {
  grammarCase(tag) {
    return ['NF', 'ÞF', 'ÞGF', 'EF'].filter(x => tag.includes(x))[0]
  },

  gender(tag) {
    return ['KK', 'KVK', 'HK'].filter(x => tag.includes(x))[0]
  },

  number(tag) {
    return ['ET', 'FT'].filter(x => tag.includes(x))[0]
  },

  definite(tag) {
    return ['ESB', 'EVB', 'FSB', 'FVB'].filter(x => tag.includes(x))[0]
  },

  article(tag) {
    if (tag.endsWith('gr')) {
      return 'gr'
    } else {
      return ''
    }
  },

  person(tag) {
    return ['1P', '2P', '3P'].filter(x => tag.includes(x))[0]
  },

  tense(tag) {
    return ['NT', 'ÞT'].filter(x => tag.includes(x))[0]
  },

  voice(tag) {
    return ['GM', 'MM', 'OP'].filter(x => tag.includes(x))[0]
  },

  mood(tag) {
    return ['FH', 'VH'].filter(x => tag.includes(x))[0]
  },

  impersonal(tag) {
    return ['OP'].filter(x => tag.includes(x))[0]
  },

  pronoun(tag) {
    return ['FN'].filter(x => tag.includes(x))[0]
  },
}

export function toString(wordClass, tags) {
  if (isNoun(wordClass)) {
    let {grammarCase, number, article} = tags
    return grammarCase + number + article
  }

  if (wordClass === 'to') {
    let {gender, grammarCase, number} = tags
    return `${gender}_${grammarCase}${number}`
  }

  if (wordClass === 'pfn') {
    let {grammarCase, number} = tags
    return grammarCase + number
  }

  if (wordClass === 'lo') {
    let {definite, gender, grammarCase, number} = tags
    return `${definite}-${gender}-${grammarCase}${number}`
  }
}

export function parse(wordClass, grammarTag) {
  let features = featuresMap[wordClass]

  if (!features) {
    throw new Error(`Unsupported word class: ${wordClass}`)
  }

  var result = {}

  features.forEach(x => {
    result[x] = parser[x].call(null, grammarTag)
  })

  return result
}
