<template>
  <v-container
    fluid
  >
    <v-btn color="primary" v-on:click="previousNews">Previous</v-btn>
    <v-btn color="primary" v-on:click="nextNews">Next</v-btn>
    <v-card
      class="mx-auto"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">
            <a v-bind:href="items.Url">
              {{ items.Title }}
            </a>
          </v-list-item-title>
          <v-list-item-subtitle> {{ items.PubDate }}</v-list-item-subtitle>
          {{ items.Description }}
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Axios from 'axios'

@Component({
  components: {}
})
export default class News extends Vue {
  feedId = ''
  newsId = ''
  nextNewsId = ''
  previousNewsId = ''
  items = new Map()

  previousNews (): void {
    console.log('previous')
    Axios
      .get('/previous-news', {
        params: { newsId: this.newsId, feedId: this.feedId }
      })
      .then(
        response => {
          console.log(response.data)
          this.$router.push({ path: 'news', query: { feedid: response.data.FeedId, newsid: response.data.Id } })
          this.items = response.data
          this.newsId = response.data.Id
          this.feedId = response.data.FeedId
          this.nextNewsId = response.data.NextId
        }
      )
  }

  nextNews (): void {
    console.log('next news: id: ' + this.nextNewsId)
    this.$router.push({ path: 'news', query: { feedid: this.feedId, newsid: this.nextNewsId } })
    this.loadOneNews(this.feedId, this.nextNewsId)
  }

  mounted () {
    console.log(this.$route.query)
    this.loadOneNews(this.$route.query.feedid as string, this.$route.query.newsid as string)
  }

  loadOneNews (feedId: string, newsId: string) {
    Axios
      .get('/news', {
        params: { id: newsId, feedId: feedId }
      })
      .then(
        response => {
          console.log(response.data)
          this.items = response.data
          this.feedId = response.data.FeedId
          this.nextNewsId = response.data.NextId
          this.newsId = response.data.Id
        }
      )
  }
}
</script>
