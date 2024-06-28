import React, { useState, useEffect } from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import useWindowSize from '../utils/useWindowSize'
import ProjectTile from '../components/projectTile'
import ProjectListing from '../components/projectListing'
import { Fade } from 'react-awesome-reveal'

const Still = ({ data, location }) => {
  const allNodes = data.contentfulHomePage.tiles.filter(
    (tile) => tile.category === 'Still'
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
  const [changeView, setChangeView] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('view')) {
      setView(localStorage.getItem('view'))
    } else {
      setView('grid')
    }
  }, [])

  return (
    <Layout
      view={view}
      setView={setView}
      setChangeView={setChangeView}
      setFade={setFadeOut}
      location={location}
    >
      <div className={`tile-page ${fadeOut ? 'fade-out' : ''}`}>
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
        ) : changeView ? (
          <div className='project-list-view'>
            <Fade cascade damping={0.05} delay={isMobile ? 0 : 700}>
              {allNodes.map((node, index) => (
                <ProjectListing
                  key={node.id + index}
                  listing={node}
                ></ProjectListing>
              ))}
            </Fade>
          </div>
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
        videoPosterImage {
          gatsbyImageData
          description
        }
        project {
          slug
        }
      }
    }
  }
`

export default Still

export const Head = () => <title>Ned Rogers | Still</title>
