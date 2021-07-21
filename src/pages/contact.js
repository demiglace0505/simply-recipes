import React from "react"
import { Link, graphql } from "gatsby"

import SEO from "../components/SEO"
import RecipesList from "../components/RecipesList"
import Layout from "../components/Layout"

const Contact = ({ data }) => {
  const recipes = data.allContentfulRecipe.nodes
  return (
    <Layout>
      <SEO title="Contact" />
      <main className="page">
        <section className="contact-page">
          <article className="contact-info">
            <h3>Want To Get In Touch?</h3>
            <p>
              I'm baby disrupt godard swag, wayfarers taxidermy coloring book
              cornhole street art flannel kickstarter selvage.
            </p>
            <p>
              effiyeh tacos hoodie master cleanse pok pok hexagon pabst
              gastropub bicycle rights. Hashtag copper mug cornhole glossier,
              craft beer bicycle rights synth.
            </p>
            <p>
              Meggings gentrify offal raclette godard raw denim irony chambray
              mustache migas.
            </p>
          </article>
          <article>
            <form
              action=""
              className="form contact-form"
              action="https://formspree.io/f/xjvjejoq"
              method="POST"
            >
              <div className="form-row">
                <label htmlFor="name">Your name</label>
                <input type="text" name="name" id="name" />
              </div>
              <div className="form-row">
                <label htmlFor="email">Your email</label>
                <input type="text" name="email" id="email" />
              </div>
              <div className="form-row">
                <label htmlFor="message">Your message</label>
                <textarea
                  name="message"
                  id="message"
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
              <button type="submit" class="btn block">
                Submit
              </button>
            </form>
          </article>
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

export default Contact
