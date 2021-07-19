// helper function that returns arrays of each tag and their count
// [
//  ["beef", 4]
//  ["dinner", 2]
//  ...
// ]

const setupTags = recipes => {
  console.log("setupTags", recipes)
  const allTags = {}

  recipes.forEach(r => {
    r.content.tags.forEach(tag => {
      if (allTags[tag]) {
        //if allTags has certain tag, add 1
        allTags[tag] = allTags[tag] + 1
      } else {
        allTags[tag] = 1
      }
    })
  })
  // set up each item as an array, then sort alphabetically
  const newTags = Object.entries(allTags).sort((a, b) => {
    const [firstTag] = a // get the first item from the array
    const [secondTag] = b // get the next item from array
    return firstTag.localeCompare(secondTag)
  })
  console.log(newTags)

  return newTags
}

export default setupTags
