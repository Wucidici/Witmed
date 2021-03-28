<template>
    <div class="about">
        <v-header />
        <v-sidebar />
        <div class="content-box" :class="{ 'content-collapse': collapse }">
            <v-tags></v-tags>
            <div class="content">
                <router-view v-slot="{ Component }">
                    <transition name="move" mode="out-in">
                        <keep-alive :include="tagsList">
                            <component :is="Component" />
                        </keep-alive>
                    </transition>
                </router-view>
                <!-- <el-backtop target=".content"></el-backtop> -->
            </div>
        </div>
    </div>
</template>
<script>
import vHeader from '../components/main/Header'
import vSidebar from '../components/main/SideBar'
import vTags from '../components/main/Tags'
export default {
  components: {
    vHeader,
    vSidebar,
    vTags
  },
  computed: {
    tagsList () {

    },
    collapse () {

    }
  }
}
</script>
