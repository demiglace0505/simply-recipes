import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Link, graphql } from "gatsby"

import SEO from "../components/SEO"
import Layout from "../components/Layout"
import RecipesList from "../components/RecipesList"

const About = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <SEO title="About" />
      <main className="page">
        <section className="about-page">
          <article>
            <h2>Recipes are simply, an art.</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
              doloribus reprehenderit modi atque eligendi vel dolor repudiandae,
              inventore expedita debitis porro natus consequatur consequuntur
              temporibus sequi accusamus adipisci asperiores suscipit.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
              ad. Quo provident accusamus molestias architecto.
            </p>
            <Link to="/contact" className="btn">
              contact
            </Link>
          </article>
          <StaticImage
            src="../assets/images/about.jpeg"
            alt="Person Pouring Salt in Bowl"
            className="about-img"
            placeholder="blurred"
          />
        </section>
        <section className="featured-recipes">
          <h5>Look at this Awesomesauce!</h5>
          <RecipesList recipes={data.allContentfulRecipe.nodes} />
        </section>
      </main>
    </Layout>
  )
}

export const query = graphql`
  {
    allContentfulRecipe(
      sort: { fields: title, order: ASC }
      filter: { featured: { eq: true } }
    ) {
      nodes {
        cookTime
        prepTime
        title
        id
        image {
          gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
    }
  }
`

export default About
