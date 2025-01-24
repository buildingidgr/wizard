export default function Head() {
    return (
      <>
        <title>Project Wizard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          async
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&language=el&region=GR&callback=Function.prototype`}
        />
      </>
    )
  }