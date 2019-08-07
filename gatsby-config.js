module.exports = {
  siteMetadata: {
    title: `swyx dot io`,
    name: `swyx`,
    siteUrl: `https://swyx.io`,
    description: `Personal site for shawn swyx wang`,
    hero: {
      heading: `swyx's writing`,
      maxWidth: 652,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/swyx`,
      },
      {
        name: `github`,
        url: `https://github.com/sw-yx/swyxdotio`,
      },
    ],
    keywords: 'gatsby, theme',
    language: 'en',
    feed_url: 'https://swyx.io/rss.xml',
    image_url: 'https://swyx.io/avatar.jpg',
  },
  plugins: [
    {
      resolve: '@daniel.husar/gatsby-theme-spring',
      options: {
        paginationOffset: 5,
        author: 'swyx',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `swyx dot io`,
        short_name: `swyx`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `favicon.png`,
      },
    },
  ],
}
