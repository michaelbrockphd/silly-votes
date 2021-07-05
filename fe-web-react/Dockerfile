# Start with a build image so all required NodeJS packages are downloaded
# and the Web site compiled.

FROM node:current-alpine AS fe_web_react_build

# While more involved, build args are used so that when create-react-app
# builds, the environment variables are set ahead of time.
#
# This is because when build, the current value of environment variables,
# is effectively baked-in to the resulting JS, etc., files.
#
# Where possible, a default value is given (to ease calling docker build)
# but this is overriden by any value found in the docker-compose file.

ARG ARG_FE_WEB_API_URL

ENV REACT_APP_FE_WEB_API_URL=${ARG_FE_WEB_API_URL:-http://localhost:9000}

# Set the working directory and create the build image.

WORKDIR /fe-web-react-build/

COPY package.json .
COPY package-lock.json .
COPY public ./public/
COPY src ./src/

RUN npm install
RUN npm run build



# Now, create the "final" image which simply has the compiled Web site
# and serve from NPM.

FROM node:current-alpine

WORKDIR /fe-web-react/

COPY --from=fe_web_react_build /fe-web-react-build/build ./build/

RUN npm -g install serve



# At last, set the entry point to just run the Web site.

CMD ["serve", "-s", "build", "-l", "8000"]
