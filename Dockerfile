FROM node
# Create app directory
WORKDIR /app
# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
CMD [ "node", "server.js" ]