import Footer from '@components/Footer'
import {
  Fundraiser,
  FundraiserCard,
  Photo,
} from '@components/fundraiser/Fundraiser'
import SimpleLayout from '@layouts/Simple'
import { WaysToDonate } from '@pages/donate'
import { FC } from 'react'
import { FundraiserProgress } from '@components/fundraiser/FundraiserProgress'
import { MarkdownContent } from '@components/markdown/MarkdownContent'
import '../../stylesheets/donate.css'
import { GatsbyImage } from 'gatsby-plugin-image'

const FundraiserPhoto: FC<{ photo: Photo }> = ({ photo }) => {
  return (
    <div className="photo">
      <GatsbyImage alt={photo.alt} image={photo.gatsbyImageData} />
      <span>{photo.alt}</span>
    </div>
  )
}

export const FundraiserPage: FC<{ pageContext: Fundraiser }> = ({
  pageContext: fundraiser,
}) => {
  return (
    <SimpleLayout
      pageTitle={`Donate to ${fundraiser.title}`}
      pageDescription={`Support Distribute Aid's project ${fundraiser.title} by donating`}
      className={'donate fundraiser'}
      footer={<Footer showDonateButton={false} />}
    >
      <div className="bg" />
      <header>
        <h1>{fundraiser.title}</h1>
      </header>
      <FundraiserProgress fundraiser={fundraiser} title={'Campaign progress'} />
      <article className="fundraiser">
        <main>
          <div className="prose">
            <h1>{fundraiser.title}</h1>
          </div>
          <MarkdownContent content={fundraiser.body} />
        </main>
        <aside className="gallery">
          {fundraiser.gallery.map((photo) => (
            <FundraiserPhoto photo={photo} key={photo.url} />
          ))}
        </aside>
      </article>
      <section className="ways-to-donate">
        <WaysToDonate />
      </section>
    </SimpleLayout>
  )
}
