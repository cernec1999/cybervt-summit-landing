import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `CyberVT Summit 2022`,
    siteUrl: `https://summit.cybervt.org`
  },
  plugins: ["gatsby-plugin-mdx", "gatsby-plugin-react-helmet", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  }, {
    resolve: '@chakra-ui/gatsby-plugin',
    options: {
      resetCSS: true,
      isUsingColorMode: true
    }
  }]
};

export default config;
