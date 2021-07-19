import React from "react"
import { graphql } from "gatsby"

import RecipesList from "../components/RecipesList"
import Layout from "../components/Layout"

const TagTemplate = props => {
  console.log(props)
  const recipes = props.data.allContentfulRecipe.nodes
  return (
    <Layout>
      <main className="page">
        <h2>{props.pageContext.tag}</h2>
        <div className="tag-recipes">
          <RecipesList recipes={recipes} />
        </div>
      </main>
    </Layout>
  )
}

// page query
export const query = graphql`
  query getRecipeByTag($tag: String) {
    allContentfulRecipe(
      sort: { fields: title, order: ASC }
      filter: { content: { tags: { eq: $tag } } }
    ) {
      nodes {
        id
        title
        prepTime
        cookTime
        image {
          gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
        }
      }
    }
  }
`

export default TagTemplate
