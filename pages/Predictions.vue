<template>
  <div>
    <div class="col-md-12 text-center">
      <div id="header-image" class="">
        <img :src="header" align="center" style="width: 100%" />
      </div>
    </div>
    <h2>Predictions</h2>
    <v-app>
      <v-flex>
        <div class="with-header d-flex row">
          <div
            v-for="predict in predictions"
            :key="predict.id"
            :id="predictions.id"
            :predict="predict.predict"
            class="col-md-4"
          >
            <v-card class="mx-auto my-12" max-width="700">
              <v-img height="280" :src="predict.image">
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular
                      indeterminate
                      color="green lighten-10"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>

              <v-card-title>{{ predict.Title }}</v-card-title>

              <v-card-text>
                <div class="my-4 text-subtitle-1">
                  <span class="span2"> <b>Author:</b></span>
                </div>
                <div>
                  {{ predict.subHeading2 }}
                </div>
                <div>
                  {{ predict.subheading1 }}
                </div>
              </v-card-text>
              <nuxt-link id="chip" :to="`/news/${predict.id}`"
                ><v-chip> <span id="readmore"> Read more</span> </v-chip>
              </nuxt-link>
              <v-divider class="mx-4"></v-divider>

              <v-card-actions>
                <div><span>Share On</span> <v-icon>mdi-share</v-icon></div>
                <ShareNetwork
                  id="shareIcon"
                  network="WhatsApp"
                  title="newFeed.url"
                  url=""
                  description=""
                >
                  <v-icon id="shareIcon2">mdi-whatsapp</v-icon>
                </ShareNetwork>

                <ShareNetwork
                  id="shareIcon"
                  network="facebook"
                  title="newFeed.url"
                  url=""
                  description=""
                >
                  <v-icon id="shareIcon2">mdi-facebook</v-icon>
                </ShareNetwork>

                <ShareNetwork
                  id="shareIcon"
                  network="WhatsApp"
                  title="newFeed.url"
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
    </v-app>
  </div>
</template>
<script>
export default {
  name: "Predictions",
  data() {
    return {
      stories: [],
      predictions: [],
      predicts: [],
      header: require("/assets/header.jpg"),
    };
  },
  methods: {
    ShowPredictions() {},
  },
  async mounted() {
    let start = new Date("2020-01-01");
    const db = this.$fire.firestore;
    db.collection("Predictions")
      .get()
      .then((queryResult6) => {
        queryResult6.forEach((doc) => {
          const data4 = {
            id: doc.id,
            Title: doc.data().title,
            subHeading1: doc.data().subheading1,
            subHeading2: doc.data().subheading2,
            subHeading3: doc.data().subheading3,
            Category: doc.data().category,
            Story: doc.data().story,
            Story1: doc.data().story1,
            Story2: doc.data().story2,
            Story3: doc.data().story2,
            image: doc.data().image,
            Comment: doc.data().comment,
            Like: doc.data().like,
          };
          this.predictions.push(data4);
          console.log(this.predictions);
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
