<template>
	<div>
		<NavBar :active-index="activeIndex"></NavBar>
		通知公告
	</div>
</template>

<script>
import NavBar from './components/NavBar'

export default {
  name: 'PublicNotice',
  data () {
    return {
      activeIndex: 'PublicNotice'
    }
  },
  components: {
    NavBar
  },
  created () {
    if (this.$route.params && this.$route.params.activeIndex) {
      this.activeIndex = this.$route.params.activeIndex
    }
  }
}
</script>

<style scoped>

</style>
