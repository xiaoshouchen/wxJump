<template>
    <div class="error-page">
        <div class="content-con">
            <div class="text-con">
                <h4>{{ code }}</h4>
                <h5>{{ desc }}</h5>
            </div>
        </div>
        <ErrorBtn></ErrorBtn>
    </div>
</template>

<script>
    import ErrorBtn from './error-btn'
    export default {
        name: 'error_content',
        components:{
            ErrorBtn
        },
        props: {
            code: String,
            desc: String,
        }
    }
</script>

<style scoped>
    .error-page{
        width: 240px;
        height: 160px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    h4{
        font-size: 48px;
        margin: 4px 0;
    }
    h5{
        font-size: 24px;
        margin: 0 0 10px;
    }
    h4,h5{
        font-family: 'Raleway', sans-serif;
        font-weight: 100;
        color:#909399;
    }
</style>