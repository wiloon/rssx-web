<template>
  <v-container
    fluid
  >
    <v-card
      class="mx-auto"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">
            <a v-bind:href="items.Url" target="_blank">
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
  items = new Map()

  mounted () {
    Axios
      .get('/news', {
        params: { id: this.$route.query.newsid, feedId: this.$route.query.feedid }
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
