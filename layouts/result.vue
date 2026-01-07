<template>
    <div>
        <div class="container p-0">
          <div class="content2" style="position: relative">
            <b-card>
              <Nuxt />
            </b-card>
          </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  head() {
    return {
        bodyAttrs: { style: 'max-width: 100% !important' }
    }
  },
  methods: {
    ...mapActions({
      fetchLanguage: "language/fetchLanguage",
      fetchSelectLeagueButton: "selectleaguebutton/fetchSelectLeagueButton",
    }),

  },
  computed: {
    ...mapGetters({
      getselectleague: "selectleaguebutton/getselectleague",
    }),
  },
  created() {
     if (this.$auth.$storage.getUniversal("language") == null) {
       this.fetchLanguage("th");
       this.$auth.$storage.setUniversal("language", "th");
     } else {
       this.fetchLanguage(this.$auth.$storage.getUniversal("language"));
     }
  },
};
</script>
