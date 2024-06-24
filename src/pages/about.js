import React from 'react'
import { graphql } from 'gatsby'
import ConditionalLayout from '../components/ConditionalLayout'

const About = ({ data }) => {
  const { email, instagramHandle, instagramLink, bio } =
    data.contentfulAboutPage
  return (
    <ConditionalLayout>
      <div className='about-page'>
        <div
          dangerouslySetInnerHTML={{ __html: bio.childMarkdownRemark.html }}
          className='about-bio'
        ></div>
        <div className='about-contact'>
          <p>All Inquiries</p>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
        <div className='about-contact'>
          <p>Instagram</p>
          <a href={instagramLink}>{instagramHandle}</a>
        </div>
      </div>
    </ConditionalLayout>
  )
}

export const query = graphql`
  query {
    contentfulAboutPage {
      email
      instagramHandle
      instagramLink
      bio {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`

export default About

export const Head = () => <title>Ned Rogers</title>