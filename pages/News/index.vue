<template>
  <div>
    <h1>News</h1>

    <v-layout>
      <v-flex>
        <div class="with-header d-flex row">
          <div
            v-for="newFeed in newFeeds"
            :key="newFeed.id"
            :id="newFeeds.id"
            :newFeed="newFeed.newFeed"
            class="col-md-4"
          >
            <v-card class="mx-auto my-12" max-width="700">
              <v-img height="280" :src="newFeed.urlToImage"></v-img>

              <v-card-title>{{ newFeed.title }}</v-card-title>

              <v-card-text>
                <div class="my-4 text-subtitle-1">
                  <span class="span2">Author</span> {{ newFeed.author }}
                </div>

                <div>
                  {{ newFeed.description }}
                </div>
              </v-card-text>

              <v-divider class="mx-4"></v-divider>

              <v-card-title>Tonight's availability</v-card-title>

              <v-card-text>
                <v-chip-group
                  v-model="selection"
                  active-class="deep-purple accent-4 white--text"
                  column
                >
                  <v-chip>{{ newFeed.publishedAt }}</v-chip>
                </v-chip-group>
              </v-card-text>

              <v-card-actions>
                <v-btn color="deep-purple lighten-2" text @click="reserve">
                  <nuxt-link :to="'News/' + id">Read more </nuxt-link>
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";
import News from "../../components/News";

export default {
  components: {
    News,
  },
  data() {
    return { newFeeds: [] };
  },
  async created() {
    try {
      const articles = await axios.get(
        "https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=6c9865edf6224bb3813f745119fe94fb"
      );

      this.newFeeds = articles.data.articles;
      console.log(this.articles);
      return this.articles;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style scoped>
.span2 {
  color: #e01616fc;
}
</style>
