import { graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { FC } from 'react'

import { PageHeader } from '@components/PageHeader'
import { Route } from '@components/routes/RouteComponentTypes'

import RoutesSectionImage from '../../components/routes/RoutesSectionImage'
import TextWithVisual from '../../components/routes/TextWithVisual'
import SimpleLayout from '../../layouts/Simple'

import Costs from '@components/routes/Costs'
import Delivery from '@components/routes/Delivery'
import Pallets from '@components/routes/Pallets'
import PhotoCredit from '@components/routes/PhotoCredit'
import Reservations from '@components/routes/Reservations'
import SectionTitle from '@components/routes/SectionTitle'

type TemplateProps = {
  data: {
    route: Route
  }
}

export function Head({ data: { route } }: TemplateProps) {
  return (
    <PageHeader
      title={`Route: ${route.routeOrigin} to ${route.routeDestination}`}
    />
  )
}

const Routes: FC<TemplateProps> = ({ data: { route } }) => (
  <SimpleLayout>
    <Delivery
      images={route.images}
      introduction={route.introduction}
      routeDestination={route.routeDestination}
      routeOrigin={route.routeOrigin}
      frontlineGroups={route.frontlineGroups}
    />
    <Reservations
      deadlines={route.deadlines}
      images={route.images}
      aidRequestFormUrl={route.aidRequestFormUrl}
    />
    <TextWithVisual
      id="frontline-groups"
      positionOfVisual="right"
      visual={
        <RoutesSectionImage
          ariaLabel="Mobile refugee support station with a few people gathering."
          image={route.images.groupsSection}
        />
      }
    >
      <SectionTitle title="Frontline Groups" />
      <div className="section__body mb-8">
        <div className="flex flex-wrap gap-6 justify-center">
          {route.frontlineGroups.map((group, index) => (
            <div
              className="w-full"
              style={{ maxWidth: 160 }}
              key={`group-${index}`}
            >
              {/* TODO size the images correctly */}
              <img
                className="icon icon--responsive mx-auto rounded-full"
                src={group.logo}
                alt={`Frontline Group Logo: ${group.name}`}
                style={{ width: 120 }}
              />
              <div className="text-center text-sm mt-4">{group.name}</div>
            </div>
          ))}
        </div>
      </div>

      <PhotoCredit
        url="https://www.facebook.com/MobileRefugeeSupport/posts/1492064960999110"
        description="Mobile Refugee Support"
      />
    </TextWithVisual>

    <TextWithVisual
      id="uk-staging-hubs"
      positionOfVisual="left"
      visual={
        <iframe
          className="w-full md:w-2/4 h-96 md:h-auto"
          src={route.mapUrl}
          width="100%"
          height="100%"
          title="routeMap"
        />
      }
    >
      <SectionTitle title="UK Staging Hubs" />
      <div className="section__body">
        <p className="mb-4">
          The most <strong>cost efficient and Brexit / pandemic-proof</strong>{' '}
          way to send aid from the UK is by shipping palletised aid on
          articulated lorries that are loaded by a forklift.{' '}
          <strong>That's where our UK Staging Hubs come in!</strong> They have
          the necessary infrastructure and experience working with us to ensure
          each shipment is fully optimized, which everybody benefits from. Once
          it's in a Staging Hub, your aid will be palletised, stored, and loaded
          by a forklift onto the next truck.
        </p>

        <div className="mb-12 flex">
          <div className="tile-icon">
            <StaticImage
              src="../../images/regular-routes/pallet-aid-logo.256.png"
              alt="Hub Logo: Pallet Aid (PA)"
              height={80}
              width={80}
            />
          </div>
          <div className="tile-content ml-4">
            <p className="text-lg font-medium mb-2">Coventry - South England</p>
            <p className="text-sm leading-snug">
              Both Community &amp; Commercial Aid
            </p>
            <p className="text-sm leading-snug">
              pallets, loose boxes, bulk bags of tents &amp; sleeping bags, etc
            </p>
          </div>
        </div>
      </div>

      <footer>
        <p className="text-sm italic text-center">
          Questions? Comments? Contact us all at{' '}
          <a
            href="mailto:hubs@distributeaid.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            hubs@distributeaid.org
          </a>
          .
        </p>
      </footer>
    </TextWithVisual>

    <Costs images={route.images} costs={route.costs} />

    <Pallets images={route.images} />
  </SimpleLayout>
)

export default Routes

export const query = graphql`
  query ($id: String!) {
    route: daRoute(id: { eq: $id }) {
      id
      routeOrigin
      routeDestination
      introduction
      mapUrl
      aidRequestFormUrl
      images {
        deliverySection
        reservationSection
        groupsSection
        storageSection
        palletsSection
      }
      costs {
        currency
        standardPaletteCost
        overflowPricing
        halfPaletteCost
      }
      deadlines {
        submissionsDeadline
        confirmationDate
        stagingBegins
        stagingEnds
        shipmentDeparture
      }
      frontlineGroups {
        logo
        name
      }
    }
  }
`
