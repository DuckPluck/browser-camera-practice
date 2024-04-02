# Next.js Template

## Requirements

- Node.js >=18.17.0
- Yarn 1.x

## Setup Instructions

1. Create an `.env` file by copying the contents of `.env.example`:

   ```bash
   cp .env.example .env
   ```

2. Populate the `.env` file with the appropriate values for each environment variable, as required for the project.

3. Install the necessary dependencies by running the following command:

   ```bash
   yarn install
   ```

4. Start the local DevServer with this command:

   ```bash
   yarn dev
   ```

5. To build for production, use the command:

   ```bash
   yarn build
   ```

## Endpoints

You can access the local DevServer at the following URL:

- `http://localhost:8088`

## Deployment

1. Set `CI_ENABLED: "yes"` in `.gitlab-ci.yml`
2. Define Helm values for each environment:

   - `helm/values.dev.yml`
   - `helm/values.stage.yml`
   - `helm/values.prod.yml`

3. Encrypt the Helm values:

   - `sops -e -i helm/secrets.dev.yml`
   - `sops -e -i helm/secrets.stage.yml`
   - `sops -e -i helm/secrets.prod.yml`

4. Development Environment (`dev`):

   - Commit changes to the `dev` branch

5. Staging Environment (`stage`):

   - Merge changes to the `stage` branch

6. Production Environment (`prod`):

   - Merge changes to the `prod` branch
   - Create a tag for the commit
