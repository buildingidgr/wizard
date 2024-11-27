# Civil Engineering Project Flow

This is a Next.js application for managing civil engineering project creation.

## Deployment to Railway

To deploy this project to Railway, follow these steps:

1. Fork this repository to your GitHub account.

2. Create a new project on Railway and connect it to your GitHub repository.

3. In the Railway dashboard, go to your project settings and add the following environment variables:
   - `NEXT_PUBLIC_WEBHOOK_URL`: Your webhook URL
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Your Google Maps API key

4. Railway will automatically detect the `Procfile` and use the appropriate start command.

5. Once deployed, Railway will provide you with a URL for your application.

## Local Development

To run this project locally:

1. Clone the repository:

