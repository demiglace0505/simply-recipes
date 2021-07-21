import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import slugify from "slugify"

const RecipesList = ({ recipes = [] }) => {
  //recipes is an empty array if note provided
  return (
    <div className="recipes-list">
      {recipes.map(r => {
        const imagePath = getImage(r.image)
        const slug = slugify(r.title, { lower: true })
        console.log(slug)

        return (
          <Link to={`/${slug}`} className="recipe" key={r.id}>
            <GatsbyImage image={imagePath} />
            <h5>{r.title}</h5>
            <p>
              Prep : {r.prepTime}min | Cook : {r.cookTime}min
            </p>
          </Link>
        )
      })}
    </div>
  )
}

export default RecipesList
