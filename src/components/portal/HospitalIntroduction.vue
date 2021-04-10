<template>
	<div>
		<NavBar :active-index="activeIndex"></NavBar>
		医院概述
	</div>
</template>

<script>
import NavBar from './components/NavBar'

export default {
  name: 'HospitalIntroduction',
  data () {
    return {
      activeIndex: 'HospitalIntroduction'
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
