import React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import AllRecipes from "../components/AllRecipes"
import Layout from "../components/Layout"

const index = () => {
  return (
    <Layout>
      <main className="page">
        <header className="hero">
          <StaticImage
            src="../assets/images/main.jpeg"
            alt="Eggs"
            className="hero-img"
            placeholder="blurred"
            layout="fullWidth"
          />
          <div className="hero-container">
            <div className="hero-text">
              <h1>Simply Recipes</h1>
              <h4>Recipes as easy as it gets</h4>
            </div>
          </div>
        </header>
        <AllRecipes />
      </main>
    </Layout>
  )
}

export default index
