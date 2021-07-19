### Page Query

Page Query can be done without the use of Static Query hooks.

Every time we created a page, Gatsby provides a **props** object by default. Once we set up a graphql query and assign it to a variable, the data will be available in the data property of the props object. This is all done during the build time by gatsby.

``` JSX
const Testing = props => {
  console.log(props.data)
  ...
}
 
export const data = graphql`
  ...
`
```

### Install SOURCE-FILESYSTEM Plugin

This Gatsby plugin is used to interact with the file system. This plugin is useful for sourcing data into our Gatsby application from the local filesystem. In this project, the plugin is already pre-installed as a dependency of the gatsby starter hello-world.

The plugin is imported into the gatsby-config.js file as

``` JSX
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
```

The **name** property stands for the name of the resource that we are importing. The **path** property is the absolute path towards the directory of our resource. The above means that we will be able to access resources in the /src/assets/images directory. Multiple instances of the gatsby-source-filesystem object can be included in the gatsby-config.js file.
<br>
### allFile Field

Once we have finished setting up the gatsby-source-filesystem plugin, we will now have access to field **file and allFile** in our graphQL explorer. For example, we can query for the information of the images in the previous section by doing a graphQL query.

```
{
  allFile {
    nodes {
      relativePath
      name
    }
  }
}
```

### Query Arguments

Query arguments allow us to be more specific about the data that we want to retrieve. The following arguments sorts in ascending order according to the size of file size, and then limits the result to 3 instances.

```
{
  allFile(sort: {fields: size, order: ASC}, limit: 3) {
    totalCount
    nodes {
      name
      size
    }
  }
}
```

### file Field

When working with file, we are only working with one specific node as compared to allFile. The following example returns the name of the file with relative path recipes/recipe-1.jpeg

```
{
  file(relativePath: {eq: "recipes/recipe-1.jpeg"}) {
    name
  }
}
```

### sourceInstanceName Argument

The sourceInstanceName argument looks for the **"name"** specified when adding the plugin gatsby-source-filesystem. In this case, we are querying for the total number of items and the name of each item that is inside the "**images**" name.
<br>
```
{
  allFile(filter: {sourceInstanceName: {eq: "images"}}) {
    totalCount
    nodes {
      name
    }
  }
}
```

### gatsbyImageData Field
<br>
This object provides all the data that the GatsbyImage is looking for. The only difference between StaticImage and GatsbyImage is how data is passed. For GatsbyImage we will retrieve those data through the graphQL query. Basically, for StaticImage we hardcode the properties, but in GatsbyImage, we can select from graphQL explorer. The following query returns a fixed layout image with blur placeholder and all images will be transformed to grayscale. Notice that we filtered out svg images because childImageSharp cannot be used on svg images.

```
query MyQuery {
  allFile(filter: {extension: {ne: "svg"}}) {
    nodes {
      name
      childImageSharp {
        gatsbyImageData(
          layout: FIXED
          placeholder: BLURRED
          transformOptions: {grayscale: true}
        )
      }
    }
  }
}
```

### Render Gallery

To actually render the GatsbyImage, it needs an *image* property wherein we pass the path to *gatsbyImageData.* It is nice to know that classes applied to GatsbyImage will be applied to all children that is rendered by that GatsbyImage.

```
const Gallery = props => {
  const data = useStaticQuery(query)
  console.log(data)
  const nodes = data.allFile.nodes
  return (
    <Wrapper>
      {nodes.map((image, index) => {
        console.log(image)
        return (
          <article key={index} className="item">
            <GatsbyImage
              image={image.childImageSharp.gatsbyImageData}
              alt={image.name}
              className="gallery-img"
            />
            <p>{image.name}</p>
          </article>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;

  .item {
    margin-right: 1rem;
  }

  .gallery-img {
    border-radius: 1rem;
  }
`

const query = graphql`
  {
    allFile(filter: { extension: { ne: "svg" } }) {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(
            layout: FIXED
            placeholder: BLURRED
            transformOptions: { grayscale: true }
            width: 200
            height: 200
          )
        }
      }
    }
  }
`

export default Gallery
```

### getImage Helper Function

The [getImage](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/) helper function is an optional helper that takes a file and returns the path to gatsbyImageData which can then be passed to the GatsbyImage component as the image property. This is very useful because this uses conditional rendering which avoids running into a null when looking up the object.

```
const Gallery = props => {
  const data = useStaticQuery(query)
  console.log(data)
  const nodes = data.allFile.nodes
  return (
    <Wrapper>
      {nodes.map((image, index) => {
        console.log(image)
        const pathToImage = getImage(image)
        return (
          <article key={index} className="item">
            <GatsbyImage
              image={pathToImage}
              alt={image.name}
              className="gallery-img"
            />
            <p>{image.name}</p>
          </article>
        )
      })}
    </Wrapper>
  )
}
```

### Connect Gatsby and Contentful

To retrieve data from Contentful, we need to use the plugin [gatsby-source-contentful](https://www.gatsbyjs.com/plugins/gatsby-source-contentful/?=contentful). The spaceId value and content delivery API can be retrieved from Contentful Settings->API Keys. Once the plugin is installed, the API data will now be exposed in GraphQL explorer.

### ENV Variables

We can set up both development and production builds by creating files .env.development and .env.production. The dotenv package is already preinstalled with gatsby.

### allContentfulRecipe Field

All the recipes from contentful can be queried using the graphQL query allContentfulRecipes. To render a GatsbyImage, we also need to query for the **gatsbyImageData** field inside **image**
<br>
```
query MyQuery {
  allContentfulRecipe {
    nodes {
      cookTime
      prepTime
      title
      id
      content {
        tags
      }
      image {
        gatsbyImageData
      }
    }
  }
}
```

### setupTags Helper Function

We created a helper function setupTags that takes in the entire recipes node from AllRecipes and then iterates over it to provide a list of tags, and the count of occurence. Its output is an array of arrays, wherein the first value is the tag name and the second value of the array is the number of occurences for that particular tag.
<br>
```
[
  ["beef", 2],
  ["dinner", 4],
  ...
]
```

### Recipe Template Page

We programmatically generate pages for reach recipe. There are two approaches for this, first is by using gatsby [File System Route API](https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/) and the other is setting up routes in gatsby-node. We created a **{ContentfulRecipe.title}.js** file, which will serve as  the template for individual recipes. The filename is derived from the field **allContentfulRecipe.** This creates a page endpoint for all of our contentful recipe items. The **title** value will be used by gatsby to setup the slug. Gatsby will also inject the page template with properties via props.
<br>
```
const RecipeTemplate = props => {
  console.log(props)
  return (
    <div>
      <h4>recipe template</h4>
    </div>
  )
}

export default RecipeTemplate
```

### Slugify

We need to slugify the title of our recipes since we use the title property as the Link destination. We installed the slugify plugin for this.
<br>
```
const RecipesList = ({ recipes = [] }) => {
  //recipes is an empty array if note provided
  return (
    <div className="recipes-list">
      {recipes.map(r => {
        const imagePath = getImage(r.image)
        const slug = slugify(r.title, { lower: true })

        return (
          <Link to={slug} className="recipe" key={r.id}>
            <GatsbyImage image={imagePath} />
            <h5>{r.title}</h5>
            <p>
              Prep : {r.prepTime}min | Cook : {r.cookTime}min
            </p>
          </Link>
        )
      })}
    </div>
  )
}
```

### Query Variables

To make our queries dynamic, we can make use of Query Variables in GraphQL. The query variables will be available in the page props pageContext object.
<br>
```
export const query = graphql`
  query getSingleRecipe($title: String) {
    contentfulRecipe(title: { eq: $title }) {
      title
      cookTime
      content {
        ingredients
        instructions
        tags
        tools
      }
      description {
        description
      }
      prepTime
      servings
      image {
        gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
      }
    }
  }
`
```

**The important thing to remember is that whatever we pased into the title of our file will be available as a variable. In the case of {ContentfulRecipe.title}.js, title is available as a variable for us, hence why we used title as the variable name.**

### Gatsby-Node.js Setup

Another way of setting up pages programatically is by means of using gatsby-node.js. gatsby-node.js is run during the build process, and can be used to creat pages dynamically and add data into GraphQL. Using the function **createPages**, we can create pages dynamically.

<br>
```
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query getRecipes {
      allContentfulRecipe {
        nodes {
          content {
            tags
          }
        }
      }
    }
  `)

  console.log("#######")
  console.log(result)
  console.log("#######")

  // iterate over each node (recipe), then drill in to each recipe to access tag
  result.data.allContentfulRecipe.nodes.forEach(recipe => {
    // for each tag, create a page
    recipe.content.tags.forEach(t => {
      createPage({
        path: `/${t}`,
        component: path.resolve("src/templates/tag-template.js"),
        // pass the tag variable
        context: {
          tag: t,
        },
      })
    })
  })
}
```

The tag variable can be accessed in the tag-template.js's props via the **pageContext** object.

### Fonts

Preloading fonts can be done by making use of gatsby-plugin-webfont