FROM nginx

WORKDIR /usr/share/nginx/html

COPY build .

# FROM node:16.2.0-alpine

# WORKDIR /calypso-react/

# COPY public/ /calypso-react/public
# COPY src/ /calypso-react/src
# COPY package.json /calypso-react/

# RUN npm install

# CMD ["npm", "start"]

# # Multi-stage
# # 1) Node image for building frontend assets
# # 2) nginx stage to serve frontend assets

# # Name the node stage "builder"
# FROM node:16.2.0-alpine AS builder
# # Set working directory
# WORKDIR /calypso-react/
# # Copy all files from current directory to working dir in image
# COPY public/ /calypso-react/public
# COPY src/ /calypso-react/src
# COPY package.json /calypso-react/
# # install node modules and build assets
# RUN npm install
# RUN npm run build

# # nginx state for serving content
# FROM nginx:alpine
# # Set working directory to nginx asset directory
# WORKDIR /usr/share/nginx/html
# # Remove default nginx static assets
# RUN rm -rf ./*
# # Copy static assets from builder stage
# COPY --from=builder /calypso-react/build .
# # Containers run nginx with global directives and daemon off
# ENTRYPOINT ["nginx", "-g", "daemon off;"]