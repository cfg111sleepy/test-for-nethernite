<template>
    <v-card class="mx-auto overflow-hidden" height="">
        <v-app-bar color="deep-purple" dark>
            <v-toolbar-title>Test for Nethernite</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field v-model="search"></v-text-field>
            <v-btn @click="searchPackages" icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </v-app-bar>
    </v-card>
</template>

<script>
import { mapActions } from "vuex"
export default {
    name: "Header",
    data: () => ({
        search: null
    }),
    methods: {
        ...mapActions(['getPackages']),
        searchPackages() {
            if(this.search)
                this.getPackages(this.search)
        }
    },
};
</script>
<style scoped lang="scss">
.input {
    width: 200px;
}
</style>
