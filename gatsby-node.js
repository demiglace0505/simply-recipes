const path = require("path")
const slugify = require("slugify")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query getRecipes {
      allContentfulRecipe {
        nodes {
          content {
            tags
          }
        }
      }
    }
  `)

  // console.log("#######")
  // console.log(result)
  // console.log("#######")

  // iterate over each node (recipe), then drill in to each recipe to access tag
  result.data.allContentfulRecipe.nodes.forEach(recipe => {
    // for each tag, create a page
    recipe.content.tags.forEach(t => {
      const tagSlug = slugify(t, { lower: true })
      createPage({
        path: `/tags/${tagSlug}`,
        component: path.resolve("src/templates/tag-template.js"),
        // pass the tag variable
        context: {
          tag: t,
        },
      })
    })
  })
}
