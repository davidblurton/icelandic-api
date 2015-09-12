const subjectRegex = /{\*SUBJ \[(.*?) \] }/g
const firstNounMatch = /\[(NP[^\[]*) ]/
const verbRegex = /\[(VP[^\[]*) ]/
const objectRegex = /{\*OBJ \[(.*?) \] }/
const compRegex = /{\*COMP \[(.*?) \] }/

const headwordRegex = /\((\w.*)\)/

let structure = function(parsed) {
  let subjectMatch = subjectRegex.exec(parsed) || firstNounMatch.exec(parsed)
  let verbMatch = verbRegex.exec(parsed)
  let objectMatch = objectRegex.exec(parsed) || compRegex.exec(parsed)

  let subject = subjectMatch && subjectMatch[1]
  let verb = verbMatch && verbMatch[1]
  let object = objectMatch && objectMatch[1]

  // If the parsed doesn't identify an object, but idetifies 2 subjects, the second subject is probably the object
  let secondSubjectMatch = subjectRegex.exec(parsed)

  if (!object && secondSubjectMatch) {
    object = secondSubjectMatch[1]
  }

  return {subject, verb, object}
}

let wordFromPart = function(part) {
  return part.split(' ')[1]
}

let headwordFromPart = function(part) {
  let headwordMatch = headwordRegex.exec(part)
  return headwordMatch && headwordMatch[1]
}

export default {structure, wordFromPart, headwordFromPart}
