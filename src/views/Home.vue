<template>
    <div data-app>
        <div v-if="packages.length">
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">Name</th>
                            <th class="text-left">Version</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in paginatedData"
                            :key="item.package.name"
                            @click="openWindow(item.package)"
                        >
                            <td>{{ item.package.name }}</td>
                            <td>{{ item.package.version }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <v-btn @click="prevPage" :disabled="pageNumber == 0" depressed>
                PREV
            </v-btn>
            <v-btn
                @click="nextPage"
                :disabled="pageNumber >= pageCount - 1"
                depressed
            >
                NEXT
            </v-btn>
        </div>
        <div v-else>
            <p class="text-center mt-40">
                Please write name package and click on the search.
            </p>
        </div>
        <v-dialog v-model="dialog" max-width="400">
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    Package name: {{ currentPackage.name }}
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="text-h5">
                    Package description: {{ currentPackage.description }}
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-card-text class="text-h5"> Links: </v-card-text>
                    <v-btn :href="currentPackage.links.npm" depressed>
                        Npm
                    </v-btn>
                    <v-btn :href="currentPackage.links.homepage" depressed>
                        Homepage
                    </v-btn>
                    <v-btn :href="currentPackage.links.repository" depressed>
                        Repository
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: "Home",
    components: {},
    methods: {
        openWindow(pack) {
            this.currentPackage = pack;
            this.dialog = true;
        },
        nextPage() {
            this.pageNumber++;
        },
        prevPage() {
            this.pageNumber--;
        },
    },
    computed: {
        packages() {
            return this.$store.state.packages;
        },
        paginatedData() {
            const start = this.pageNumber * 10;
            const end = start + 10;
            return this.packages.slice(start, end);
        },
        pageCount() {
            const l = this.packages.length;
            const s = 10;
            return Math.ceil(l / s);
        },
    },
    data: () => ({
        pageNumber: 0,
        dialog: false,
        currentPackage: {
            name: null,
            description: null,
            links: {
                bug: null,
                homepage: null,
                npm: null,
                repository: null,
            },
        },
    }),
};
</script>
<style scoped>
.mt-40 {
    margin-top: 40px;
}
</style>