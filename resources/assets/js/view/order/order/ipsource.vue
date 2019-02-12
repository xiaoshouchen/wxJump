<template>
    <div>
        <p>Ip地址定位:{{ip}}</p>
        <p>手机号码定位:{{phone}}</p>
    </div>
</template>

<script>
    import {ipSource} from "@/api/goods"
    export default {
        name: "ipsource",
        data(){
          return {
              ip:"",
              phone:"",
          }
        },
        created() {
            ipSource(this.id).then((response)=>{
                this.ip = response.data.data.ip;
                this.phone = response.data.data.phone;
            })
        },
        props:['id']
    }
</script>

<style scoped>

</style>