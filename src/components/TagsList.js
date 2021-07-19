import React from "react"
import { Link } from "gatsby"
import slugify from "slugify"

import setupTags from "../utils/setupTags"

const TagsList = ({ recipes }) => {
  const tags = setupTags(recipes)
  // console.log("TagsList", tags)
  return (
    <div className="tag-container">
      <h4>recipes</h4>
      <div className="tags-list">
        {tags.map((t, index) => {
          const [text, value] = t
          const slug = slugify(text, { lower: true })
          return (
            <Link to={`/tags/${slug}`} key={index}>
              {text} ({value})
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default TagsList
