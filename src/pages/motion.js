import React, { useState, useEffect } from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import useWindowSize from '../utils/useWindowSize'
import ProjectTile from '../components/projectTile'
import ProjectListing from '../components/projectListing'

const Motion = ({ data }) => {
  const allNodes = data.contentfulHomePage.tiles.filter(
    (tile) => tile.category === 'Motion'
  )
  const leftSideNodes = allNodes.filter((node, index) => {
    if (index === 0 || index % 2 === 0) {
      return node
    }
  })
  const rightSideNodes = allNodes.filter((node, index) => {
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
                  key={node.id + index}
                  tile={node}
                  mobile
                ></ProjectTile>
              ))}
            </div>
          ) : (
            <div className='project-tile-outer'>
              <div className='project-tile-inner'>
                {leftSideNodes.map((node, index) => (
                  <ProjectTile key={node.id + index} tile={node}></ProjectTile>
                ))}
              </div>
              <div className='project-tile-inner'>
                {rightSideNodes.map((node, index) => (
                  <ProjectTile key={node.id + index} tile={node}></ProjectTile>
                ))}
              </div>
            </div>
          )
        ) : (
          <div className='project-list-view'>
            {allNodes.map((node, index) => (
              <ProjectListing
                key={node.id + index}
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
        category
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
          id
          slug
          media {
            ... on ContentfulVideo {
              videoMediaId: id
              aspectRatio
            }
            ... on ContentfulImage {
              id
            }
          }
        }
      }
    }
  }
`

export default Motion

export const Head = () => <title>Motion</title>
