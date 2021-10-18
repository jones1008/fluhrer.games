FROM jekyll/jekyll:3.8.6
RUN npm install -g grunt-cli
COPY Gemfile* ./
RUN bundle install
