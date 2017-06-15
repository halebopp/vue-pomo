<template lang="html">
  <div id="domainDynamicDimension-a"></div>
</template>

<script>
/* eslint-disable */
import CalHeatMap from 'cal-heatmap'

export default {
  name: 'heatMap',
  mounted() {
    const cal = new CalHeatMap()
    cal.init({
      itemSelector: "#domainDynamicDimension-a",
    	domain: "month",
    	range: 3,
    	cellSize: 15,
    	displayLegend: true,
      legend: [2,5,8,12],
      legendCellSize: 12,
      legendColors: {
    		min: "#ffb4a3",
    		max: "#ff3001",
    		empty: "white"
    		// Will use the CSS for the missing keys
    	},
      start: new Date().setMonth(new Date().getMonth() - 2),
      maxDate: new Date(),
      data: this.$store.getters.recentPomodori,
      itemName: ["pomodoro", "pomodori"]
    })
  }
}
</script>

<!-- TODO: figure out why this doesn't work (had to edit cal-heatmap.css to make it work)-->
<!--style lang="stylus" scoped>
  .cal-heatmap-container
    margin auto
</style-->
<style src="../assets/css/cal-heatmap.css">
