<template>
  <div id="viewstory">
    <v-app>
      <div>
        <h3 id="story-view-title"></h3>
        <h5 id="story-sub-title"></h5>
        <div class="col-md-12 d-flex">
          <span id="time"><i class="ri-time-line"></i> </span>
        </div>
        <div class="story-view-image col-md-12">
          <v-card class="mx-auto" max-width="1248">
            <v-img :src="this.imageUrl" height="600px" min-width="300">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="green lighten-10"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>

            <v-card-title>
              <h2 class="jumbotron" id="mainTitle">{{ title }}</h2>
            </v-card-title>
            <br />

            <v-card-actions>
              <span id="shareIcon"
                ><v-icon>mdi-emoticon-happy-outline</v-icon> {{ like }}</span
              >
              <span id="shareIcon"
                ><v-icon>mdi-comment-text-multiple</v-icon> {{ comment }}</span
              >
            </v-card-actions>
            <hr />
            <v-card-text>
              <span> </span>
            </v-card-text>

            <v-chip-group
              id="chipgroup"
              v-model="selection"
              active-class="deep-green accent-5 white--text"
              column
            >
              <v-chip>{{ category }}</v-chip>
            </v-chip-group>

            <v-card-subtitle>{{ subtitle }} </v-card-subtitle>
            <v-card-subtitle> </v-card-subtitle>

            <v-card-text>
              {{ story }}
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange lighten-2" text> Expand </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon @click="show = !show">
                <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  <h5>{{ subHeading1 }}</h5>
                  <p>{{ story_1 }}</p>
                </v-card-text>

                <v-img :src="this.imageUrl_1" max-height="500px" min-width="200">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular
                        indeterminate
                        color="green lighten-10"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>

                <v-card-text>
                  <h5>{{ subHeading2 }}</h5>
                  <p>{{ story_2 }}</p>
                </v-card-text>

                <v-img :src="this.imageUrl_2" max-height="600px" min-width="200">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular
                        indeterminate
                        color="green lighten-10"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>

                <v-card-text>
                  <h5>{{ subHeading3 }}</h5>
                  <p>{{ story_3 }}</p>
                </v-card-text>

                <v-img :src="this.imageUrl_3" max-height="500px" min-width="200">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular
                        indeterminate
                        color="green lighten-10"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>

                <v-card-text>
                  <h5>{{ subHeading4 }}</h5>
                  <p>{{ story_4 }}</p>
                </v-card-text>

                <v-img :src="this.imageUrl_4" max-height="500px" min-width="200">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular
                        indeterminate
                        color="green lighten-10"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </div>
            </v-expand-transition>
          </v-card>
        </div>
      </div>
    </v-app>
  </div>
</template>

<script>
import moment from "vue-moment";
var slugify = require("slugify");

export default {
  name: "viewstory",

  data() {
    return {
      stories: [],
      logo: require("/assets/logo20.png"),
      header2: require("/assets/header.jpg"),
      story_id: null,
      title: "",
      subtitle: null,
      subtitle: null,
      subheading: null,
      subheading1: null,
      subheading2: null,
      subheading3: null,
      subheading4: null,
      story: null,
      story_1: null,
      story_2: null,
      story_3: null,
      story_4: null,
      like: 0,
      show: false,
      selection: false,
      date: null,
      imageUrl: null,
      imageUrl_1: null,
      imageUrl_2: null,
      imageUrl_3: null,
      imageUrl_4: null,
      category: null,
      comments: null,
      otherLinks: null,
      twitterLink: null,
      comment: null,
      date: null,
      time: null,
    };
  },
  //insert the following code for vue-meta to work
  head() {
    return {
      title: slugify(this.title),
      meta: [
        {
          hid: this.story,
          name: this.story,
          content: this.story1,
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: this.imageUrl }],
    };
  },
  created() {},
  computed: {
    timestamp: function () {
      return moment(this.time).format("YYYY-MM-DD [at] hh:mm");
    },
  },

  mounted() {
    let start = new Date("2020-01-01");
    const db = this.$fire.firestore;
    db.collection("Stories")
      .where("doc_ID", "==", this.$route.params.id)
      .get()
      .then((queryResult) => {
        queryResult.forEach((doc) => {
          console.log(doc.data());
          this.imageUrl = doc.data().image;
          this.imageUrl_1 = doc.data().image1;
          this.imageUrl_2 = doc.data().image2;
          this.imageUrl_3 = doc.data().image3;
          this.imageUrl_4 = doc.data().image4;
          this.title = doc.data().title;
          this.subtitle = doc.data().subtitle;
          this.story = doc.data().story;
          this.story_1 = doc.data().story1;
          this.story_2 = doc.data().story2;
          this.story_3 = doc.data().story3;
          this.story_4 = doc.data().story4;
          this.category = doc.data().category;
          this.date = doc.data().timestamp;
          this.like = doc.data().like;
          this.comment = doc.data().comment;

          const data = {
            id: doc.id,
            Title: doc.data().title,
            Category: doc.data().category,
            Story: doc.data().story,
            image: doc.data().image,
            Comment: doc.data().comment,
            Like: doc.data().like,
          };
          this.stories.push(data);
          console.log("This is the story", this.stories);
        });
      });
  },

  watch: {},
  methods: {
    string_to_slug(str) {
      str = str.replace(/^\s+|\s+$/g, ""); // trim
      str = str.toLowerCase();

      // remove accents, swap ñ for n, etc
      var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
      var to = "aaaaeeeeiiiioooouuuunc------";
      for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
      }

      str = str
        .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
        .replace(/\s+/g, "-") // collapse whitespace and replace by -
        .replace(/-+/g, "-"); // collapse dashes

      return str;
    },
    // methods area
    formatDate(dt) {
      return moment(String(dt)).format("ddd, MMMM YYYY");
      // you dont have to use fromNow() it's just an example
    },

    LikeCount: function (val) {
      var sfDocRef = db.collection("Stories").doc(val);
      db.runTransaction((transaction) => {
        return transaction.get(sfDocRef).then((sfDoc) => {
          this.like = sfDoc.data().like + 1;
          transaction.update(sfDocRef, { like: this.like });
          return this.like;
        });
      })
        .then((newPopulation) => {
          console.log("like count", newPopulation);
        })
        .catch((err) => {
          // This will be an "population is too big" error.
          console.error(err);
        });
    },
    Writecomment() {
      if (this.comments == null) {
        alert("Comment is empty");
      } else {
        db.collection("Stories")
          .doc(this.$route.params.story_id)
          .collection("Comments")
          .add({
            comment: this.comments,
          })
          .then((docRef) => {
            console.log("Added id" + docRef.id);
            var sfDocRef = db.collection("Stories").doc(this.$route.params.story_id);
            db.runTransaction((transaction) => {
              return transaction.get(sfDocRef).then((sfDoc) => {
                this.comment = sfDoc.data().comment + 1;
                transaction.update(sfDocRef, { comment: this.comment });
                return this.comment;
              });
            })
              .then((newPopulation) => {
                console.log("Commnents count", newPopulation);
              })
              .catch((err) => {
                // This will be an "population is too big" error.
                console.error(err);
              });
            this.comments = "";
            alert("Comment Uploaded");
          })
          .catch((error) => console.error(error));
      }
    },

    convertToSlug(Text) {
      return Text.toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
    },
  },
  components: {},
};
</script>

<style scoped>
.flexbox-item {
  margin-top: 40px;
  max-width: 400px;
  width: 300px;
  justify-content: center;
}
@media (max-width: 400px) {
  .flexbox-item {
    flex: 100%;
    width: 100%;
    max-height: 40vh;
  }
}
#chipgroup {
  margin: 0px 10px 0px 10px;
}
#mainTitle {
  color: rgb(25, 97, 3);
}
#shareOn {
  margin: 2px;
}
#facebook {
  background-color: #1877f2;
}
#whatsapp {
  background-color: #25d366;
}
#twitter {
  background-color: #1da1f2;
}
#messenger {
  background-color: #3b5998;
}
#time {
  color: black;
  font-size: 19px;
  font-weight: 400;
}
#commentInput {
  border: #f19124 1px solid;
  border-radius: 4px;
}
#commentInput:hover {
  border: #168e2a 1px solid;
  border-radius: 4px;
}
#header-image {
  display: flex;
  flex-wrap: wrap;
  flex: 100%;
  flex-flow: column;
  vertical-align: middle;
  margin-top: 30px;
}
@media (max-width: 400px) {
  #header-image {
    flex: 100%;
    max-width: 100%;
  }
}
#Cardview {
  max-width: 300px;
  width: 300px;
  display: flex;
  width: 100%;
  flex-direction: column;
  flex-flow: row;
  flex: 50%;
  flex-wrap: nowrap;
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
#shares {
  margin: 10px;
}
#col2 {
  margin-top: 100px;
  margin-right: 200px;
}
#btn {
  margin-top: 10px;
  color: #f19124;
  background-color: transparent;
  padding: 0px 10px 0px 10px;
  border: #f19124 2px solid;
  border-radius: 12px;
}
#btn:hover {
  margin-top: 10px;
  color: #168e2a;
  background-color: transparent;
  padding: 0px 10px 0px 10px;
  border: #168e2a 2px solid;
  border-radius: 12px;
}
#embedSource {
  flex: 50%;
  justify-content: center;
}
#imageViewStory {
  display: flex;
  flex-wrap: wrap;
  flex: 50%;
  flex-flow: row;
  justify-content: center;
  vertical-align: middle;
}
@media (max-width: 600px) {
  #imageViewStory,
  #embedSource {
    flex: 100%;
    max-width: 100%;
  }
}
#imageViewStory1 {
  display: flex;
  width: 100%;
  flex: 100%;
}
@media (max-width: 800px) {
  #imageViewStory1 {
    flex: 100%;
    max-width: 100%;
  }
}
#viewstory {
  color: #808080;
}
#commentSect {
  color: #f19124;
  font-weight: 600;
  margin: 2px;
  font-size: 16px;
}
#showUS {
  color: #f19124;
}
#showUS:hover {
  color: #168e2a;
}
#commentSect:hover {
  color: #168e2a;
  font-weight: 600;
  font-size: 16px;
}
#story-sub-title {
  margin: 10px;
  font-weight: 450;
  font-size: 20px;
}
#story-view-title {
  margin: 10px;
  font-weight: 600;
  font-size: 40px;
}
#story-view-story {
  font-weight: 300;
  font-size: 17px;
}
</style>
