FROM node:alpine as timer-app-build
WORKDIR /client
#COPY client/package.json client/package-lock.json ./
COPY /package.json /package-lock.json ./
RUN npm install
COPY . ./
RUN npm build
FROM nginx:latest
COPY --from=timer-app-build /client/build /usr/share/nginx/html
EXPOSE 80



#FROM node:alpine as timer-app-build
#WORKDIR /client
#COPY client/package.json client/package-lock.json ./
#RUN npm install
#COPY ./client ./
#RUN npm build
#FROM nginx:latest
#COPY --from=timer-app-build /client/build /usr/share/nginx/html
#EXPOSE 80
