<template>
  <div>
    <div class="col-md-12">
      <div id="header-image" class="">
        <img :src="header" align="center" style="width: 100%" />
      </div>
      <h2 id="heading">News</h2>
    </div>

    <h5 id="catsLabel">Categories</h5>
    <div class="d-flex scrollmenu">
      <div v-for="cat in category" :key="cat.id" :id="category.id" :cat="cat.cat">
        <span id="cats" @click="SearchStory(cat.cat)">{{ cat.cat }}</span>
      </div>
    </div>
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
            <v-card class="mx-auto my-12" max-width="800">
              <v-img height="280" :src="story.image"
                ><template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular
                      indeterminate
                      color="green lighten-6"
                    ></v-progress-circular>
                  </v-row> </template
              ></v-img>

              <v-card-title>{{ story.title }}</v-card-title>

              <v-card-text>
                <div class="my-4 text-subtitle-1">
                  <span class="span2"> <b>Author:</b></span>
                </div>

                <div>
                  {{ story.subtitle }}
                </div>
              </v-card-text>

              <v-chip id="chip">
                <nuxt-link id="linkId" :to="`/news/${story.id}`"
                  ><v-chip> <span id="readmore"> Read more</span> </v-chip>
                </nuxt-link>
              </v-chip>
              <v-divider class="mx-4"></v-divider>
              <v-card-actions> </v-card-actions>

              <v-card-actions>
                <span id="shareIcon"
                  ><v-icon>mdi-emoticon-happy-outline</v-icon> {{ story.like }}</span
                >
                <span id="shareIcon"
                  ><v-icon>mdi-comment-text-multiple</v-icon> {{ story.comment }}</span
                >
              </v-card-actions>

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

              <nuxt-link id="chip" :to="`/news/${newFeeds.id}`"
                ><v-chip> <span id="readmore"> Read more</span> </v-chip>
              </nuxt-link>

              <v-divider class="mx-4"></v-divider>

              <v-card-actions>
                <ShareNetwork
                  id="shareIcon"
                  network="WhatsApp"
                  :title="newFeed.url"
                  url=""
                  description=""
                >
                  <v-icon id="shareIcon2">emoticon-happy-outline</v-icon>
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

              <v-chip-group active-class="deep-green accent-5 white--text" column>
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
import moment from "vue-moment";

export default {
  name: "IndexPage",
  components: {},
  data() {
    return {
      newFeeds: [],
      stories: [],
      category: [],
      searchText: null,
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
    formatDate(dt) {
      return moment(String(dt)).format("ddd, MMMM YYYY");
      // you dont have to use fromNow() it's just an example
    },
  },
  async mounted() {
    let start = new Date("2019-01-01");
    const db = this.$fire.firestore;
    db.collection("Category")
      .get()
      .then((queryResult6) => {
        queryResult6.forEach((doc) => {
          const data1 = {
            id: doc.id,
            cat: doc.data().cat,
          };

          this.category.push(data1);
        });
      });
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
            date: doc.data().timestamp,
            image: doc.data().image,
            comment: doc.data().comment,
            like: doc.data().like,
          };
          this.stories.push(data);
        });
      });
  },
  method: {
    // methods area
    formatDate(dt) {
      return moment(String(dt)).format("ddd, MMMM YYYY");
      // you dont have to use fromNow() it's just an example
    },
    async SearchStory(val) {
      this.stories.splice(this.stories);
      const db = this.$fire.firestore;
      db.collection("Stories")
        .where("category", "==", val)
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
              date: doc.data().timestamp,
              story2: doc.data().story2,
              story3: doc.data().story2,
              image: doc.data().image,
              comment: doc.data().comment,
              like: doc.data().like,
            };
            this.stories.push(data);
            console.log("My search", this.stories);
          });
        });
    },
  },
};
</script>

<style scoped>
#linkId {
  text-decoration-line: none;
}
.nuxt-link {
  text-decoration: none;
}
.divider {
  margin: 5px;
}
#catsLabel {
  margin: 10px;
  color: #808080;
}
#cats {
  border-radius: 30px;
  background-color: #f7daba;
  color: rgb(25, 97, 3);
  padding: 5px 12px 5px 12px;
  margin: 10px 7px 12px 7px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}
.scrollmenu {
  overflow: auto;
  white-space: wrap;
  padding: 5px 10px 5px 10px;
}

#heading {
  margin-top: 20px;
}
h2 {
  color: #f19124;
}
#chip {
  margin: 10px;
}
#shareIcon {
  color: rgb(25, 97, 3);
  text-decoration-line: none;
  margin: 5px;
}

#shareIcon2:hover {
  color: #f19124;
}
#readmore {
  text-decoration-line: none;
  font-size: 16px;
  color: #492803;
  text-align: center;
  font-weight: 400;
}
.span2 {
  color: #f19124;
}
hr {
  background-color: #bebcb8;
}

.nuxt-link {
  text-decoration: none;
}

/* width */
::-webkit-scrollbar {
  width: 1px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #fff;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #fff;
  border-radius: 10px;
  height: 10px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #f19124;
}
</style>
