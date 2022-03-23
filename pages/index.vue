<template>
  <div>
    <div class="col-md-12 text-center">
      <div id="header-image" class="">
        <img :src="header" align="center" style="width: 100%" />
      </div>
    </div>
    <h2>News</h2>
    <v-layout>
      <v-flex>
        <!-- DB FEED-->
        <div class="with-header d-flex row">
          <div
            v-for="story in stories"
            :key="story.id"
            :id="stories.id"
            :story="story.story"
            class="col-md-4"
          >
            <v-card class="mx-auto my-12" max-width="700">
              <v-img height="280" :src="story.image"></v-img>

              <v-card-title>{{ story.title }}</v-card-title>

              <v-card-text>
                <div class="my-4 text-subtitle-1">
                  <span class="span2"> <b>Author:</b></span>
                </div>

                <div>
                  {{ story.subtitle }}
                </div>
              </v-card-text>
              <v-divider class="mx-4"></v-divider>

              <v-chip id="chip"
                ><a id="readmore" href="newFeed.url"><span> Read more</span> </a>
              </v-chip>

              <v-card-actions> </v-card-actions>

              <v-chip-group
                v-model="selection"
                active-class="deep-green accent-5 white--text"
                column
              >
              </v-chip-group>
            </v-card>
          </div>
          <!-- NEWsAPI FEED-->
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
    return {
      newFeeds: [],
      stories: [],
      header: require("/assets/header.jpg"),
    };
  },

  async created() {
    try {
      const response = await axios.get("/api/news");
      console.log(response.data);
      this.newFeeds = response.data;
      console.log(this.newFeeds);
      return this.newFeeds;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async showMessageFromBackend() {
      try {
        const response = await axios.get("/api/test");
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    },
  },
  async mounted() {
    let start = new Date("2019-01-01");
    const db = this.$fire.firestore;
    db.collection("Stories")
      .get()
      .then((queryResult6) => {
        queryResult6.forEach((doc) => {
          const data = {
            id: doc.id,
            title: doc.data().title,
            subtitle: doc.data().subtitle,
            subHeading: doc.data().subheading,
            subHeading1: doc.data().subheading1,
            subHeading2: doc.data().subheading2,
            subHeading3: doc.data().subheading3,
            Category: doc.data().category,
            story: doc.data().story,
            story1: doc.data().story1,
            story2: doc.data().story2,
            story3: doc.data().story2,
            image: doc.data().image,
            comment: doc.data().comment,
            like: doc.data().like,
          };
          this.stories.push(data);
          console.log("Stories", this.stories);
        });
      });
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
