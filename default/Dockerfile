FROM node:18-alpine AS base

FROM base AS development 
ARG APP
ARG NODE_ENV=development 
ENV NODE_ENV=${NODE_ENV} 
WORKDIR /usr/src/app 
COPY package*.json ./ 
RUN npm install
COPY . . 
RUN npm run build ${APP} 

# Add an env to save ARG
ARG PORT
ENV PORT=${PORT}
EXPOSE ${PORT}
ENV APP_MAIN_FILE=dist/apps/${APP}/main 
CMD node ${APP_MAIN_FILE}