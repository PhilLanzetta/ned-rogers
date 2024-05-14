import * as React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import useWindowSize from '../utils/useWindowSize'
import ProjectTile from '../components/projectTile'

const IndexPage = ({ data }) => {
  const allNodes = data.contentfulHomePage.tiles
  const leftSideNodes = data.contentfulHomePage.tiles.filter((node, index) => {
    if (index === 0 || index % 2 === 0) {
      return node
    }
  })
  const rightSideNodes = data.contentfulHomePage.tiles.filter((node, index) => {
    if (index % 2 === 1) {
      return node
    }
  })
  const { width } = useWindowSize()
  const isMobile = width < 900

  return (
    <Layout>
      <div className='tile-page'>
        {isMobile ? (
          <div className='project-tile-inner-mobile'>
            {allNodes.map((node) => (
              <ProjectTile key={node.id} tile={node} mobile></ProjectTile>
            ))}
          </div>
        ) : (
          <div className='project-tile-outer'>
            <div className='project-tile-inner'>
              {leftSideNodes.map((node) => (
                <ProjectTile key={node.id} tile={node}></ProjectTile>
              ))}
            </div>
            <div className='project-tile-inner'>
              {rightSideNodes.map((node) => (
                <ProjectTile key={node.id} tile={node}></ProjectTile>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulHomePage {
      tiles {
        desktopAlignment
        desktopWidth
        mobileAlignment
        mobileWidth
        title
        featuredImage {
          gatsbyImageData
          description
        }
      }
    }
  }
`

export default IndexPage

export const Head = () => <title>Home Page</title>
