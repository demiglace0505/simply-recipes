import React from "react"
import { graphql, Link } from "gatsby"
import slugify from "slugify"

import SEO from "../components/SEO"
import Layout from "../components/Layout"
import setupTags from "../utils/setupTags"

const Tags = ({ data }) => {
  const tags = setupTags(data.allContentfulRecipe.nodes)

  return (
    <Layout>
      <SEO title="Tags" />
      <main className="page">
        <section className="tags-page">
          {tags.map((t, index) => {
            const [text, value] = t
            const slug = slugify(text, { lower: true })
            return (
              <Link to={`/tags/${slug}`} key={index} className="tag">
                <h5>{text}</h5>
                <p>{value} recipe</p>
              </Link>
            )
          })}
        </section>
      </main>
    </Layout>
  )
}

export const query = graphql`
  {
    allContentfulRecipe {
      nodes {
        content {
          tags
        }
      }
    }
  }
`

export default Tags
