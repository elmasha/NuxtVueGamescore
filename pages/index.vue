<template>
  <div>
    <h2>News</h2>
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
                  <span class="span2"> <b>Author:</b></span> {{ newFeed.author }}
                </div>

                <div>
                  {{ newFeed.description }}
                </div>
              </v-card-text>
              <v-chip id="chip"
                ><a id="readmore" :href="newFeed.url"><span> Read more</span> </a>
              </v-chip>
              <v-divider class="mx-4"></v-divider>

              <v-card-actions>
                <div><span>Share On</span> <v-icon>mdi-share</v-icon></div>
                <ShareNetwork
                  id="shareIcon"
                  network="WhatsApp"
                  :title="newFeed.url"
                  url=""
                  description=""
                >
                  <v-icon id="shareIcon2">mdi-whatsapp</v-icon>
                </ShareNetwork>

                <ShareNetwork
                  id="shareIcon"
                  network="facebook"
                  :title="newFeed.url"
                  url=""
                  description=""
                >
                  <v-icon id="shareIcon2">mdi-facebook</v-icon>
                </ShareNetwork>

                <ShareNetwork
                  id="shareIcon"
                  network="WhatsApp"
                  :title="newFeed.url"
                  url=""
                  description=""
                >
                  <v-icon id="shareIcon2">mdi-facebook-messenger</v-icon>
                </ShareNetwork>
              </v-card-actions>

              <v-chip-group
                v-model="selection"
                active-class="deep-green accent-5 white--text"
                column
              >
              </v-chip-group>
            </v-card>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "IndexPage",
  components: {},
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
h2 {
  color: #f19124;
}
#chip {
  margin: 20px;
}
#shareIcon {
  text-decoration-line: none;
  margin: 5px;
}

#shareIcon2:hover {
  color: #f19124;
}
#readmore {
  text-decoration-line: none;
  font-size: 17px;
  color: #492803;
  text-align: center;
  font-weight: 400;
}
.span2 {
  color: #f19124;
}
hr {
  background-color: #f19124;
}

.nuxt-link {
  text-decoration: none;
}
</style>
