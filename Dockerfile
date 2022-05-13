FROM node:16.15.0-alpine AS node
FROM jekyll/jekyll:3.8.6

# install a newer node version than the one provided in the jekyll image
COPY --from=node /usr/lib /usr/lib
COPY --from=node /usr/local/share /usr/local/share
COPY --from=node /usr/local/lib /usr/local/lib
COPY --from=node /usr/local/include /usr/local/include
COPY --from=node /usr/local/bin /usr/local/

RUN npm config set unsafe-perm true
RUN npm install -g grunt-cli

COPY Gemfile* ./
RUN bundle install
