/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  // metadata
  siteMetadata: {
    title: "Simply Recipes",
    description: "Nice and simple recipes available to you blazing fast",
    author: "demiglace0505",
    person: {
      name: "john",
      age: 32,
    },
    simpleData: ["item1", "item2"],
    complexData: [
      {
        name: "john",
        age: 32,
      },
      {
        name: "susan",
        age: 21,
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`, // Needed for dynamic images
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `8595yhejoh3m`,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.CONTENTFUL_API_KEY,
      },
    },
    // {
    //   resolve: `gatsby-plugin-webfonts`,
    //   options: {
    //     fonts: {
    //       google: [
    //         {
    //           family: "Monsterrat",
    //           variants: ["400"],
    //         },
    //         {
    //           family: "Inconsolata",
    //           variants: ["400", "500", "600", "700"],
    //         },
    //       ],
    //     },
    //   },
    // },
  ],
}
