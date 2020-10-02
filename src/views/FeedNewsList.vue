<template>
  <v-card
    max-width="500"
    class="mx-auto"
  >
    <v-list>
      <v-list-item
        v-for="item in items"
        :key="item.Id"
        v-on:click="newsClick"
      >
        <v-list-item-content v-bind:id="item.Id" v-bind:feedid="item.FeedId">
          <v-list-item-title v-text="item.Title" v-bind:id="item.Id" v-bind:feedId="item.FeedId" v-bind:class="{ read: item.ReadFlag }"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Axios from 'axios'

@Component({
  components: {}
})
export default class FeedNewsList extends Vue {
  item = 1
  items = new Map()

  newsClick (event: any): void {
    console.log(event.target.id)
    console.log(event.target.feedid)
    this.$router.push({ path: 'news', query: { newsid: event.target.id, feedId: event.target.feedid } })
  }

  mounted () {
    Axios
      .get('/news-list',
        {
          params: { id: this.$route.query.feedId }
        })
      .then(
        response => {
          console.log(response.data)
          this.items = response.data
        }
      )
  }
}
</script>
<style scoped lang="stylus">
.read
  color gray
.unread
  color black
</style>
