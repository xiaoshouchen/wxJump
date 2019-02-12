<template>
    <div>
        <p>
            来源IP:&nbsp;{{ip}}
        </p>
        <p>
            访问时间:&nbsp;{{created_at}}
        </p>
        <p>
            请求头:&nbsp;{{system_type}}
        </p>
        <div>
            触发事件:&nbsp;
            <p v-for="(item, index) in event">
                <span :key="index">{{item}}</span>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "show",
        data(){
          return {
              ip:this.showData.ip,
              created_at:this.showData.created_at,
              event:[],
              system_type:this.showData.system_type,
          }
        },
        created:function() {
            this.event = this.showData.event.split(',')
        },
        props:['showData']
    }
</script>

<style scoped>

</style>