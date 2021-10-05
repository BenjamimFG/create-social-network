FROM node:16-alpine3.14 AS build

ENV NODE_ENV=production

# Required Env Variables:
# 
# REACT_APP_API_URL
# REACT_APP_WEBSOCKET_API_URL

WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./
RUN npm install
COPY . .

# Build
RUN npm run build


FROM node:16-alpine3.14

ENV NODE_ENV=production

WORKDIR /app

# Install server
RUN npm install -g serve

COPY --from=build /usr/src/app/build/ ./

CMD ["serve", "-s", ".", "-p", "3000"]
