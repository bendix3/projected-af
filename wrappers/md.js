import React from 'react'
import { Link } from 'react-router'
import Helmet from "react-helmet"
import { config } from 'config'

module.exports = React.createClass({
  propTypes () {
    return {
      router: React.PropTypes.object,
    }
  },
  render () {
    const post = this.props.route.page.data

    console.log(this.props.route.pages)

    const articles = this.props.route.pages

    let keywords = post.keywords

    console.log('keywords: ', keywords)

    let keywordString = []

    let bodyHighlighted = post.body

    let globalKeywords = []

    articles.forEach(function(article) {
      const keywords = article.data.keywords

      if (keywords) {
        keywords.forEach(function(item, index) {

          const regex = new RegExp(item, "g")

          console.log(article.path)

          bodyHighlighted = bodyHighlighted.replace(regex, '<a href="' + article.path + '">' + item + '</a>')
        })
      }
    })

    if (keywords) {
      keywords.forEach(function(item, index) {
        const listItem = (
          <div key={index}>{item}</div>
        )
        keywordString.push(listItem)
      })
    }

    console.log('search', bodyHighlighted)

    return (
      <div className="markdown">
        <Helmet
          title={`${config.siteTitle} | ${post.title}`}
        />
        <h1>{post.title}</h1>
        {keywordString}

        <div dangerouslySetInnerHTML={{ __html: bodyHighlighted }} />
      </div>
    )
  },
})

function addBendix(somebody) {
  return 'bendix' + somebody
}