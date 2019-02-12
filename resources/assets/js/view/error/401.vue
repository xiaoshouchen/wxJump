<template>
    <error-content code="401" desc="Oh~~您没有浏览这个页面的权限~" />
</template>

<script>
    import errorContent from './error-content.vue'
    export default {
        name: 'error_404',
        components: {
            errorContent
        },
    }
</script>
