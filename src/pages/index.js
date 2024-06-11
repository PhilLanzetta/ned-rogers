import React, { useState, useEffect } from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import useWindowSize from '../utils/useWindowSize'
import ProjectTile from '../components/projectTile'
import ProjectListing from '../components/projectListing'

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
  const [view, setView] = useState('grid')

  useEffect(() => {
    if (localStorage.getItem('view')) {
      setView(localStorage.getItem('view'))
    } else {
      setView('grid')
    }
  }, [])

  return (
    <Layout view={view} setView={setView}>
      <div className='tile-page'>
        {view === 'grid' ? (
          isMobile ? (
            <div className='project-tile-inner-mobile'>
              {allNodes.map((node, index) => (
                <ProjectTile
                  key={node.id.concat(index.toString())}
                  tile={node}
                  mobile
                ></ProjectTile>
              ))}
            </div>
          ) : (
            <div className='project-tile-outer'>
              <div className='project-tile-inner'>
                {leftSideNodes.map((node, index) => (
                  <ProjectTile
                    key={node.id.concat(index.toString())}
                    tile={node}
                  ></ProjectTile>
                ))}
              </div>
              <div className='project-tile-inner'>
                {rightSideNodes.map((node, index) => (
                  <ProjectTile
                    key={node.id.concat(index.toString())}
                    tile={node}
                  ></ProjectTile>
                ))}
              </div>
            </div>
          )
        ) : (
          <div className='project-list-view'>
            {allNodes.map((node, index) => (
              <ProjectListing
                key={node.id.concat(index.toString())}
                listing={node}
              ></ProjectListing>
            ))}
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
        id
        desktopAlignment
        desktopWidth
        mobileAlignment
        mobileWidth
        title
        featuredImage {
          gatsbyImageData
          description
        }
        featuredVideo
        project {
          slug
          id
        }
      }
    }
  }
`

export default IndexPage

export const Head = () => <title>Home Page</title>
